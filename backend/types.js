const zod = require('zod');

const signup_schema = zod.object({
    first_name : zod.string(),
    last_name : zod.string(),
    username : zod.string().email(),
    password : zod.string().min(5)
})

const signin_schema = zod.object({
    username : zod.string().email(),
    password : zod.string().min(5)
})

module.exports = {
    signup_schema , 
    signin_schema
}