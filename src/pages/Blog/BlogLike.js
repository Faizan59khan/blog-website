import React, { useCallback, useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import BlogComment from './BlogComment'
import './Blog.scss'



const BlogLike = ({project}) => {

    const [count,setCount]=useState(0);
    const [showBtn,setShowBtn]=useState(true);
    const {user}=useAuthContext();
    const {updateDocument,response}=useFirestore('blogs');

   

     const handleChange = useCallback(async (e)=>{           //using callback to avoid infinite runs of useEffect
        e.preventDefault();


        if(user){
        const likesUser={
            displayName: user.displayName,
            likeValue: true,
            userId: user.uid,                   //like available
            id: Math.random()
        }

        await updateDocument(project.id,{
            likes: [...project.likes,likesUser]
        });
      console.log(likesUser)
     }
    else{
        alert("You have to login first")
    }
     })

     useEffect(()=>{                                //only runs when any change occurs in handle change 

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
             {!showBtn && <button className='like-btn'><i class="fa-solid fa-thumbs-down"></i>UnLike</button> }
             <BlogComment project={project}/>
        </div>
    )
}

export default BlogLike