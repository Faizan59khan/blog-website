import React, { useEffect,useState } from 'react'
import {useCollection} from '../../hooks/useCollection';
import { NavLink } from 'react-router-dom';

import './Blog.scss'


const BlogTags = ({tags,id}) => {


    const [tagValue,setTagvalue]=useState([]);
    const {documents,error}=useCollection('blogs');

    useEffect(()=>{                                    //execute only once when component mount 
       let result=[]

      tags.forEach((tag)=>{                            //getting tags values
           result.push(tag.value);
           console.log(tag.value)
        })

        console.log(result)
        setTagvalue(result);

    },[])

    return (
        <div className='blog-tags'>
          
            <h1>What to read Next</h1>
         
           <div className='blogtag-list'>
            {
              
            
               documents && documents.map((blog)=>{            
                   
                   let flag=0;
                
                  blog.selectedOption.forEach((tag)=>{     //everytime we check if blog contains the tags which we taken as a prop then 
                                                            //we change the value of flag
                      if(tagValue.includes(tag.value)){
                         flag=1;
                      }
                  })
            

                 if(flag===1 && blog.id !== id){          //dont show current open blog in a list (blog.id !== id)                                
                     flag=0;
                    return(
                        
                    <NavLink to={`/blogpost/${blog.id}`} className='user-blog' key={blog.id}>
                        <div className='blog-img'>
                            <img src={blog.blogimage} id='tags-image' />
                        </div>
                        <h3>{blog.title}</h3>
                        
                    </NavLink>
                    )
                 }
                  
                
                   
                })
             
            }
            </div>
            

          
        </div>
    )
}

export default BlogTags
