import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cusb';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

import Department from './models/Department.js';
import Notice from './models/Notice.js';
import Event from './models/Event.js';
import Announcement from './models/Announcement.js';
import News from './models/News.js';
import Syllabus from './models/Syllabus.js';
import Stats from './models/Stats.js';

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/all', async (req, res) => {
  try {
    const [departments, news, announcements, events, notices, stats] = await Promise.all([
      Department.find(),
      News.find(),
      Announcement.find(),
      Event.find(),
      Notice.find(),
      Stats.findOne()
    ]);
    res.json({ departments, news, announcements, events, notices, stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/departments', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/departments/:id', async (req, res) => {
  try {
    const department = await Department.findOne({ id: req.params.id });
    if (!department) return res.status(404).json({ error: 'Department not found' });
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/department/:id', async (req, res) => {
  try {
    const department = await Department.findOne({ id: req.params.id });
    if (!department) return res.status(404).json({ error: 'Department not found' });
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/notices', async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/news', async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/announcements', async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/syllabus', async (req, res) => {
  try {
    const { department } = req.query;
    let syllabus;
    if (department) {
      syllabus = await Syllabus.find({ department });
    } else {
      syllabus = await Syllabus.find();
    }
    res.json(syllabus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const stats = await Stats.findOne();
    res.json(stats || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
