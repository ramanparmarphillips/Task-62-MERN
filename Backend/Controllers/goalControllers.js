// Description: This file contains the functions for the goal routes
const asyncHandler = require('express-async-handler')

const Goal = require('../Models/goalModels.js')
const User = require('../Models/userModels.js')

//Description: Get goals
//Route: GET /api/goals/
//Access: Private
const getGoals = asyncHandler( async (req, res) => {
    const goals = await Goal.find( { user: req.user._id })

    res.status(200).json(goals);
})

//Description: Get all goals
//Route: GET /api/goals/all
//Access: Private
const getAllGoals = asyncHandler( async (req, res) => {
    const goals = await Goal.find()

    res.status(200).json(goals);
})

//Description: Set goals
//Route: POST /api/goals/
//Access: Private
const setGoals = asyncHandler( async (req, res) => {
    console.log(req.body);

    //Check for body for content
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please enter a goal')
    }

    //Create new goal
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user._id
    })

    res.status(200).json(goal);

})

//Description: Update goals
//Route: PUT /api/goals/:id
//Access: Private
const updateGoal = asyncHandler( async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    
    console.log(req.body);

    if (!goal) {
        res.status(404)
        throw new Error('Goal not found')
    }

    // const user = await User.findById(req.user.id)

    //check for user
    if (!req.user) {
        res.status(404)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the user that created the goal
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized to update goal')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
        req.params.id,
        req.body, {
        new: true,
        }
    )
  
    
  res.status(200).json(updatedGoal)

})

//Description: Delete goal
//Route: DELETE /api/goals/:id
//Access: Private
const deleteGoal = asyncHandler( async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    //Check for goal
    if (!goal) {
      res.status(400)
      throw new Error('Goal not found')
    }

    //Check for user
    if (!req.user) {
        res.status(404)
        throw new Error('User not found')
    }

    //Check for admin
    if (req.user.role === 'admin') {
        await goal.deleteOne()
        return res.status(200).json({id: req.params.id});
    }

    //Make sure the logged in user matches the user that created the goal
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized to delete goal')
    }

    await goal.deleteOne()

    res.status(200).json({id: req.params.id});
})


module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal,
    getAllGoals
}
