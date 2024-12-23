const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://kunal:kunal@cluster0.acncl.mongodb.net/')

const USER_SCHEMA = new mongoose.Schema({
    first_name : {
        type : String,
        required : true,
        unique : false,
    } , 
    last_name : {
        type : String,
        required : true,
        unique : false,
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    } , 
    history : [{
        quiz_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'quiz_table'
        }
    }]
} ,{timestamps : true})

const QUIZ_SCHEMA = new mongoose.Schema({
    posted_by : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users_table'
    },
    quiz_name : {
        type : String,
        required : true
    } , 
    questions : [
        {
            question : {
                type : String
            },
            options : [{option_desc : {
                type : String
            }}],
            correct_option : {
                type : Number
            }
        }
    ] , 
    users : [{
        user_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'users_table'
        }
    }]
} , {timestamps : true})

const RESULT_SCHEMA = new mongoose.Schema({
    quiz_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'quiz_table'
    } , 
    users_marks : [ {
        user_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'users_table'
        },
        marks : {
            type : Number
        }
    } ]
} , {timestamps : true})

const User = mongoose.model('users_table' , USER_SCHEMA);
const Quiz = mongoose.model('quizes_table' , QUIZ_SCHEMA);
const Result = mongoose.model('results_table' , RESULT_SCHEMA);


module.exports = {
    User,
    Quiz,
    Result,
}