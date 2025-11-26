// src/pages/LogMood.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const LogMood = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [journalEntry, setJournalEntry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const moods = [
    { value: 1, emoji: '😢', label: 'Very Sad' },
    { value: 2, emoji: '😕', label: 'Sad' },
    { value: 3, emoji: '😐', label: 'Okay' },
    { value: 4, emoji: '🙂', label: 'Good' },
    { value: 5, emoji: '😄', label: 'Great' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedMood) {
      setError('Please select a mood');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/moods`,
        {
          mood: selectedMood,
          journalEntry,
          date: new Date()
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError('Failed to log mood. Please try again.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto mt-20 px-4">
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg text-center">
          <div className="text-4xl mb-2">✅</div>
          <div className="text-xl font-bold">Mood logged successfully!</div>
          <div className="text-sm mt-2">Redirecting to dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-8">
          How are you feeling today?
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Mood Selection */}
          <div className="mb-8">
            <label className="block text-gray-700 text-lg font-bold mb-4 text-center">
              Select Your Mood
            </label>
            <div className="flex justify-center space-x-4">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => setSelectedMood(mood.value)}
                  className={`flex flex-col items-center p-4 rounded-lg border-2 transition ${
                    selectedMood === mood.value
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <span className="text-4xl mb-2">{mood.emoji}</span>
                  <span className="text-sm text-gray-600">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Journal Entry */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Journal Entry (Optional)
            </label>
            <textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="What's on your mind? What happened today?"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 h-32 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition disabled:opacity-50 font-medium"
          >
            {loading ? 'Logging Mood...' : 'Log Mood'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogMood;
