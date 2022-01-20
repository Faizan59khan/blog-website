import React from 'react'
import './Footer.scss'

const Footer = () => {
    return (
       <footer>
            <marquee width="100%" direction="left" height="100px">
                <h4>Digital<span>Product</span> Design<span>Remote </span>Digital<span>Product</span> Design<span>Remote</span>
                Digital<span>Product</span> Design<span>Remote</span>
                </h4>
            </marquee>

            <div className='footer-end'>
               <h1>Nordic Rose</h1>
               <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
               <div className='social-links'>
                  <a href='#'>Twitter</a>
                  <a href='#'>Linkedin</a>
                  <a href='#'>RSS</a>
               </div>
           
               <p id='footer-date'><span>© 2012-2022.Nordic Rose</span> <span>Co. All Rights Reserved.</span></p>
              
            </div>
       </footer>
    )
}

export default Footer
