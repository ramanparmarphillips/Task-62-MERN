const asyncHandler = require('express-async-handler')

const Goal = require('../Models/goalModels.js')

//Description: Get goals
//Route: GET /api/goals
//Access: Private
const getGoals = asyncHandler( async (req, res) => {
    const goals = await Goal.find()

    res.status(200).json(goals);
})

//Description: Set goals
//Route: POST /api/goals
//Access: Private
const setGoals = asyncHandler( async (req, res) => {
    console.log(req.body);

    if (!req.body.text) {
        res.status(400)
        throw new Error('Please enter a goal')
    }

    const goal = await Goal.create({
        text: req.body.text
    })

    res.status(200).json(goal);

})


//Description: Update goal
//Route: PUT /api/goals/:id
//Access: Private
const updateGoal = asyncHandler( async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(404)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
        req.params.id,
        req.body, {
        new: true,
        }
    )
  
    res.status(200).json({message: `Update goal ${req.params.id}`});
})




//Description: Delete goal
//Route: DELETE /api/goals/:id
//Access: Private
const deleteGoal = asyncHandler( async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
      res.status(400)
      throw new Error('Goal not found')
    }

    await goal.deleteOne()

    res.status(200).json({id: req.params.id});
})

module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
}