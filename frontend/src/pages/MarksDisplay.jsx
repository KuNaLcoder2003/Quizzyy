import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Marks from '../components/Marks';

const MarksDisplay = () => {
    const [marks , setMarks] = useState(null);
    const params = useLocation();
    const id =  params.pathname.split('/').at(-1);

    useEffect(()=>{

        try {
            const id  = params.pathname.split('/').at(-1);
            const token = localStorage.getItem('token');
            if(!id){
                return 0;
            }
            fetch('http://localhost:3000/api/v1/quiz/marks/'+id , {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                    authorization : token
                }
            }).then(async(response)=>{
                const data = await response.json()
                if(data.success){
                    setMarks(data.marks);
                }
                else{
                    alert(data.message);
                }
            })

        } catch (error) {
            console.log('error : ' , error );
        }
    } , [])
  return (
    <Marks quizId={id} marks={marks}/>
  )
}

export default MarksDisplay
