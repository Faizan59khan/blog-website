import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import Avatar from './Avatar'



//styles
import './Navbar.scss'


const Navbar = () => {

    const [navOpen,setNavOpen]=useState(false);
    const {user}=useAuthContext();
    const {logout,error,isPending}=useLogout();

    const handleClick = (e) =>{
        e.preventDefault();

     let navItem=document.querySelector(".Navbar__Items");
        if(!navOpen){
            navItem.style.display="block";
            setNavOpen(true);
          }
        else{
            navItem.style.display="none";
            setNavOpen(false);
        }

    }


    return (


        <div className="Navbar">
            <div className="logo">
                Nordic Rose
            </div>
            <div className="Navbar__Link Navbar__Link-toggle" onClick={handleClick}>
                <i className="fas fa-bars" />
            </div>
            <nav className="Navbar__Items">
            <div className="Navbar__Link">
                    <Link to="/" >Dashboard</Link>
                </div>
                <div className="Navbar__Link">
                    <Link to="/blog" >Blog</Link>
                </div>
                <div className="Navbar__Link">
                    <Link to="/about">About</Link>
                </div>
                {!user && <div className="Navbar__Link">
                    <Link to="/login" >Login</Link>
                </div>
                }
                {!user && <div className="Navbar__Link">
                    <Link to="/signup">Signup </Link>
                </div>
                }
                 {
                    user && <div className="Navbar__Link" onClick={logout}>
                     <a>Log out</a>
                </div>
                }
                {
                    user && <div className='user-name'>
                        <Avatar src={user.photoURL}/>
                        <span>{user.displayName}</span>
                    </div>
                }
                
            </nav>
        </div>









        // <nav>
        //     <div className='logo'>Nordic Rose</div>

        //     <div className='nav-links'>
            
        //        <Link  to="/blog">Blog</Link>
        //        {!user && <Link to="/login">Login</Link>}
        //        {!user && <Link to="/signup">Signup</Link>}
        //        {user && <h3>{user.displayName}</h3>}
        //        {user && <button onClick={logout}>Log out</button>}
            
        //     </div>
        // </nav>
    )
}

export default Navbar
