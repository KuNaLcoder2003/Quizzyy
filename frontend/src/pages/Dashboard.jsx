import React, { useEffect, useState } from 'react'
import Header from "../components/Header"
import { useNavigate } from 'react-router-dom';
import Intro from '../components/Intro';

const Dashboard = ({loggedIn , setIsLoggedIn}) => {
    const [userDetails , setUserDetails] = useState("");
    const [quizes , setQuizes] = useState([]);
    const navigate = useNavigate()
    const [loading , setLoading] = useState(false);
    useEffect(()=>{
        const token = localStorage.getItem('token');
        setLoading(true);
        fetch('http://localhost:3000/api/v1/user' , {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                authorization : token
            }
        }).then(async(response)=>{
            const data = await response.json();
            if(data.user_details){
                setUserDetails(data.user_details.full_name);
                // setQuizes(data.user_details.previous_quizes);
                setLoading(false);

            }
            else{
                setLoading(false);
                alert('something went wrong')
                navigate('/');
            }
        })
    },[])
  return (
    <div className=''>
        {
            loading ? <div></div> : <>
                <Header loggedIn={loggedIn}  setIsLoggedIn = {setIsLoggedIn} user={userDetails} />
                {
                    quizes.length > 0 ? (null) : <Intro loggedIn={loggedIn} user={userDetails} />
                }
            </>
        }
    </div>
  )
}

export default Dashboard
