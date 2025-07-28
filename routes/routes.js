const express = require('express');
const authenticateToken = require('../middleware/auth');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {getTasks,getTaskbyId, createTask,updateTask,deleteTask} = require('../Controller/taskController'); // Assuming you have a task controller for task-related operations

/// model/view/controller pattern
const router = express.Router();


const generateToken = (userId) => {
    return jwt.sign(
        { userId: userId},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION || '1h' } // Default expiration if not set
    )
}

router.post('/register', async (req, res) => {
    try{
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    //validate email format

    // vlaidate password strength

    // create user

    const user = await User.createUser({ username, email, password });

    const token = generateToken(user.id);

    return res.status(201).json({
        message: 'User created successfully',
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        },
        token: token
    });
} catch (error) {
    return res.status(400).json({ message: error.message });
    }
});


// router.post('/login', async (req, res) => {
//     try{
//     const { email, password } = req.body;
//     const user = await User.findUserByEmail(email);

//     if(!user) {
//         return res.status(404).json({ message: 'User not found' });
//     }   
//      // verify password
//      const isPasswordValid = await User.verifyPassword(password, user.password);
//      if(!isPasswordValid) {
//          return res.status(401).json({ message: 'Invalid password' });
//      }

//      const token = generateToken(user.id);
//         return res.status(200).json({
//             message: 'Login successful',
//             user: {
//                 id: user.id,
//                 username: user.username,
//                 email: user.email
//             },
//             token: token
//         });
    
//     }catch(error){
//         return res.status(400).json({ message: error.message });
//     }
// });

// router.get('/profile', authenticateToken, async (req, res) => {
//     res.json({
//         user: {
//             id: req.user.id,
//             username: req.user.username,
//             email: req.user.email
//         }
//     });
// });

router.get('/tasks', authenticateToken, getTasks);
router.get('/tasks/:id', authenticateToken, getTaskbyId);
router.post('/tasks', authenticateToken, createTask);
router.put('/tasks/:id', authenticateToken, updateTask);
router.delete('/tasks/:id', authenticateToken, deleteTask);

module.exports = router;