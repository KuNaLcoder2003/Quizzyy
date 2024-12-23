import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Question from '../components/Question';
import Timer from '../components/Timer';
import toast from 'react-hot-toast';
// import { options } from '../../../backend/routes/quiz';

const QuizAttempt = () => {
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const params = useLocation();
    const navigate = useNavigate();

    // const [deadline, setDeadLine] = useState(false);

    const [userResponses, setUserResponses] = useState([]);

    const id = params.pathname.split('/').at(-1);


    function changeQuestion(callback){
        callback();
        if(index >= questions.length-1  ){
            toast.error('no more question')
        }
        else{
            setIndex(index+1);
            localStorage.setItem('index' , JSON.stringify(index+1))
        }
    }


    function collectResponses(respone) {
        const arr = localStorage.getItem('user_responses')
        let obj = {
            question: index + 1,
            respone: respone
        }
        if(!arr){
            let arr = [obj]
            localStorage.setItem('user_responses' , JSON.stringify(arr))
            setUserResponses(arr);
        }
        else{
            let arr = JSON.parse(localStorage.getItem('user_responses'))
            arr.push(obj)
            localStorage.setItem('user_responses' , JSON.stringify(arr))
            setUserResponses(arr)
        }
    }
    useEffect(() => {

        const questions = JSON.parse(localStorage.getItem('questions'))

        const index = localStorage.getItem('index');

        if ( !index || !questions) {
            const token = localStorage.getItem('token');
            const id = params.pathname.split('/').at(-1);
            try {
                fetch('http://localhost:3000/api/v1/quiz/' + id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: token
                    }
                }).then(async (respone) => {
                    const data = await respone.json();
                    if (data.success) {
                        setQuestions(data.quiz_details.questions);
                        const stringed = JSON.stringify(data.quiz_details.questions);
                        localStorage.setItem('questions', stringed)
                        localStorage.setItem('index', JSON.stringify(index));
                        console.log(data.quiz_details.questions)
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }

        else{
            const questions = JSON.parse(localStorage.getItem('questions'))
            console.log('from local storage : ' , questions);
            const index = localStorage.getItem('index');
            setQuestions(questions);
            console.log(index);
            setIndex(Number(index));
        }

    }, [])

    function quizSubmitHandler() {
        const id = params.pathname.split('/').at(-1)
        const token = localStorage.getItem('token')
        console.log(userResponses);
        try {
            fetch('http://localhost:3000/api/v1/quiz/quizAttempt/' + id, {
                method: 'POST',
                body: JSON.stringify({
                    quiz_responses: userResponses
                }),
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token,
                }
            }).then(async (response) => {
                const data = await response.json();
                if (data.success) {
                    navigate(`/marks/${id}`);
                    toast.success(data.message);
                    localStorage.removeItem('questions');
                    localStorage.removeItem('index');
                    localStorage.removeItem('user_responses');
                }

                else {
                    alert(data.message);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className=''>
            <div className='flex justify-between items-center w-[100%] m-auto'>
                <div className='flex justify-around items-center gap-3'>
                    <img className='w-[50px]' src='https://img.icons8.com/?size=100&id=42216&format=png&color=40C057' />
                    <h2 className='text-2xl'>quiz name</h2>
                </div>

                <div className='cursor-pointer bg-green-600 w-[130px] h-[20px] p-[2rem] text-white flex justify-center items-center rounded-[15px]'>
                    <Timer id={id} />
                </div>
            </div>

            {
                questions.length > 0 ? <Question question={questions[index].question} change={changeQuestion} options={questions[index].options} question_number={index + 1} collectResponses={collectResponses} /> : <div>Loading</div>
            }
            <div onClick={() => {
                if (index >= questions.length - 1) {
                    alert("no questions")
                }
                else {
                    setIndex(index + 1); console.log(index) ; localStorage.setItem('index' , index+1);
                }
            }} className='m-auto relative top-[20px] left-[130px] cursor-pointer bg-green-600 w-[130px] h-[20px] p-[2rem] text-white flex justify-center items-center rounded-[15px]'>Next</div>

            {
                index >= questions.length - 1 ? <div onClick={quizSubmitHandler} className='m-auto relative top-[-5rem] left-[-8rem] cursor-pointer bg-green-600 w-[130px] h-[20px] p-[2rem] text-white flex justify-center items-center rounded-[15px]'>Submit Quiz</div> : null
            }
        </div>
    )
}

export default QuizAttempt
