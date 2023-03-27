// Description: User routes
const express = require('express');
const router = express.Router();

//Import controllers
const { registerUser, loginUser, getUsers, updateUserRole } = require('../Controllers/userControllers')

//Routes
//POST Register new user
router.post('/',  registerUser) 

//POST Login user
router.post('/login',  loginUser) 

//GET All users(Admin only)
router.get('/all', getUsers )

//PUT Update/Revoke admin role (Admin only)
router.put('/update/:id', updateUserRole)

module.exports = router;