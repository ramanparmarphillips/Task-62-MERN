import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateGoal } from '../features/goals/goalSlice';

// This component is used to edit the goal text
function EditGoal({ goal, toggleEdit }) {

  const [text, setText] = useState(goal.text);
  const dispatch = useDispatch();

  // This function is used to update the goal text
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedGoal = { ...goal, text };
    dispatch(updateGoal(updatedGoal));
    toggleEdit();
  };

  return (
    <form className='form-group' onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button className='btn' type="submit">
        Save
      </button>
    </form>
  );
}

export default EditGoal;
