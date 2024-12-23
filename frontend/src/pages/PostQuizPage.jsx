import React, { useState } from 'react'
import QuestionPost from '../components/QuestionPost'

const PostQuizPage = () => {
    let count = 1;
    const [questionCount, setQuestionCount] = useState([count]);
    const [quizName, setQuizName] = useState("");

    const [questions , setQuestions] = useState([]);

    function saveDetails(question , options , correctAnswer){
        let ques = {
            question : question,
            options : options,
            correct_option: correctAnswer
        }
        setQuestions([...questions , ques])
        console.log(ques)
        console.log(questions)
    }

    function saveQuizQuestions(){
        const token  = localStorage.getItem('token')
        try {

            fetch('http://localhost:3000/api/v1/quiz' , {
                method : 'POST',
                body : JSON.stringify({
                    details : {
                        quiz_name : quizName,
                        questions : questions
                    }
                }),
                headers : {
                    'Content-Type' : 'application/json',
                    authorization : token
                }
            }).then(async(response)=>{
                const data = await response.json();
                console.log(data);
            })
        } catch (error) {
            
        }
    }
    return (
        <div className=''>
            <>
                <div className='flex justify-between items-center w-[100%] m-auto'>
                    <div className='flex justify-around items-center gap-3'>
                        <img className='w-[50px]' src='https://img.icons8.com/?size=100&id=42216&format=png&color=40C057' />
                        <h2 className='text-2xl'>Quiz Builder</h2>
                    </div>

                    <div onClick={saveQuizQuestions} className='cursor-pointer bg-green-600 w-[130px] h-[20px] p-[2rem] text-white flex justify-center items-center rounded-[15px]'>
                        Save
                    </div>
                </div>
            </>
            <div className='w-[100%] flex flex-col gap-4'>
                <div className='flex items-center justify-center gap-4 w-[90%] border-solid border-2 border-green-200 m-auto p-[1.1rem]'>
                    <p>Quiz Name </p>
                    <input className='w-[80%] border-solid border-2 border-green-200 p-[0.7rem]' placeholder='Enter Quiz Name...' value={quizName} onChange={(e) => setQuizName(e.target.value)} />
                </div>

                <div className='flex flex-col gap-6 '>
                    {
                        questionCount.map( (number)=>{
                            count = number;
                            return (
                                <QuestionPost questionNumber={number} saveDetails={saveDetails} />
                            )
                        } )
                    }
                    <div onClick={()=>{
                        count++;
                        setQuestionCount([...questionCount , count])
                    }}>Add Question</div>
                </div>
            </div>
        </div >)
}

export default PostQuizPage
