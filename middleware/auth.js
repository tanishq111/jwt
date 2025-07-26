const jwt = require('jsonwebtoken');
const User = require('../models/User');


//// middleware to verify JWT token and authenticate user

const authenticateToken = async (req, res, next) => {
     const authHeader = req.headers['authorization'];
     const token = authHeader && authHeader.split(' ')[1];   
     
        if (!token) {
            return res.status(401).json({ message: 'Access token is missing' });
        }

        try{
             // validate the token.
             const decoded = jwt.verify(token, process.env.JWT_SECRET);
             const user = await User.findUserById(decoded.userId);
             if(!user) {
                 return res.status(404).json({ message: 'User not found' });
             }
            req.user = user; 
            next();
        }catch (error) {
            return res.status(403).json({ message: 'Invalid token' });
        }
};

module.exports = authenticateToken;


//200  ok
//201 created
//202 accepted but not processed
//204 no content



//4xxx client error
//400 bad request   
//401 unauthorized
//403 forbidden
//404 not found
//408 request timeout
//429 too many requests


//5xxx server error
//500 internal server error
//501 not implemented   
//502 bad gateway
//503 service unavailable       
//504 gateway timeout