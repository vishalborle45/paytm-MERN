import React, { useState } from 'react'
import Heading from './components/Heading'
import SubHeading from './components/SubHeading'
import InputBox from './components/InputBox'
import { Button } from './components/Button'
import BottomWarning from './components/BottomWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signin() {
  const [email, setEmail] =useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const handleSubmit = async ()=>{

    try {
      const res = await axios.post('http://localhost:3000/api/v1/user/signin',{
        email : email,
        password : password
      })
      console.log(res.data)
      localStorage.setItem('name', res.data.user.firstname)
      localStorage.setItem('token',res.data.token)
      navigate('/dashboard')
      
    } catch (error) {
      console.log(error)
      
    }


  }
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter Your information to sign in"} />
        <InputBox onChange={
          (e)=>{
            setEmail(e.target.value)
          }
        } placeholder={"vishal@gmail.com"} label={"email"} />
        <InputBox onChange={
          (e)=>{
            setPassword(e.target.value)
          }
        } placeholder={"password"} label={"password"} />
        <div className="pt-4">
          <Button label={"Sign in"} onClick={handleSubmit} />
        </div>
        <BottomWarning label={"Not have an account?"} buttonText={"Sign up"} to={"/signup"}/>
      </div>
    </div>
    </div>
  )
}

export default Signin