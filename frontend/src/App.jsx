import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './pages/LandingPage'
import { Routes , Route, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Dashboard from './pages/Dashboard'
import QuizesPage from './pages/QuizesPage'
import PostQuizPage from './pages/PostQuizPage'
import QuizAttempt from './pages/QuizAttempt'
import MarksDisplay from './pages/MarksDisplay'

function App() {

  const [loggedIn , setIsLoggedIn] = useState(false)
  const navigate  = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      setIsLoggedIn(true)
    }
    else {
      setIsLoggedIn(false)
    }
  } , [])
  
  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/login' element={loggedIn ?<Dashboard loggedIn={loggedIn} setIsLoggedIn={setIsLoggedIn} /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />
      <Route path='/signup' element={<SignUpPage setIsLoggedIn={setIsLoggedIn} />} />
      <Route path='/dashboard' element={loggedIn ? <Dashboard loggedIn={loggedIn} setIsLoggedIn={setIsLoggedIn} /> : <LandingPage/>} />
      <Route path='/quizespage' element={<QuizesPage/>} />
      <Route path='postquiz' element={<PostQuizPage/>} />
      <Route path='/:quizId' element={<QuizAttempt/>} />
      <Route path='/marks/:quizId' element={<MarksDisplay/>} />
    </Routes>
    </>
  )
}

export default App
