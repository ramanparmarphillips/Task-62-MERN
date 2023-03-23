import React from 'react'
import {useDispatch} from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'
import {AiFillDelete} from 'react-icons/ai'

function GoalItem({goal}) {

    const dispatch = useDispatch()

  return (
    <div className='goal'>
        <div>
            {new Date(goal.createdAt).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'})}
        </div>
      <h2>{goal.text}</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'> <AiFillDelete /></button>
    </div>
  )
}

export default GoalItem
