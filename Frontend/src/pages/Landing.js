// src/pages/Landing.js
import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-purple-600">MoodTrack</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your daily wellness companion. Track your moods, understand your patterns, 
          and build better mental wellness habits through simple daily logging.
        </p>
        
        <div className="flex justify-center space-x-4 mb-16">
          <Link 
            to="/register" 
            className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition"
          >
            Get Started Free
          </Link>
          <Link 
            to="/login" 
            className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-purple-50 transition"
          >
            Login
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Visual Analytics</h3>
            <p className="text-gray-600">
              Track your mood trends with beautiful charts and insights
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2">Daily Journaling</h3>
            <p className="text-gray-600">
              Add notes and reflections to understand what affects your mood
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-2">Private & Secure</h3>
            <p className="text-gray-600">
              Your data is encrypted and accessible only by you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
