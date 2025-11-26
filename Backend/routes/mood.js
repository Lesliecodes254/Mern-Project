// routes/moods.js
const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');
const auth = require('../middleware/auth');

// @route   POST /api/moods
// @desc    Create new mood entry
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { mood, journalEntry, date } = req.body;

    if (!mood || !date) {
      return res.status(400).json({ message: 'Mood and date are required' });
    }

    const newMood = new Mood({
      userId: req.user.id,
      mood,
      journalEntry: journalEntry || '',
      date: new Date(date)
    });

    await newMood.save();
    res.status(201).json(newMood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/moods
// @desc    Get all moods for logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let query = { userId: req.user.id };
    
    // Filter by date range if provided
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const moods = await Mood.find(query).sort({ date: -1 });
    res.json(moods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/moods/:id
// @desc    Get single mood entry
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id);

    if (!mood) {
      return res.status(404).json({ message: 'Mood entry not found' });
    }

    // Check if mood belongs to user
    if (mood.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(mood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/moods/:id
// @desc    Update mood entry
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { mood, journalEntry } = req.body;

    let moodEntry = await Mood.findById(req.params.id);

    if (!moodEntry) {
      return res.status(404).json({ message: 'Mood entry not found' });
    }

    // Check if mood belongs to user
    if (moodEntry.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update fields
    if (mood) moodEntry.mood = mood;
    if (journalEntry !== undefined) moodEntry.journalEntry = journalEntry;

    await moodEntry.save();
    res.json(moodEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/moods/:id
// @desc    Delete mood entry
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id);

    if (!mood) {
      return res.status(404).json({ message: 'Mood entry not found' });
    }

    // Check if mood belongs to user
    if (mood.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await mood.deleteOne();
    res.json({ message: 'Mood entry deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
