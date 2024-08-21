import React, { useState } from 'react'
import {login as authLogin} from '../store/authSlice'
import authservice from '../appwrite/auth'
import Input from './Input'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

const Login = () => {
    const navigate=useNavigate()
    const dispatch =useDispatch()
    const {register,handleSubmit}=useForm()
    const [error,setErrors]=useState("")

    const login=async(data)=>{
    setErrors("")
    try {
        const session=await authservice.login(data)  
        if (session) {
            const userData=await authservice.getloggedinuser()
            if (userData) dispatch(authLogin({userData}))
                navigate ("/")
        } 
    } catch (error) {
        setErrors(error.message)
    }
    }
  return (
    <>
    <div className="header">
    <div class="opacity">       
    </div>
    <div className="login zindex-login">
   <div className="login-mp">
      <h2 className='text-center'>Login to your account</h2> 
      {error && <p className='error text-center'> {error} </p>}
      <form className='.form' onSubmit={handleSubmit(login)}>
        <div className='mt-44'>
        <Input 

        label={<label className="style-label">Email:</label>}
        placeholder="Enter your email"
        type="email"
        className="label "
        {...register("email",{
            required:true}
        )}
        />
        </div>
        <div>
        <Input
        label={<label style={{ paddingRight: ' 6px' }}>Password:</label>}
        placeholder="Enter your password"
        type="password"
        className="label"
        {...register("password",{
            required:true}
        )}
        />
        <button type='submit' className='btn hover'>Login</button>
        </div>
      </form>
      <p className='mb'>Dont have a account?
        <Link to={"/signup"}>
        Sign up
        </Link>
      </p>
      </div>
      </div>
      </div>
    </>
  )
}

export default Login

