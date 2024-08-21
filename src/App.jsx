
import { Outlet } from 'react-router-dom'
import './App.css'
import './responsive.css'

import Footer from './components/Footer'
import Login from './components/Login'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authservice from './appwrite/auth'
import { login,logout } from './store/authSlice'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Welcome from './components/Welcome'
import MyBLogs from './components/MyBLogs'
import AllPosts from './components/AllPosts'


function App() {
const [loading,setLoading]=useState(true)
const authStatus=useSelector((state)=>(state.auth.status))

const dispatch=useDispatch();
useEffect(() => {
  authservice.getloggedinuser()
  .then((userData)=>{
    //agr userdata hai to login agrn nhi hai to mtlb user hai hi nhi
    if (userData) {
      dispatch(login({userData}))
    } else {
      dispatch(logout())
    }
  
  })
  .finally(()=>(setLoading(false)))
}, [])




return (
  <>
  
 
  {loading? <div className='header '> <div className="opacity"></div> 
  <div className="z-index"> <h6> Loading...</h6></div></div> :<div>
    
    <Navbar /> 
   

    <Outlet/>
    
    </div>
  
    }
    
    
    </>
  )
}

export default App
