import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


//we are checking the authentication so in this use case we are checking that when user opens the site ,if he is logged in then he will be directed to home page otherwise to login area!
export default function Protected({children, authentication = true}) {
    const navigate=useNavigate()
    const [loading,setLoading]=useState(true)
    const authStatus=useSelector((state)=>(state.auth.status))

    useEffect(() => {
      if(authentication && authStatus !== authentication){
        navigate("/")
    } else if(!authentication && authStatus !== authentication){
        navigate("/all-posts")
    }
    setLoading(false)
}, [authStatus, navigate, authentication])

  return (
    <>
    {loading? "loading":children}
      
    </>
  )
}


