import React, { useState } from 'react';

function AddGoalForm({ addGoal, onCancel }) {
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    savedAmount: 0,
    category: 'Travel',
    deadline: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const goalWithDefaults = {
      ...newGoal,
      targetAmount: Number(newGoal.targetAmount),
      createdAt: new Date().toISOString().split('T')[0],
    };
    addGoal(goalWithDefaults);
    setNewGoal({
      name: '',
      targetAmount: '',
      savedAmount: 0,
      category: 'Travel',
      deadline: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-goal-form">
      <h3>Add New Goal</h3>
      <div>
        <label>Goal Name:</label>
        <input
          type="text"
          name="name"
          value={newGoal.name}
          onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
          required
        />
      </div>
      <div>
        <label>Target Amount ($):</label>
        <input
          type="number"
          name="targetAmount"
          value={newGoal.targetAmount}
          onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
          min="1"
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          name="category"
          value={newGoal.category}
          onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
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
      </div>
      <div>
        <label>Deadline:</label>
        <input
          type="date"
          name="deadline"
          value={newGoal.deadline}
          onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
          required
        />
      </div>
      <button type="submit">Add Goal</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default AddGoalForm;