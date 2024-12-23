import React, { useEffect, useState  } from 'react'
import { useNavigate } from 'react-router-dom';

const Timer = ({id}) => {
    const [timeRemaining , setTimeRemaining] = useState(0);
    const [dead , setDead] = useState(false);
    const navigate = useNavigate();

  const deadline = Date.now() + 5 * 60 * 1000;
    useEffect(()=>{
        const interval = setInterval(()=>{
  
            let remaining = deadline - Date.now();
            if(remaining <=0 ){
                clearInterval(interval)
                setTimeRemaining(0)
                setDead(true);
                return 0;
            }
            else {
                remaining = remaining -1;
                setTimeRemaining(remaining);
            }

            return ()=> clearInterval(interval)
        } , 1000)
    } , [])

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // if(dead){
    //     navigate('/dashboard');
    // }
  return (
    <div className=''>
      {formatTime(timeRemaining)}
    </div>
  )
}

export default Timer
