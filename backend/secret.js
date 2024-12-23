const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const key = process.env.KEY;
module.exports = key