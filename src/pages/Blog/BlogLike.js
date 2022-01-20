import React, { useCallback, useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { timestamp } from "../../firebase/config"
import './Blog.scss'
import Avatar from "../../components/Avatar"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'



const BlogLike = ({project}) => {

    const [count,setCount]=useState(0);
    const [showBtn,setShowBtn]=useState(true);
    const {user}=useAuthContext();
    const {updateDocument,response}=useFirestore('blogs');

    const [newComment, setNewComment] = useState('')

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if(user){
      const commentToAdd = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        content: newComment,
        createdAt: timestamp.fromDate(new Date()),
        id: Math.random()
      }
  
      await updateDocument(project.id, {                               
        comments: [...project.comments, commentToAdd]
      });
  
      if(!response.error){
        setNewComment("");
      }
      console.log(commentToAdd)
    }
    else{
      alert("You have to login first")
   }
      
    }

   

     const handleChange = useCallback(async (e)=>{           //using callback to avoid infinite runs of useEffect
        e.preventDefault();
      console.log("s"+showBtn)
      
       if (!showBtn) {   
         let result = [];
         project.likes.forEach((userLike) => {
           if (user.uid !== userLike.userId) {
             result.push(userLike);
           }
         })

         await updateDocument(project.id, {
           likes: result
         });
         setShowBtn(true);                              //for unlike

       }

       else {                                          //for like
         if (user) {
           const likesUser = {
             displayName: user.displayName,
             likeValue: true,
             userId: user.uid,                               //like available
             id: Math.random()
           }

            await updateDocument(project.id, {
             likes: [...project.likes, likesUser]
           });
         setShowBtn(false);                              //for unlike
           
         }
         else {
           alert("You have to login first")
         }
  }
     })

    

     useEffect(()=>{                                  //only runs when any change occurs in handle change 

        let counter=0;
        console.log(showBtn)

      
          user && project.likes.map((pro)=>{          //matches current user id if user already like it then like btn will not shown to user.
            if(user.uid===pro.userId){
                 setShowBtn(false);
            }
        })

        project.likes.forEach((pro)=>{         
         
             if(pro.likeValue === true){
                 counter++;
             }
        })
        setCount(counter);
      
      
     },[handleChange])

   




    return (
       <div className='like-comment'>
        <div className='like-container'>
             {/* <h1 className='like-count'>Likes {count}</h1> */}
             {/* <ul className='toolbar'>
                 <span>Like By :</span>
                 {
                     project.likes.map((pro)=>{
                         return(
                             <li key={pro.id}>{pro.displayName}</li>
                         )
                     })
                 }
             </ul> */}
             {showBtn && <button className='like-btn' onClick={handleChange}><i class="fa-solid fa-thumbs-up"></i>Like</button>}
             {!showBtn && <button className='like-btn' onClick={handleChange}><i class="fa-solid fa-thumbs-down"></i>UnLike</button> }
            
            <div className="project-comments">

                <form className="add-comment" onSubmit={handleSubmit}>
                    <button className="like-btn"><i class="fa-solid fa-comment"></i>Comment</button>
                </form>

            </div>     
        </div>

        <textarea 
            id='comment-area'
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
      ></textarea>
      <div className='blog-cmnts'>
       <ul>
        {project.comments.length > 0 && project.comments.map(comment => (
          <li key={comment.id} className="user-cmnts">
            <div className='user-nameInfo'>
              <Avatar src={comment.photoURL} />
              <h3>{comment.displayName}</h3>
              <p>{formatDistanceToNow(comment.createdAt.toDate(), {addSuffix: true})}</p>
            </div>
           
            
            <div className="comment-content">
              <p>{comment.content}</p>
            </div>
          </li>
        ))}
      </ul>  
      </div>
    </div>
    )
}

export default BlogLike