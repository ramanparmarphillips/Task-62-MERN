import React from 'react'
import {useDispatch} from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'
import {AiFillDelete} from 'react-icons/ai'
import EditGoal from './EditGoal';
import { useState } from 'react';

// This component is used to display a single goal
function GoalItem({goal}) {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false);

  // This function is used to toggle the edit state, which is used to show/hide the edit form
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className = "goal">
      <div>
        {new Date(goal.createdAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </div>
      {isEditing ? (
        <EditGoal goal = {goal} toggleEdit = {toggleEdit} />
      ) : (
        <>
          <h2>{goal.text}</h2>
          <button onClick = {() => dispatch(deleteGoal(goal._id))} className = "close">
            <AiFillDelete />
          </button>
          <button className = 'btn' onClick = {toggleEdit}>
            Edit
          </button>
        </>
      )}
    </div>
  )
}

export default GoalItem
