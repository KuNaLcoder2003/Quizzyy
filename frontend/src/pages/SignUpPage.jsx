import React, { useState } from 'react'
import Input from '../components/Input'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const SignUpPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  })

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      fetch('http://localhost:3000/api/v1/user/signup', {
        method: 'POST',
        body: JSON.stringify({
          details: {
            first_name: credentials.first_name,
            last_name: credentials.last_name,
            username: credentials.username,
            password: credentials.password
          }
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async (response) => {
        const data = await response.json();
        if (data.token) {
          localStorage.setItem('token' , `Bearer ${data.token}`);
          setIsLoggedIn(true);
          toast.success(data.message)
          navigate('/dashboard');

        }
        else {
          setIsLoggedIn(false);
          toast.error(data.message)
        }
      })
    } catch (error) {
      setIsLoggedIn(false);
      alert('try again : ' + error)
    }
  }
  return (
    <div className='relative p-[2rem] h-[100%]'>
      <form className='relative h-[600px] w-[400px] flex flex-col justify-center items-center  m-auto w-[60%] gap-7 shadow-2xl' onSubmit={submitHandler}>
        <h2 className='mb-[20px] text-4xl text-bold'>SignUp</h2>
        <div className='flex flex-col items-center w-[220px] gap-2'>
          <p>First Name</p>
          <Input placeHolder={"Enter your username..."} value={credentials.first_name} onChange={(e) => setCredentials({
            ...credentials,
            first_name: e.target.value
          })} className={'boder-solid border border-green-500 w-[90%] h-[35px] p-[0.7rem] rounded-md'} />
        </div>

        <div className='flex flex-col items-center w-[220px] gap-2'>
          <p>Last Name</p>
          <Input placeHolder={"Enter your password..."} value={credentials.last_name} onChange={(e) => setCredentials({
            ...credentials,
            last_name: e.target.value
          })} className={'border-solid border border-green-500 w-[90%] h-[35px] p-[0.7rem] rounded-md'} />
        </div>

        <div className='flex flex-col items-center w-[220px] gap-2'>
          <p>Username</p>
          <Input placeHolder={"Enter your username..."} value={credentials.username} onChange={(e) => setCredentials({
            ...credentials,
            username: e.target.value
          })} className={'boder-solid border border-green-500 w-[90%] h-[35px] p-[0.7rem] rounded-md'} />
        </div>

        <div className='flex flex-col items-center w-[220px] gap-2'>
          <p>Password</p>
          <Input placeHolder={"Enter your password..."} value={credentials.password} onChange={(e) => setCredentials({
            ...credentials,
            password: e.target.value
          })} className={'border-solid border border-green-500 w-[90%] h-[35px] p-[0.7rem] rounded-md'} />
        </div>

        <button type='submit' className='cursor-pointer bg-green-600 w-[130px] h-[20px] p-[2rem] text-white flex justify-center items-center rounded-[15px]'>
          SignUp
        </button>
        <p className='absolute top-[95%]'>Already have an account? <span className='cursor-pointer' onClick={() => navigate('/login')}>Login</span></p>
      </form>
    </div>
  )
}

export default SignUpPage
