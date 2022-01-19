import React,{useState,useEffect} from 'react'
import { useLogin } from '../../hooks/useLogin'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

//styles
import './Login.scss'

const Signup = () => {

    const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


 
   
  const {login, error, isPending}=useLogin();


  const {user}=useAuthContext();
  const Navigate=useNavigate();

  useEffect(() => {
    if(user){
      Navigate('/')
    }
 }, [user,Navigate])

  
  const handleSubmit = (e) => {
      e.preventDefault();
      login(email,password);
      console.log(email,password)
     
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

               

                <button>Log in</button>
                {error && <p>{error}</p>}
            </form>
            
        </div>
        <Footer/>
        </div>
    )
}

export default Signup