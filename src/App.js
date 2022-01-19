import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import { useAuthContext } from './hooks/useAuthContext'
import CreateBlog from './pages/CreateBlog/CreateBlog';
import Blog from './pages/Blog/Blog';
import Blogpost from './pages/Blog/Blogpost';
import Login from './pages/Login/Login';
import About from './pages/About/About';


function App() {

  const {authIsReady}= useAuthContext();

  return (
    <div className="App">
        
      {authIsReady && 
        <BrowserRouter>
         
         <Routes>
           <Route path="/" element={<Dashboard/>} />
           <Route path="/login" element={<Login/>}/>
           <Route path="/signup" element={<Signup/>}/>
           <Route path="/createblog" element={<CreateBlog/>}/>
           <Route path="/blog" element={<Blog/>}/>
           <Route path="/blogpost/:id" element={<Blogpost/>}/>
           <Route path="/about" element={<About/>}/>
         </Routes>
      
      
      </BrowserRouter>
    }
      
    </div>
  );
}

export default App;
