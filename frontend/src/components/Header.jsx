import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = ({loggedIn , user , setIsLoggedIn}) => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-between items-center w-[100%] m-auto'>
      <div className='flex justify-around items-center gap-2'>
        <img className='w-[50px]' src='https://img.icons8.com/?size=100&id=42216&format=png&color=40C057' />
        <h2 className='text-2xl'>Quizyy</h2>
      </div>

      <div className='cursor-pointer bg-green-600 w-[130px] h-[20px] p-[2rem] text-white flex justify-center items-center rounded-[15px]'>
        
        {
          loggedIn ? <p onClick={()=>{
            localStorage.removeItem('token')
            setIsLoggedIn(false)
            navigate('/')
          }} >Logout</p> : <p onClick={()=>navigate('/login')} >Login</p>
        }
      </div>
    </div>
  )
}

export default Header
