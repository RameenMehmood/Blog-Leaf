import React, { useState } from 'react'
import authservice from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Link } from 'react-router-dom'
import Input from './Input'

function Signup() {
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const [error, setErrors] = useState("")

    const create = async (data) => {
        setErrors("")
        try {
            const session = await authservice.createAccount(data)
            if (session) {
                const userData = await authservice.getloggedinuser()
                if (userData) dispatch(login(userData)) 
                    navigate("/")
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
        <div className='signup zindex-login'>
            <div className="login-mp">
          <h2 className='text-center'>Create your Account</h2>
          
      {error && <p className='error text-center'> {error} </p>}
      <form className='.form' onSubmit={handleSubmit(create)}>
        <div className='mt-44'>
            <Input
        label={<label style={{ paddingRight: '2px' }}>Full Name: </label>}
            placeholder= "Enter your name"
            className="label"
            {...register("name",{required:true})} 
            />
            </div>
            <div>
            <Input
        label={<label className="style-label-s">Email:</label>}
        placeholder="Enter your email"
        type="email"
        className="label"
        {...register("email",{
            required:true,
            validate: {
                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            }

         })}
        />
        </div>
        <div>
        <Input
        label={<label style={{ paddingRight: '6px' }}>Password:</label>}
        placeholder="Enter your password"
        type="password"
        className="label"
        {...register("password",{
            required:true}
        )}
        />
        <button className='btn-signup hover' type='submit'>Create Account</button>
        </div>
      </form>
      <p className='mb mb-s'>Already have an account?
        <Link to={"/login"}>
        Login
        </Link>
      </p>
      </div>
      </div>
      </div>
        </>
    )
}

export default Signup
