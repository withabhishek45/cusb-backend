import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

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
    
    const snapshot = await getDocs(collection(db, 'stats'));
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
      getDocs(collection(db, 'departments')),
      getDocs(collection(db, 'news')),
      getDocs(collection(db, 'announcements')),
      getDocs(collection(db, 'events')),
      getDocs(collection(db, 'notices')),
      getDocs(collection(db, 'stats'))
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

app.get('/api/leadership', async (req, res) => {
  try {
    const cached = getCached('leadership');
    if (cached) return res.json(cached);
    
    const snapshot = await getDocs(collection(db, 'leadership'));
    const leadership = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCache('leadership', leadership);
    res.json(leadership);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/leadership/:id', async (req, res) => {
  try {
    const docRef = doc(db, 'leadership', req.params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      res.json({ id: docSnap.id, ...docSnap.data() });
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/departments', async (req, res) => {
  try {
    const cached = getCached('departments');
    if (cached) return res.json(cached);
    
    const snapshot = await getDocs(collection(db, 'departments'));
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
    
    const docRef = doc(db, 'departments', req.params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = { id: docSnap.id, ...docSnap.data() };
      setCache(cacheKey, data);
      res.json(data);
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/faculty', async (req, res) => {
  try {
    const { department } = req.query;
    const cacheKey = department ? `faculty_${department}` : 'faculty_all';
    
    const cached = getCached(cacheKey);
    if (cached) return res.json(cached);
    
    let snapshot;
    if (department) {
      snapshot = await getDocs(query(collection(db, 'faculty'), where('department', '==', department)));
    } else {
      snapshot = await getDocs(collection(db, 'faculty'));
    }
    const faculty = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCache(cacheKey, faculty);
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/news', async (req, res) => {
  try {
    const cached = getCached('news');
    if (cached) return res.json(cached);
    
    const snapshot = await getDocs(collection(db, 'news'));
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
    
    const snapshot = await getDocs(collection(db, 'announcements'));
    const announcements = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCache('announcements', announcements);
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const { type } = req.query;
    const cacheKey = type ? `events_${type}` : 'events_all';
    
    const cached = getCached(cacheKey);
    if (cached) return res.json(cached);
    
    let snapshot;
    if (type) {
      snapshot = await getDocs(query(collection(db, 'events'), where('type', '==', type)));
    } else {
      snapshot = await getDocs(collection(db, 'events'));
    }
    const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCache(cacheKey, events);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/notices', async (req, res) => {
  try {
    const cached = getCached('notices');
    if (cached) return res.json(cached);
    
    const snapshot = await getDocs(collection(db, 'notices'));
    const notices = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCache('notices', notices);
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/syllabus', async (req, res) => {
  try {
    const { department, program } = req.query;
    const cacheKey = `syllabus_${department}_${program}`;
    
    const cached = getCached(cacheKey);
    if (cached) return res.json(cached);
    
    let snapshot;
    if (department && program) {
      snapshot = await getDocs(query(collection(db, 'syllabus'), where('department', '==', department), where('program', '==', program)));
    } else if (department) {
      snapshot = await getDocs(query(collection(db, 'syllabus'), where('department', '==', department)));
    } else {
      snapshot = await getDocs(collection(db, 'syllabus'));
    }
    const syllabus = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCache(cacheKey, syllabus);
    res.json(syllabus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/gallery', async (req, res) => {
  try {
    const cached = getCached('gallery');
    if (cached) return res.json(cached);
    
    const snapshot = await getDocs(collection(db, 'gallery'));
    const gallery = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCache('gallery', gallery);
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/quickLinks', async (req, res) => {
  try {
    const cached = getCached('quickLinks');
    if (cached) return res.json(cached);
    
    const snapshot = await getDocs(collection(db, 'quickLinks'));
    const links = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCache('quickLinks', links);
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/contactInfo', async (req, res) => {
  try {
    const cached = getCached('contactInfo');
    if (cached) return res.json(cached);
    
    const snapshot = await getDocs(collection(db, 'contactInfo'));
    const info = snapshot.docs[0]?.data() || null;
    setCache('contactInfo', info);
    res.json(info);
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
    await addDoc(collection(db, 'contact'), { name, email, subject, message, date: new Date().toISOString() });
    cache.clear();
    res.json({ success: true, message: 'Thank you for contacting us!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/departments', async (req, res) => {
  try {
    cache.delete('departments');
    cache.delete('all');
    const docRef = await addDoc(collection(db, 'departments'), req.body);
    res.json({ id: docRef.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/faculty', async (req, res) => {
  try {
    cache.clear();
    const docRef = await addDoc(collection(db, 'faculty'), req.body);
    res.json({ id: docRef.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/news', async (req, res) => {
  try {
    cache.delete('news');
    cache.delete('all');
    const docRef = await addDoc(collection(db, 'news'), req.body);
    res.json({ id: docRef.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/announcements', async (req, res) => {
  try {
    cache.delete('announcements');
    cache.delete('all');
    const docRef = await addDoc(collection(db, 'announcements'), req.body);
    res.json({ id: docRef.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/notices', async (req, res) => {
  try {
    cache.delete('notices');
    const docRef = await addDoc(collection(db, 'notices'), req.body);
    res.json({ id: docRef.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/departments/:id', async (req, res) => {
  try {
    cache.delete('departments');
    cache.delete(`dept_${req.params.id}`);
    cache.delete('all');
    await updateDoc(doc(db, 'departments', req.params.id), req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/departments/:id', async (req, res) => {
  try {
    cache.delete('departments');
    cache.delete(`dept_${req.params.id}`);
    cache.delete('all');
    await deleteDoc(doc(db, 'departments', req.params.id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
