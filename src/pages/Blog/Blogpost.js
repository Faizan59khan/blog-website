import React from 'react'
import { useParams } from "react-router-dom"
import { useDocument } from '../../hooks/useDocument'
import {useAuthContext} from '../../hooks/useAuthContext'
import Avatar from '../../components/Avatar'
import BlogLike from './BlogLike'
import BlogTags from './BlogTags'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'

//styles
import './Blog.scss'


const Blogpost = () => {

    const {id}=useParams();
    const {document,error}=useDocument('blogs',id);
    const {user}=useAuthContext();

    if (error) {
        return <div className="error">{error}</div>
      }
      if (!document) {
        return <div className="loading">Loading...</div>
      }

    return (
        <div>
            <Navbar/>
        <div className='blogpost'>
            <h1>{document.title}</h1>
            <img src={document.blogimage} />

           
             
            <div className='blog-content'>
                    <div id='line'></div>
                <div className='user-details'>
                   <div className='user-profile'>
                       <Avatar src={document.createdBy.photoURL} />
                       <div className='user-info'>
                       <h3>{document.createdBy.displayName}
                       <span>{document.createdAt.toDate().toDateString()} . {document.readTime} min readtime</span></h3>
                       </div>
                   </div>
                   <div className='social-links'>
                      <a href='#'><i class="fa-brands fa-facebook"></i></a>
                      <a href='#'><i class="fa-brands fa-twitter"></i></a>
                   </div>
                </div>

                <div className='blog-para'>
                    <p>
                        {document.content}
                    </p>
                    
                    <div className='btn'>
                        <BlogLike project={document}/>
                    </div>
                </div> 

            </div>
              <div className='tag-line'><i class="fa-light fa-eyes"></i></div>
              <BlogTags tags={document.selectedOption} id={id} />
        </div>
        <Footer/>
        </div>
    )
}

export default Blogpost
