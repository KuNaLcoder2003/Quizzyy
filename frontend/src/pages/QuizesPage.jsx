import React, { useEffect, useState } from 'react'
import QuizDetails from '../components/QuizDetails';

const QuizesPage = () => {
    const [quizes , setQuizes] = useState([]);
    localStorage.removeItem('questions');
    localStorage.removeItem('index');
    useEffect(()=> {
        const token = localStorage.getItem('token');
        fetch('http://localhost:3000/api/v1/quiz/' , {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                authorization : token
            }
        }).then(async(response)=> {
            const data = await response.json()
            console.log(data);
            if(data.quizes){
              setQuizes(data.quizes);
            }
            else{
              setQuizes([]);
            }
        })
    } , [])
  return (
    <div className='flex items-center justify-center gap-4'>
      {
        quizes.length > 0 ? <>
        {
          quizes.map(quiz => {
            return(
              <QuizDetails key={quiz._id} questions={quiz.questions.length} posted_by={ "Riday Singh"} no_of_attempts={quiz.users.length} quiz_id={quiz._id} quiz_name={quiz.quiz_name} />
            )
          })
        }
        </> : (<div>No quizes</div>)
      }
    </div>
  )
}

export default QuizesPage
