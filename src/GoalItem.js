import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

function GoalItem({ goal, updateGoal, deleteGoal }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState({ ...goal });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateGoal(editedGoal);
    setIsEditing(false);
  };

  const progressPercentage = (goal.savedAmount / goal.targetAmount) * 100;

  return (
    <li className="goal-item">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={editedGoal.name}
            onChange={(e) => setEditedGoal({...editedGoal, name: e.target.value})}
            required
          />
          <input
            type="number"
            name="targetAmount"
            value={editedGoal.targetAmount}
            onChange={(e) => setEditedGoal({...editedGoal, targetAmount: e.target.value})}
            required
          />
          <select
            name="category"
            value={editedGoal.category}
            onChange={(e) => setEditedGoal({...editedGoal, category: e.target.value})}
          >
            <option value="Travel">Travel</option>
            <option value="Emergency">Emergency</option>
            <option value="Electronics">Electronics</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Education">Education</option>
            <option value="Shopping">Shopping</option>
            <option value="Retirement">Retirement</option>
            <option value="Home">Home</option>
          </select>
          <input
            type="date"
            name="deadline"
            value={editedGoal.deadline}
            onChange={(e) => setEditedGoal({...editedGoal, deadline: e.target.value})}
            required
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div className="goal-details">
          <h3>{goal.name}</h3>
          <p>Saved: ${goal.savedAmount} of ${goal.targetAmount}</p>
          <ProgressBar percentage={progressPercentage} />
          <div className="goal-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteGoal(goal.id)}>Delete</button>
          </div>
        </div>
      )}
    </li>
  );
}

export default GoalItem;