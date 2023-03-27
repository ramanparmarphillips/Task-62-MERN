// Description: This file contains the routes for the goals
const express = require('express');
const router = express.Router();

//Import controllers
const { getGoals, setGoals, updateGoal, deleteGoal, getAllGoals } = require('../Controllers/goalControllers.js')

//Import middleware for authentication
const { protect } = require('../Middleware/authMiddleware.js')

//Routes
//GET goals for user
router.get('/', protect, getGoals);

//GET all goals form all users(Admin only)
router.get('/all', getAllGoals);

//POST new goals 
router.post('/', protect, setGoals) 

//PUT update/edit goals
router.put('/:id', protect, updateGoal)

//DELETE goals
router.delete('/:id', protect, deleteGoal) 

module.exports = router;