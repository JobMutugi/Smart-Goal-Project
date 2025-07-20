import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await axios.get('http://localhost:3001/goals');
      setGoals(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const addGoal = async (newGoal) => {
    try {
      const response = await axios.post('http://localhost:3001/goals', newGoal);
      setGoals([...goals, response.data]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateGoal = async (updatedGoal) => {
    try {
      await axios.put(`http://localhost:3001/goals/${updatedGoal.id}`, updatedGoal);
      setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteGoal = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/goals/${id}`);
      setGoals(goals.filter(goal => goal.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const makeDeposit = async (goalId, amount) => {
    try {
      const goal = goals.find(g => g.id === goalId);
      const updatedGoal = {
        ...goal,
        savedAmount: goal.savedAmount + Number(amount)
      };
      await axios.put(`http://localhost:3001/goals/${goalId}`, updatedGoal);
      setGoals(goals.map(g => g.id === goalId ? updatedGoal : g));
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app">
      <h1>Smart Goal Planner</h1>
      <Dashboard 
        goals={goals}
        addGoal={addGoal}
        updateGoal={updateGoal}
        deleteGoal={deleteGoal}
        makeDeposit={makeDeposit}
      />
    </div>
  );
}

export default App;