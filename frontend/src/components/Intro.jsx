import React from 'react'
import { useNavigate } from 'react-router-dom'

const Intro = ({ loggedIn , user }) => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center gap-4 absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]'>
     {
      loggedIn ?  <p className='text-2xl'>Welcome back , <span className='text-green-600 font-bold'>{user}</span></p> : (null)
     }
      {
        loggedIn ?
          <>
            
            <h1 className='text-6xl font-bold'>Quizes <span className='text-green-600'>Await</span></h1>
            <p className='text-xl font-semibold'>Attempt Your First Quiz</p>
            <div onClick={() => navigate('/quizespage')} className='cursor-pointer bg-green-600 w-[200px] h-[20px] p-[2rem] text-white flex justify-center items-center rounded-[15px]'>
              Attempt Quiz
            </div>
            <div onClick={() => navigate('/postquiz')} className='cursor-pointer bg-green-600 w-[200px] h-[20px] p-[2rem] text-white flex justify-center items-center rounded-[15px]'>
              Post a Quiz
            </div>
            

          </> : (
            <>
              <h1 className='text-6xl font-bold'>Learn 10x <span className='text-green-600'>Faster</span></h1>
              <p className='text-xl font-semibold'>Unlock your potential with personalized quizzes</p>
              <div onClick={()=>navigate('/login')} className='cursor-pointer bg-green-600 w-[200px] h-[20px] p-[2rem] text-white flex justify-center items-center rounded-[15px]'>
                Get Started Now
              </div>
            </>
          )
      }
    </div>
  )
}

export default Intro
