import React, { useState } from 'react'

const Question = ({question , question_number , options , collectResponses , change}) => {
    console.log('hello :',question);
    console.log(options)
    const [userResponse , setUserResponse] = useState(0);
    const mapping = {
        1 : 'A',
        2 : 'B',
        3 : 'C',
        4 : 'D'
    }
    function handleSubmit(){

        if(userResponse > 0) {
            collectResponses(userResponse);
        }
        else {
            collectResponses(0);
        }
        setUserResponse(0);

    }
  return (
    <div className='flex flex-col gap-4'>

        <div className='flex justify-center items-center gap-2'>
            <div className='text-white bg-green-600 w-[50px] h-[50px] flex items-center justify-center rounded-md'>
                {question_number}
            </div>

            <div className=''>
                {question}
            </div>
        </div>

        <div className='flex flex-col gap-2 items-baseline justify-center m-auto'>
            {
                options.map( (option , index)=>{
                    return (
                        <div key={index} onClick={()=>setUserResponse(index+1)} className={`cursor-pointer hover:bg-green-600 hover:text-white flex gap-4 items-baseline jutify-center border-solid border-2 border-green-400 w-[24rem] p-[1.1rem] rounded-md ${ index + 1 == userResponse ? "bg-green-600" : ""}`}>
                            <p>{`${mapping[index+1]}`}</p>
                            <div>{option.option_desc}</div>
                        </div>
                    )
                })
            }
            <div onClick={()=>change(handleSubmit)} className='self-end cursor-pointer bg-green-600 w-[130px] h-[20px] p-[2rem] text-white flex justify-center items-center rounded-[15px]'>Submit</div>
            
        </div>
      
    </div>
  )
}

export default Question
