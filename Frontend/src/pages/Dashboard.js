// src/pages/Dashboard.js
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    averageMood: 0,
    totalEntries: 0,
    currentStreak: 0
  });
  const { token } = useContext(AuthContext);

  const moodEmojis = ['😢', '😕', '😐', '🙂', '😄'];

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      // Get last 7 days of moods
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/moods?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMoods(res.data);
      calculateStats(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching moods:', error);
      setLoading(false);
    }
  };

  const calculateStats = (moodData) => {
    if (moodData.length === 0) {
      return;
    }

    const total = moodData.reduce((sum, mood) => sum + mood.mood, 0);
    const average = (total / moodData.length).toFixed(1);

    setStats({
      averageMood: average,
      totalEntries: moodData.length,
      currentStreak: moodData.length // Simplified streak calculation
    });
  };

  const prepareChartData = () => {
    return moods
      .slice()
      .reverse()
      .map(mood => ({
        date: new Date(mood.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        mood: mood.mood
      }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-500 text-sm mb-2">Average Mood</div>
          <div className="text-3xl font-bold text-purple-600">
            {moodEmojis[Math.round(stats.averageMood) - 1] || '😐'} {stats.averageMood}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-500 text-sm mb-2">Total Entries</div>
          <div className="text-3xl font-bold text-purple-600">{stats.totalEntries}</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-500 text-sm mb-2">Current Streak</div>
          <div className="text-3xl font-bold text-purple-600">{stats.currentStreak} days 🔥</div>
        </div>
      </div>

      {/* Mood Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">7-Day Mood Trend</h2>
        {moods.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={prepareChartData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="mood" stroke="#9333ea" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No mood entries yet. Start tracking your mood!
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex space-x-4">
          <Link
            to="/log-mood"
            className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition"
          >
            Log Today's Mood
          </Link>
          <Link
            to="/journal"
            className="bg-white text-purple-600 border-2 border-purple-600 px-6 py-3 rounded-md hover:bg-purple-50 transition"
          >
            View Journal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
