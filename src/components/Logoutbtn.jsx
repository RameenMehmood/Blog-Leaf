import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../appwrite/auth'
import { logout } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'

const Logoutbtn = () => {
    const dispatch=useDispatch()
    const navigate = useNavigate();
    const handlelogout=()=>{
        authservice.logout()
        .then(()=>{
            dispatch(logout())
            navigate("/");
        })
    }
  return (
    <>
      <button className='btn-logout hover' onClick={handlelogout}>Logout</button>
    </>
    
  )
}

export default Logoutbtn
