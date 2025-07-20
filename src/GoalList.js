import React from 'react';
import GoalItem from './GoalItem';

function GoalList({ goals, updateGoal, deleteGoal }) {
  return (
    <div className="goal-list">
      <h2>Your Savings Goals</h2>
      {goals.length === 0 ? (
        <p>No goals yet. Add your first goal!</p>
      ) : (
        <ul>
          {goals.map(goal => (
            <GoalItem 
              key={goal.id}
              goal={goal}
              updateGoal={updateGoal}
              deleteGoal={deleteGoal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default GoalList;