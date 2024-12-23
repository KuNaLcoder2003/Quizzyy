const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {signup_schema ,  signin_schema} = require('../types')
const {User} = require('../db')
const jwt = require('jsonwebtoken');
const key = require('../secret')
const authMiddleware = require('../middlewares/authmiddleware')



router.post('/signup' , async(req , res)=> {
    const user_deatils = req.body.details;
    try {
        if(!user_deatils){
            return res.status(400).json({
                message : 'Incomplete details'
            })
        }
        const {success} = signup_schema.safeParse(user_deatils);
        if(!success){
            return res.status(401).json({
                message : "Invalid Inputs"
            })
        }
        const user = await User.findOne({ username : user_deatils.username});
        if(user){
            return res.status(403).json({
                message : 'User already exists'
            })
        }
        const hashed_password = await bcrypt.hash(user_deatils.password , saltRounds)
        const new_user = new User({
            first_name : user_deatils.first_name,
            last_name : user_deatils.last_name,
            username : user_deatils.username,
            password : hashed_password,
        })
        await new_user.save();
        const token = jwt.sign({id : new_user._id} , key);
        res.status(200).json({
            token : token,
            messsage : "Account created successfully"
        })
    } catch (error) {
        res.status(500).json({
            message : "Something went wrong"
        })
    }
})

router.post('/signin' , async(req,res)=>{
    const credentials = req.body.cred;
    try {
        if(!credentials){
            return res.status(400).json({
                message : "Bad request"
            })
        }

        const {success} = signin_schema.safeParse(credentials);
        if(!success){
            return res.status(401).json({
                message : 'Invalid Inputs'
            })
        }
        const user = await User.findOne({username : credentials.username});
        if (!user) {
            return res.status(401).json({
                message : 'Invalid Username or Password'
            })
        }
        const match = await bcrypt.compare(credentials.password , user.password)
        if(!match){
            return res.status(402).json({
                message : 'Invalid Password'
            })
        }
        const token = jwt.sign({id : user._id} , key);
        res.status(200).json({
            token : token,
            message : "Successfully LoggedIn"
        })

    } catch (error) {
        res.status(500).json({
            messsage : "Something went wrong"
        })
    }
})


router.get('/' , authMiddleware , async(req,res)=>{
    const id = req.id;
    try {
        if(!id){
            return res.status(401).json({
                success : false
            })
        }
        const user = await User.findOne({_id : id}).populate('history');
        if(!user){
            return res.status(400).json({
                success : false,
                message : "Bad request"
            })
        }
        const user_details = {
            full_name : `${user.first_name} ${user.last_name}`,
            username : user.username,
            previous_quizes : user.history
        }

        res.status(200).json({
            user_details
        })


    } catch (error) {
        res.status(500).json({
            message : "Something went wrong"
        })
    }
})


module.exports = router;