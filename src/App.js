import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const BASE_URL = 'http://localhost:3001/goals';

function App() {
  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    savedAmount: '',
    category: '',
    deadline: '',
  });
  const [depositAmount, setDepositAmount] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((res) => setGoals(res.data))
      .catch(() => setError('Failed to fetch goals.'));
  }, []);

  // Add goal function
  const handleAddGoal = (e) => {
    e.preventDefault();
    const newGoal = {
      ...formData,
      savedAmount: Number(formData.savedAmount),
      targetAmount: Number(formData.targetAmount),
      createdAt: new Date().toISOString().split('T')[0],
    };
    axios
      .post(BASE_URL, newGoal)
      .then((res) => {
        setGoals([...goals, res.data]);
        setFormData({
          name: '',
          targetAmount: '',
          savedAmount: '',
          category: '',
          deadline: '',
        });
      })
      .catch(() => setError('Error adding goal.'));
  };

  // Deposit money to the goal
  const handleDeposit = (e) => {
    e.preventDefault();
    const goal = goals.find((g) => g.id === selectedGoal);
    const updatedGoal = {
      ...goal,
      savedAmount: goal.savedAmount + Number(depositAmount),
    };
    axios
      .put(`${BASE_URL}/${goal.id}`, updatedGoal)
      .then((res) => {
        setGoals(goals.map((g) => (g.id === goal.id ? res.data : g)));
        setDepositAmount('');
        setSelectedGoal('');
      })
      .catch(() => setError('Error making deposit.'));
  };

  // Delete goal button
  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}/${id}`)
      .then(() => {
        setGoals(goals.filter((g) => g.id !== id));
      })
      .catch(() => setError('Error deleting goal.'));
  };

  return (
    <div className="app" style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Smart Goal Planner</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Adding Goals by the user */}
      <form onSubmit={handleAddGoal} style={{ marginBottom: '30px' }}>
        <h2>Add New Goal</h2>
        <input
          name="name"
          placeholder="Goal Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="number"
          name="targetAmount"
          placeholder="Target Amount"
          value={formData.targetAmount}
          onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
          required
        />
        <input
          type="number"
          name="savedAmount"
          placeholder="Initial Saved"
          value={formData.savedAmount}
          onChange={(e) => setFormData({ ...formData, savedAmount: e.target.value })}
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        />
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          required
        />
        <button type="submit">Add Goal</button>
      </form>

      {/* Deposit */}
      <form onSubmit={handleDeposit} style={{ marginBottom: '30px' }}>
        <h2>Make a Deposit</h2>
        <select
          value={selectedGoal}
          onChange={(e) => setSelectedGoal(e.target.value)}
          required
        >
          <option value="">Select Goal</option>
          {goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Deposit Amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          required
        />
        <button type="submit">Deposit</button>
      </form>

      {/*A Form to hold the List of Goals */}
      <h2>All Goals</h2>
      {goals.map((goal) => {
        const percent = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);
        const remainingDays = Math.ceil(
          (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
        );
        return (
          <div key={goal.id} style={{ border: '1px solid #ccc', marginBottom: '15px', padding: '10px', borderRadius: '8px' }}>
            <h3>{goal.name}</h3>
            <p>Category: {goal.category}</p>
            <p>
              Saved: ${goal.savedAmount} / ${goal.targetAmount}
            </p>
            <p>Deadline: {goal.deadline}</p>
            <p>
              {remainingDays >= 0
          ? `${remainingDays} days remaining`
          : 'Deadline passed'}
            </p>

            <div style={{ background: '#eee', height: '20px', borderRadius: '5px', overflow: 'hidden', marginBottom: '10px' }}>
              <div
          style={{
            width: `${percent}%`,
            background: percent >= 100 ? '#4caf50' : '#2196f3',
            height: '100%',
            transition: 'width 0.5s',
          }}
              ></div>
            </div>

            <button
              onClick={() => handleDelete(goal.id)}
              style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
