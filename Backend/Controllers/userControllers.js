// Description: This file contains all the functions for the user routes
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../Models/userModels')

//Description: Register new user
//Route: Post /api/users/
//Access: Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    //Check for body for content
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill in all fields')
    }

    //Check if user already exists
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    //Check if user was created
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        }) 
    } else {
            res.status(400)
            throw new Error('Invalid user data')
    }
})

//Description: Authenticate user
//Route: POST /api/users/login
//Access: Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //Check for user and decrypt password
    const user = await User.findOne({email})
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            employeeId: user.employeeId,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }

})

//Description: Get user profile
//Route: GET /api/users/all
//Access: Private (Admin only)
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})



//Description: Update user role from admin to user
//Route: PUT /api/users/update/:id
//Access: Private (Admin only)
const updateUserRole = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    
    // Check the current user role and update it accordingly
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { role: newRole },
        { new: true }
    );
    res.status(200).json(updatedUser);
})
  
// Generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

//Export all functions
module.exports = {
    registerUser,
    loginUser,
    getUsers,
    updateUserRole
}