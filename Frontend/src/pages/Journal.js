// src/pages/Journal.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Journal = () => {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const { token } = useContext(AuthContext);

  const moodEmojis = ['😢', '😕', '😐', '🙂', '😄'];

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/moods`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMoods(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching moods:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) {
      return;
    }

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/moods/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMoods(moods.filter(mood => mood._id !== id));
    } catch (error) {
      console.error('Error deleting mood:', error);
      alert('Failed to delete entry');
    }
  };

  const handleEdit = (mood) => {
    setEditingId(mood._id);
    setEditText(mood.journalEntry);
  };

  const handleSaveEdit = async (id) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/moods/${id}`,
        { journalEntry: editText },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      setMoods(moods.map(mood => 
        mood._id === id ? res.data : mood
      ));
      setEditingId(null);
      setEditText('');
    } catch (error) {
      console.error('Error updating mood:', error);
      alert('Failed to update entry');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mood Journal</h1>

      {moods.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow-md text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No entries yet</h3>
          <p className="text-gray-600">Start logging your moods to see them here!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {moods.map((mood) => (
            <div key={mood._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-4xl">{moodEmojis[mood.mood - 1]}</span>
                    <div>
                      <div className="text-sm text-gray-500">{formatDate(mood.date)}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(mood.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(mood)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(mood._id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {editingId === mood._id ? (
                <div>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 h-24 resize-none mb-2"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSaveEdit(mood._id)}
                      className="bg-purple-600 text-white px-4 py-1 rounded text-sm hover:bg-purple-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-300 text-gray-700 px-4 py-1 rounded text-sm hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-gray-700">
                  {mood.journalEntry || <em className="text-gray-400">No journal entry</em>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Journal;
