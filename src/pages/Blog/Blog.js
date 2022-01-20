import React, { useEffect, useState } from 'react'
import {useCollection} from '../../hooks/useCollection';
import { NavLink } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer';

import './Blog.scss'


const Blog = () => {

    const [len,setLen]=useState(0);
    const {documents,error}=useCollection('blogs');
    

    useEffect(()=>{
         
      
        let prev=1;
        let maxLen=0;
        let comMax=0;

        if(documents){
            let res= documents && documents.map((blog)=>{
                return(
                   blog.likes
                )
            })

            let com=documents && documents.map((blog)=>{
                return(
                   blog.comments
                )
            })
            
            com.forEach((count)=>{                             //count comment lengths 
                if(count.length>prev){
                 comMax=count.length;
                }
                prev=count.length; 
            })
            
           res.forEach((count)=>{
                                                             //count likes length
             if(count.length>prev){                         //if the length is greater than the prev array length
                    //  console.log(prev)
                    //  console.log(count.length)
                     maxLen=count.length;
                 }
              prev=count.length;                             //maintaining the previous value of array
           })
             
           
           setLen(Number(maxLen+comMax));
        //    console.log("uE"+Number(maxLen+comMax));
        //    console.log(typeof(len))
          
        }
    
    },[documents])

    return (
        <div>
           <Navbar/>
        <div className='blog-page'>
          
              {  
                  documents && documents.map((blog)=>{
                    if(Number(blog.likes.length+blog.comments.length)===len){        //show the popular blog on top
                      
                    return(
                        <NavLink to={`/blogpost/${blog.id}`} className='blog-cover' key={blog.id}>
                             <img src={blog.blogimage} />
                             <h1>{blog.title}</h1>
                        </NavLink>
                     )
                    }
                  

                })
              }
              
            
            
              <span></span>
            <h1 id='bloglist-heading'>All articles</h1>

           <div className='blog-articles'>
            {
               documents && documents.map((blog)=>{
                   if(blog.likes.length!==len){                    //dont show the top(Maximum likes & comments) blog in a list   
                    return(
                    <NavLink to={`/blogpost/${blog.id}`} className='user-blog' key={blog.id}>
                        <div className='blog-img'>
                            <img src={blog.blogimage}  />
                        </div>
                        <h3>{blog.title}</h3>
                        
                    </NavLink>
                    )
                   }
                })
            }
            </div>  
          
        </div>
        <Footer/>
        </div>
    )
}

export default Blog
