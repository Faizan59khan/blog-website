import { useState } from "react"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore";
import Avatar from "../../components/Avatar"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import './Blog.scss'



export default function ProjectComments({ project }) {
  const { user } = useAuthContext()
  const [newComment, setNewComment] = useState('')

  const{updateDocument,response}=useFirestore('blogs');

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

  return (
    <div className="project-comments">
    
      <form className="add-comment" onSubmit={handleSubmit}>
        <button className="like-btn"><i class="fa-solid fa-comment"></i>Comment</button>
      </form>

      <textarea 
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
      ></textarea>
      
      
      <div className="tags">
          <span>Tags: </span>
          {project.selectedOption.map((tag)=>{
              return (
                  <p>{tag.value}</p>
              )
          })}
      </div>


        <h4>Project Comments</h4>
      {/* <ul>
        {project.comments.length > 0 && project.comments.map(comment => (
          <li key={comment.id}>
            <div className="user-profile">
              <Avatar src={comment.photoURL} />
              <h3>{comment.displayName}</h3>
            </div>
           
            <p>{formatDistanceToNow(comment.createdAt.toDate(), {addSuffix: true})}</p>
            <div className="comment-content">
              <p>{comment.content}</p>
            </div>
          </li>
        ))}
      </ul>  */}




    </div>
  )
}