import React, { useState } from 'react'
import Select from 'react-select'
import { timestamp,projectStorage,projectFirestore } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'


//styles
import './CreateBlog.scss'

//hooks
import { useCollection } from '../../hooks/useCollection'
import {useAuthContext} from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import Sidebar from '../../components/Sidebar'


//for react-select
const options = [
    { value: 'Product Design', label: 'Product Design' },
    { value: 'Food', label: 'Food' },
    { value: 'Culture', label: 'Culture' },
  ];

const CreateBlog = () => {

   const [title,setTitle]=useState("");
   const [readTime,setReadTime]=useState("");
   const [content,setContent]=useState("");
   const [thumbnail, setThumbnail] = useState(null)
   const [thumbnailError, setThumbnailError] = useState(null)
   const [selectedOption, setSelectedOption] = useState(null);
   const [formError,setFormError]=useState("");

   const {user}=useAuthContext();
   const {addDocument, response} = useFirestore('blogs')
   const Navigate=useNavigate();


    

   const handleSubmit= async (e)=>{
       e.preventDefault();

       if(!selectedOption){                            //for checking of Select as it does not has required atribute
           setFormError('Please select any tag')
       }
       
       const createdBy = { 
        displayName: user.displayName, 
        photoURL: user.photoURL,
        id: user.uid                                                //uid
      }

        //firebase
       // upload user thumbnail                                           //create path in a storage in firebase 
       const uploadPath = `thumbnails/${user.uid}/${thumbnail.name}`        //thumbnails/fsdgsdg45/faizan
       const img = await projectStorage.ref(uploadPath).put(thumbnail)
       const imgUrl = await img.ref.getDownloadURL();
       /* ========================================= */
  
      const blog = {                                  //all project details
        title,
        readTime,
        selectedOption, 
        createdBy,
        content,
        blogimage: imgUrl,
        comments: [],
        likes: []
      }
       
      console.log(blog);
      await addDocument(blog);


     

      if(!response.error){                  //when there is no error redirect to dashboard.
        Navigate('/')
      }
   }
   

   const handleFileChange = (e) => {
    setThumbnail(null)
    let selected = e.target.files[0]
    console.log(selected)
                                       //selected obj contain all these type,size ....
     if(!selected){                   
       setThumbnailError("Please select a File")
       return
     }
     if(!selected.type.includes("image")){
       setThumbnailError("Selected file must be an image");
       return
     }
     if(selected>100000){
       setThumbnailError("File size must be less than 100kb");
       return
     }

     setThumbnailError(null);
     setThumbnail(selected);
     console.log("Thumbnail Updated")
  }


    return (
      <div className='create-blog'>
        <Sidebar/>
        <form onSubmit={handleSubmit} className='form'>
            <h1>Create New Blog Post</h1>

            <div className='blog-details'>
               <label>
                   <span>Title</span>
                   <input type="text" className='form-input'  onChange={(e)=>{setTitle(e.target.value)}} required />
               </label>

               <label>
                   <span>Tags</span>
                   <Select 
                    defaultValue={selectedOption}
                    onChange={(option)=>setSelectedOption(option)}
                    options={options}
                    isMulti
                   />
               </label>

               <label>
                    <span>Attachments</span>
                    <input
                  
                        type="file"
                        className='form-input'
                        onChange={handleFileChange}
                        required
                    />
                    {thumbnailError && <div className="error">{thumbnailError}</div>}
                </label>

                
               <label>
                   <span>ReadTime</span>
                   <input type="number" className='form-input'  onChange={(e)=>{setReadTime(e.target.value)}} />
               </label>
                
            </div>
            <div className='blog-content'>
                <span>Content</span>
                <textarea  type="text" onChange={(e)=>setContent(e.target.value)} required/>
            </div>
            <button>Create</button>
        </form>
        <Footer/>
      </div>
    )
}

export default CreateBlog
