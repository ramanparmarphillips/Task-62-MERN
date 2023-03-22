const express = require('express');
const router = express.Router();
const { getGoals, setGoals, updateGoal, deleteGoal } = require('../Controllers/goalControllers.js')


router.get('/', getGoals);

router.post('/', setGoals) 

router.put('/:id', updateGoal)

router.delete('/:id', deleteGoal) 

module.exports = router;

