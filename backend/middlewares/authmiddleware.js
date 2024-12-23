const jwt = require('jsonwebtoken')
const key = require('../secret')

function authMiddleware(req, res, next) {
    const authToken = req.headers.authorization;

    try {
        if (!authToken || !authToken.startsWith('Bearer ')) {
            return res.status(401).json({})
        }

        const token = authToken.split(' ')[1];
        const verified = jwt.verify(token, key);
        if (verified) {
            req.id = verified.id;
            next()
        }
        else {
            return res.status(401).json({})
        }
    } catch (error) {
        res.status(500).json({
            message : "Something went wrong"
        })
    }
}

module.exports = authMiddleware;