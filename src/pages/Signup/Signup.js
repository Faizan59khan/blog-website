import React,{useState,useEffect} from 'react'
import { useSignup } from '../../hooks/useSignup'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

import '../Login/Login.scss'

const Signup = () => {

    const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)

  const {signup, error, isPending}=useSignup();


  const {user}=useAuthContext();
  const Navigate=useNavigate();

  useEffect(() => {
    if(user){
      Navigate('/')
    }
 }, [user,Navigate])

  
  const handleSubmit = (e) => {
      e.preventDefault();
      signup(email,password,displayName,thumbnail)
      console.log(email,password,displayName,thumbnail)
     
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
      <div>
        <Navbar/>
        <div className='login'>

            <h1>Create An Account</h1>
            <p>Create an account to enjoy all services without any adds for free!</p>

            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} />
                <input type="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} />

              
                    <input
                        required
                        type="text"
                        placeholder='Display Name'
                        onChange={(e) => setDisplayName(e.target.value)}
                        value={displayName}
                    />
         
                    <input
                        required
                        type="file"
                        placeholder='Upload Image'
                        onChange={handleFileChange}
                    />
                    {thumbnailError && <div className="error">{thumbnailError}</div>}
         

                {isPending && <button>Loading...</button>}
                {!isPending && <button>Sign up</button>}
                {error && <p>{error}</p>}
            </form>
            
        </div>
        <Footer/>
        </div>
    )
}

export default Signup
