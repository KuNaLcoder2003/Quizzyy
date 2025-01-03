const express = require('express');
const router = express.Router();
const {User , Quiz , Result} = require('../db')
const authMiddleware = require('../middlewares/authmiddleware');


router.get('/' , authMiddleware , async(req , res)=> {
    const user_id = req.id;
    try {
        if(!user_id){
            return res.status(401).json({
                success : false,
                message : "Bad request"
            })
        }
        const quizes = await Quiz.find({}).populate('posted_by')
        if(quizes.length == 0){
            return res.status(403).json({
                message : "No quiz found"
            })
        }
        res.status(200).json({
            quizes
        })
    } catch (error) {
        res.status(500).json({
            message : "Something went wrong"
        })
    }
})

router.get('/:quizId' , authMiddleware , async(req , res)=> {
    const userId = req.id;
    const quizId = req.params.quizId;
    try {
        if(!userId){
            return res.status(401).json({
                success : false,
                message : "Bad request"
            })
        }

        const quiz = await Quiz.findOne({_id : quizId}).populate('posted_by').populate('users');
        if(!quiz){
            return res.status(404).json({
                success : false,
                message : "Quiz not found",
            })
        }
        res.status(200).json({
            success : true,
            quiz_details : quiz
        })

    } catch (error) {
        res.status(500).json({
            message : "Something went wrong"
        })
    }
})

router.post('/' , authMiddleware , async(req , res)=> {
    const userId = req.id;
    try {
        if(!userId){
            return res.status(401).json({
                success : false,
                message : "Bad request"
            })
        }
        const quiz_details = req.body.details;
        if(!quiz_details){
            return res.status(402).json({
                success : false,
                messsage : "Incomplete quiz details"
            })
        }
        const newQuiz = new Quiz({
            posted_by : userId,
            quiz_name : quiz_details.quiz_name,
            questions : quiz_details.questions,
        })
        await newQuiz.save();
        res.status(200).json({
            sucess : true,
            message : 'New quiz added!'
        })


    } catch (error) {
        res.status(500).json({
            message : 'Something went wrong'
        })
    }
})

router.post('/quizAttempt/:quizId' , authMiddleware , async(req,res)=>{
    const id  = req.id;
    const userResponses = req.body.quiz_responses;
    console.log(userResponses)
    const quizId = req.params.quizId;
    let marks = 0;

    try {
        
        if(!id){
            return res.status(401).json({
                success : false,
                message : "Bad request"
            })
        }
        
        if(!userResponses){
            return res.status(401).json({
                success : false,
                message : "Bad request , unable to process your response"
            })
        }
        
        if(!quizId){
            return res.status(401).json({
                success : false,
                message : "Bad request"
            })
        }
       
        const user_updated = await User.findOneAndUpdate({_id : id} , {$push : {history : {quizId}}})
        
        if(!user_updated){
            return res.status(403).json({
                success : false,
                message : 'Can not update quiz details'
            })
        }
        
        const quiz = await Quiz.findOneAndUpdate({_id : quizId} , {$push : {users : {id} }})
        const questions = quiz.questions;

        for(let i = 0 ;  i < userResponses.length ; i++){
            // console.log(typeof userResponses[i].response)
            if(userResponses[i].respone == questions[i].correct_option){
                marks = marks + 1;
            }
        }
        const result = await Result.findOne({quiz_id : quizId}) 

        if(!result){
            const new_result = new Result({
                quiz_id : quizId,
                users_marks : [{user_id : id , marks : marks}]
            })
            await new_result.save()
            return res.status(200).json({
                success : true,
                message : 'Responses recieved'
            })
        }
        
        else {
            let temp_obj = {
                user_id : id,
                marks : marks
            }
            const result = await Result.findOneAndUpdate({quiz_id : quizId} , {$push : {users_marks : temp_obj}})
            return res.status(200).json({
                success : true,
                message : 'Responses recieved'
            })
        }        

    } catch (error) {
        res.status(500).json({
            message : error
        })
    }
})

router.get('/marks/:quizId' , authMiddleware ,async(req,res)=>{
    const id = req.id;
    const quizId = req.params.quizId;
    try {
        
        if(!id){
            return res.status(401).json({
                success : false,
                message : "Bad request"
            })
        }
        
        if(!quizId){
            return res.status(401).json({
                success : false,
                message : "Bad request"
            })
        }

        const quiz = await Quiz.findOne({_id : quizId})


        const marks = await Result.findOne({quiz_id : quizId});
        // console.log('three')
        if(!marks){
            return res.status(400).json({
                success : false,
                message : "Unable to get marks"
            })
        }
        const users_marks = marks.users_marks;
        const required = users_marks.filter(user => user.user_id == id);
        if(required.length == 0){
            return res.status(400).json({
                success : false,
                message : "Unable to get marks" 
            })
        }
        const mark = required[0].marks
        res.status(200).json({
            success : true,
            marks : mark, 
            no_of_questions : quiz.questions.length,
            quiz_name : quiz.quiz_name
        })
    } catch (error) {
        res.status(500).json({
            message : error
        })
    }
})
module.exports = router;
