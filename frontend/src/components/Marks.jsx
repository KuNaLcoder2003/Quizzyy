import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Marks = ({ marks, quizId }) => {
    const navigate  = useNavigate();
    
    return (
        <div className='flex flex-col items-center gap-4 absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]'>
            <p className='text-2xl'>Your Score</p>
            <h1 className='text-6xl font-bold'>{marks}</h1>
            <div onClick={() => navigate(`/${quizId}`)} className='cursor-pointer bg-green-600 w-[200px] h-[20px] p-[2rem] text-white flex justify-center items-center rounded-[15px]'>
               Try Agian
            </div>
            <div onClick={()=>navigate('/')} className='cursor-pointer bg-green-600 w-[200px] h-[20px] p-[2rem] text-white flex justify-center items-center rounded-[15px]' >Home</div>
        </div>
    )
}

export default Marks
