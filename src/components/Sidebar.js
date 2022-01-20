import React from 'react'
import './Sidebar.scss'
import { Link } from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Sidebar = () => {

  const { logout, error, isPending }=useLogout();
  const {user}=useAuthContext();

    return (
      <div className='sidebar'>
         <div className="logo">
                Nordic Rose
        </div>
        {user && <div className='user-name'>
              {user.displayName}
        </div>}
       {/* <div className="header" />  */}
      <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu" />
      <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
        <div className="spinner diagonal part-1" />
        <div className="spinner horizontal" />
        <div className="spinner diagonal part-2" />
      </label>
      <div id="sidebarMenu">
        <ul className="sidebarMenuInner">
       
           <li><Link to="/">Dashboard</Link></li>
           <li><Link to="/about">About</Link></li>
           <li><Link to="/createblog">Create Blog</Link></li>
           <li><Link to="/blog">Blog</Link></li>
           <li onClick={logout}><Link to="/login">Log out</Link></li>
        </ul>
      </div>
      
    </div>
    )
}

export default Sidebar
