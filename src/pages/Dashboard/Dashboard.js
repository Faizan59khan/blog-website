import React, { useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { useFirestore } from "../../hooks/useFirestore";
import Sidebar from '../../components/Sidebar';



//styles
import './Dashboard.scss'

const Dashboard = () => {

    const {documents, error }=useCollection('blogs');
    const {user} =useAuthContext();
    const Navigate=useNavigate();
    const {deleteDocument,response}=useFirestore('blogs');

    const deleteBlog = async (id) =>{
        
        if(window.confirm("Are you sure you want to delete the blog?")){
            await deleteDocument(id);
        }

    }

    useEffect(()=>{

        if(!user){
           Navigate("/login")
        }

    },[user,Navigate])

 

    

    return (
        <div className='dashboard'>
                <Sidebar />
       

        <div className='main-container'>
            
            {
             user && documents && documents.map((blog)=>{

                  if(user.uid===blog.createdBy.id){               //if current user's id matches the blog creation id
                   return (
                      <div className='dashboard-item' key={blog.id}>

                          <div className='blog-update'>
                            <i className="fas fa-edit"></i>
                            <i className="fas fa-trash-alt" onClick={()=> {deleteBlog(blog.id)}}></i>
                          </div>
                          <div className='blog-img'> 
                              <img src={blog.blogimage} id='dash-img' />
                          </div>
                          <h3>{blog.title}</h3>
                          
                      </div>
                   )
                   }
                 
                
               })

            }
           
            
        </div>
        </div>
    )
 

}

export default Dashboard
