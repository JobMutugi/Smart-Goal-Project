import React, { useState } from 'react';
import GoalList from './GoalList';
import AddGoalForm from './AddGoalForm';
import DepositForm from './DepositForm';
import Overview from './Overview';

function Dashboard({ goals, addGoal, updateGoal, deleteGoal, makeDeposit }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDepositForm, setShowDepositForm] = useState(false);

  return (
    <div className="dashboard">
      <Overview goals={goals} />
      
      <div className="controls">
        <button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : 'Add New Goal'}
        </button>
        <button 
          onClick={() => setShowDepositForm(!showDepositForm)}
          disabled={goals.length === 0}
        >
          {showDepositForm ? 'Cancel' : 'Make Deposit'}
        </button>
      </div>

      {showAddForm && (
        <AddGoalForm 
          addGoal={addGoal} 
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {showDepositForm && (
        <DepositForm 
          goals={goals}
          makeDeposit={makeDeposit}
          onCancel={() => setShowDepositForm(false)}
        />
      )}

      <GoalList 
        goals={goals} 
        updateGoal={updateGoal} 
        deleteGoal={deleteGoal}
      />
    </div>
  );
}

export default Dashboard;