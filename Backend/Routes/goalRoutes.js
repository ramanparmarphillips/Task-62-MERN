const express = require('express');
const router = express.Router();
const { getGoals, setGoals, updateGoal, deleteGoal, getAllGoals } = require('../Controllers/goalControllers.js')

const { protect } = require('../Middleware/authMiddleware.js')

router.get('/', protect, getGoals);

router.get('/all', getAllGoals);

router.post('/', protect, setGoals) 

router.put('/:id', protect, updateGoal)

router.delete('/:id', protect, deleteGoal) 



module.exports = router;


