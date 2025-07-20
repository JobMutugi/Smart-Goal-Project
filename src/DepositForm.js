import React, { useState } from 'react';

function DepositForm({ goals, makeDeposit, onCancel }) {
  const [depositData, setDepositData] = useState({
    goalId: goals.length > 0 ? goals[0].id : '',
    amount: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    makeDeposit(depositData.goalId, depositData.amount);
    setDepositData({
      goalId: goals.length > 0 ? goals[0].id : '',
      amount: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="deposit-form">
      <h3>Make a Deposit</h3>
      <div>
        <label>Select Goal:</label>
        <select
          name="goalId"
          value={depositData.goalId}
          onChange={(e) => setDepositData({...depositData, goalId: e.target.value})}
          required
        >
          {goals.map(goal => (
            <option key={goal.id} value={goal.id}>
              {goal.name} (${goal.savedAmount} of ${goal.targetAmount})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Amount ($):</label>
        <input
          type="number"
          name="amount"
          value={depositData.amount}
          onChange={(e) => setDepositData({...depositData, amount: e.target.value})}
          min="1"
          required
        />
      </div>
      <button type="submit">Deposit</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default DepositForm;