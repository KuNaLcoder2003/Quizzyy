import React, { useState } from 'react'

const QuestionPost = ({ questionNumber , saveDetails }) => {
    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");
    const [correct, setCorrect] = useState('');
    function saveHandler(){
        let options = [{
            option_desc : option1
        } , {
            option_desc : option2
        } , {
            option_desc : option3
        } , {
            option_desc : option4
        }]
        saveDetails(question, options , correct )
    }
    return (
        <div className='flex flex-col w-[90%] border-solid border-2 border-green-200 jutify-center gap-8 p-[10px]'>


            <div className='flex items-center jutify-center gap-4 w-[90%] m-auto'>
                {/* question */}
                <p>Question {questionNumber} </p>
                <input placeholder='Enter Your Question...' className='w-[80%] border-solid border-2 border-green-200 p-[0.7rem]' value={question} onChange={(e) => setQuestion(e.target.value)} />
            </div>

            <div className='flex items-center jutify-center gap-4 w-[90%] m-auto'>
                {/* options */}
                <p>Choices </p>
                <div className='w-[100%] flex flex-col justify-center gap-4  border-solid border-2 border-green-200 p-[0.7rem]'>
                    <div className='flex items-center gap-4'>
                        <p> A : </p>
                        <input placeholder='Your 1st option...' value={option1} onChange={(e) => setOption1(e.target.value)} className='w-[80%] border-solid border-2 border-green-200 p-[0.7rem]' />
                    </div>

                    <div className='flex items-center gap-4' >
                        <p> B : </p>
                        <input placeholder='Your 2nd option...' value={option2} onChange={(e) => setOption2(e.target.value)} className='w-[80%] border-solid border-2 border-green-200 p-[0.7rem]' />
                    </div>

                    <div className='flex items-center gap-4' >
                        <p> C : </p>
                        <input placeholder='Enter your 3rd option...' value={option3} onChange={(e) => setOption3(e.target.value)} className='w-[80%] border-solid border-2 border-green-200 p-[0.7rem]' />
                    </div>

                    <div className='flex items-center gap-4' >
                        <p> D : </p>
                        <input placeholder='Your 4th option...' value={option4} onChange={(e) => setOption4(e.target.value)} className='w-[80%] border-solid border-2 border-green-200 p-[0.7rem]' />
                    </div>
                    <div className='flex items-center gap-4'>
                        <p>Correct Choice : </p>
                        <input className='w-[60%] border-solid border-2 border-green-200 p-[0.7rem]' value={correct} placeholder='What is the correct choice' onChange={(e) => setCorrect(e.target.value)} />
                    </div>
                </div>
            </div>

            <div onClick={saveHandler} className='cursor-pointer bg-green-600 w-[200px] h-[20px] p-[2rem] m-auto text-white flex justify-center items-center rounded-[15px]'>Save Question</div>

        </div>
    )
}

export default QuestionPost
