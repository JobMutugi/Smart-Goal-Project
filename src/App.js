import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import './App.css';

// Mock data fallback
const mockGoals = [
  {
    id: "1",
    name: "Travel Fund - Japan",
    targetAmount: 5000,
    savedAmount: 3200,
    category: "Travel",
    deadline: "2025-12-31",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    name: "Emergency Fund",
    targetAmount: 10000,
    savedAmount: 7500,
    category: "Emergency",
    deadline: "2026-06-30",
    createdAt: "2023-05-01"
  }
];

// Configuration
const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3001' 
  : 'https://your-render-backend.onrender.com';

function App() {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/goals`);
      setGoals(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error("API Error, falling back to mock data:", err);
      setGoals(mockGoals);
      setUsingMockData(true);
      setIsLoading(false);
    }
  };

  const apiRequest = async (method, url, data) => {
    try {
      if (usingMockData) {
        return { data }; // Return mock response
      }
      return await axios({ method, url: `${API_BASE_URL}${url}`, data });
    } catch (err) {
      throw err;
    }
  };

  const addGoal = async (newGoal) => {
    try {
      const response = await apiRequest('post', '/goals', newGoal);
      setGoals([...goals, response?.data || { ...newGoal, id: Date.now().toString() }]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateGoal = async (updatedGoal) => {
    try {
      await apiRequest('put', `/goals/${updatedGoal.id}`, updatedGoal);
      setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteGoal = async (id) => {
    try {
      await apiRequest('delete', `/goals/${id}`);
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
      await apiRequest('put', `/goals/${goalId}`, updatedGoal);
      setGoals(goals.map(g => g.id === goalId ? updatedGoal : g));
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app">
      <h1>Smart Goal Planner</h1>
      {usingMockData && (
        <div className="mock-warning">
          Note: Using mock data. Changes won't persist.
        </div>
      )}
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