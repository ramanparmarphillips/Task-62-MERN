const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getUsers, updateUserRole } = require('../Controllers/userControllers')

router.post('/',  registerUser) 
router.post('/login',  loginUser) 
router.get('/all', getUsers )
router.put('/update/:id', updateUserRole)

module.exports = router;