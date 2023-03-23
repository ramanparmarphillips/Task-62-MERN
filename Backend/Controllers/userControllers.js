const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../Models/userModels')

//Description: Register new user
//Route: Post /api/users
//Access: Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill in all fields')
    }

    const userExist = await User.findOne({ email })


    if (userExist) {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
})

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

    const user = await User.findOne({email})
    //! ADD HERE THE ROLE OF THE USER (ADMIN, EMPLOYER ID, ETC)
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

//Description: Authenticate user
//Route: GET /api/users/login
//Access: Private
//! ADD HERE THE ROLE OF THE USER (ADMIN, EMPLOYER ID, ETC) in payload

const   getMe = asyncHandler(async (req, res) => {
    const {_id, name, email, role, employeeId } = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email,
        role,
        employeeId
    })

})


//! ADD HERE THE ROLE OF THE USER (ADMIN, EMPLOYER ID, ETC) in payload
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}



module.exports = {
    registerUser,
    loginUser,
    getMe
}