const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp();

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

function getCached(key) {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() - item.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return item.data;
}

function setCache(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/stats', async (req, res) => {
  try {
    const cached = getCached('stats');
    if (cached) return res.json(cached);
    const snapshot = await db.collection('stats').get();
    const stats = snapshot.docs[0]?.data() || { students: 4100, staff: 200, courses: 50, projects: 100 };
    setCache('stats', stats);
    res.json(stats);
  } catch (error) {
    res.json({ students: 4100, staff: 200, courses: 50, projects: 100 });
  }
});

app.get('/api/all', async (req, res) => {
  try {
    const cached = getCached('all');
    if (cached) return res.json(cached);
    
    const [departments, news, announcements, events, notices, stats] = await Promise.all([
      db.collection('departments').get(),
      db.collection('news').get(),
      db.collection('announcements').get(),
      db.collection('events').get(),
      db.collection('notices').get(),
      db.collection('stats').get()
    ]);

    const data = {
      departments: departments.docs.map(d => ({ id: d.id, ...d.data() })),
      news: news.docs.map(d => ({ id: d.id, ...d.data() })),
      announcements: announcements.docs.map(d => ({ id: d.id, ...d.data() })),
      events: events.docs.map(d => ({ id: d.id, ...d.data() })),
      notices: notices.docs.map(d => ({ id: d.id, ...d.data() })),
      stats: stats.docs[0]?.data() || {}
    };
    
    setCache('all', data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/departments', async (req, res) => {
  try {
    const cached = getCached('departments');
    if (cached) return res.json(cached);
    const snapshot = await db.collection('departments').get();
    const departments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCache('departments', departments);
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/departments/:id', async (req, res) => {
  try {
    const cacheKey = `dept_${req.params.id}`;
    const cached = getCached(cacheKey);
    if (cached) return res.json(cached);
    const doc = await db.collection('departments').doc(req.params.id).get();
    if (doc.exists) {
      const data = { id: doc.id, ...doc.data() };
      setCache(cacheKey, data);
      res.json(data);
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/notices', async (req, res) => {
  try {
    const cached = getCached('notices');
    if (cached) return res.json(cached);
    const snapshot = await db.collection('notices').get();
    const notices = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCache('notices', notices);
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/news', async (req, res) => {
  try {
    const cached = getCached('news');
    if (cached) return res.json(cached);
    const snapshot = await db.collection('news').get();
    const news = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCache('news', news);
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/announcements', async (req, res) => {
  try {
    const cached = getCached('announcements');
    if (cached) return res.json(cached);
    const snapshot = await db.collection('announcements').get();
    const announcements = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCache('announcements', announcements);
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const cached = getCached('events');
    if (cached) return res.json(cached);
    const snapshot = await db.collection('events').get();
    const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCache('events', events);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/syllabus', async (req, res) => {
  try {
    const { department, program } = req.query;
    let query = db.collection('syllabus');
    if (department) query = query.where('department', '==', department);
    if (program) query = query.where('program', '==', program);
    const snapshot = await query.get();
    const syllabus = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(syllabus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/leadership', async (req, res) => {
  try {
    const snapshot = await db.collection('leadership').get();
    const leadership = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(leadership);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/gallery', async (req, res) => {
  try {
    const snapshot = await db.collection('gallery').get();
    const gallery = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required' });
    }
    await db.collection('contact').add({ name, email, subject, message, date: new Date().toISOString() });
    cache.clear();
    res.json({ success: true, message: 'Thank you for contacting us!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.api = functions.https.onRequest(app);
