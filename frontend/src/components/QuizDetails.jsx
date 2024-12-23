import React from 'react'
import { useNavigate } from 'react-router-dom'

const QuizDetails = ({quiz_name , posted_by , questions , no_of_attempts , quiz_id}) => {
  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/${quiz_id}`)} className='w-[300px] h-[300px] border-solid border-2 border-green-400 p-[0.5rem] flex flex-col gap-2 items-center justify-center'>
      <div className='w-[90%] bg-green-300 h-[150px] rounded-md' >
        {/* image holder */}

      </div>

      <div className='' >
        {/* description */}
        <h3>{quiz_name}</h3>
        <p>Posted By : {posted_by}</p>
        <p>No of Questions : {questions}</p>
        <p>Users Attempted : {no_of_attempts}</p>
      </div>

      <div className='cursor-pointer bg-green-600 w-[130px] h-[20px] p-[2rem] text-white flex justify-center items-center rounded-[15px]'>
        Attempt
      </div>

    </div>
  )
}

export default QuizDetails
