import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, query, where } from 'firebase/firestore';

dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyAHu90nH0kTqhcnhg9mpOeE-HKbzi-J24k",
  authDomain: "cusb-backend.firebaseapp.com",
  projectId: "cusb-backend",
  storageBucket: "cusb-backend.firebasestorage.app",
  messagingSenderId: "120273485140",
  appId: "1:120273485140:web:569c9636442716e6021cc1",
  measurementId: "G-6KQ918PBW5"
};

const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.FRONTEND_ORIGIN || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // allow server-to-server / curl / health checks (no Origin header)
      if (!origin) return cb(null, true);
      if (allowedOrigins.length === 0) return cb(null, true); // fallback: allow all
      return allowedOrigins.includes(origin) ? cb(null, true) : cb(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cache = new Map();
const CACHE_TTL = 60 * 1000;

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

function handleError(res, error) {
  console.error('API Error:', error);
  res.status(500).json({ 
    error: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
}

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'Backend is running!'
  });
});

app.get('/api/clear-cache', (req, res) => {
  cache.clear();
  res.json({ success: true, message: 'Cache cleared' });
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
    handleError(res, error);
  }
});

app.get('/api/departments', async (req, res) => {
  try {
    const cached = getCached('departments');
    if (cached) return res.json(cached);
    
    const snapshot = await getDocs(collection(db, 'departments'));
    const departments = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    setCache('departments', departments);
    res.json(departments);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/api/department/:id', async (req, res) => {
  try {
    const cacheKey = `dept_${req.params.id}`;
    const cached = getCached(cacheKey);
    if (cached) return res.json(cached);
    
    const q = query(collection(db, 'departments'), where('id', '==', req.params.id));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      const data = { id: docSnap.id, ...docSnap.data() };
      setCache(cacheKey, data);
      res.json(data);
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/api/departments/:id', async (req, res) => {
  try {
    const cacheKey = `dept_${req.params.id}`;
    const cached = getCached(cacheKey);
    if (cached) return res.json(cached);
    
    const q = query(collection(db, 'departments'), where('id', '==', req.params.id));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      const data = { id: docSnap.id, ...docSnap.data() };
      setCache(cacheKey, data);
      res.json(data);
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/api/notices', async (req, res) => {
  try {
    const cached = getCached('notices');
    if (cached) return res.json(cached);
    
    const snapshot = await getDocs(collection(db, 'notices'));
    const notices = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    setCache('notices', notices);
    res.json(notices);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/api/news', async (req, res) => {
  try {
    const cached = getCached('news');
    if (cached) return res.json(cached);
    
    const snapshot = await getDocs(collection(db, 'news'));
    const news = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    setCache('news', news);
    res.json(news);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/api/announcements', async (req, res) => {
  try {
    const cached = getCached('announcements');
    if (cached) return res.json(cached);
    
    const snapshot = await getDocs(collection(db, 'announcements'));
    const announcements = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    setCache('announcements', announcements);
    res.json(announcements);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const cached = getCached('events');
    if (cached) return res.json(cached);
    
    const snapshot = await getDocs(collection(db, 'events'));
    const events = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    setCache('events', events);
    res.json(events);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/api/syllabus', async (req, res) => {
  try {
    const { department, program } = req.query;
    let q = collection(db, 'syllabus');
    
    if (department) {
      q = query(collection(db, 'syllabus'), where('department', '==', department));
    }
    
    const snapshot = await getDocs(q);
    const syllabus = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    res.json(syllabus);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/api/leadership', async (req, res) => {
  try {
    const cached = getCached('leadership');
    if (cached) return res.json(cached);
    
    const snapshot = await getDocs(collection(db, 'leadership'));
    const leadership = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    setCache('leadership', leadership);
    res.json(leadership);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/api/gallery', async (req, res) => {
  try {
    const cached = getCached('gallery');
    if (cached) return res.json(cached);
    
    const snapshot = await getDocs(collection(db, 'gallery'));
    const gallery = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    setCache('gallery', gallery);
    res.json(gallery);
  } catch (error) {
    handleError(res, error);
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
    handleError(res, error);
  }
});

app.get('/', (req, res) => {
  res.json({
    name: 'CUSB Backend API',
    version: '1.0.0',
    status: 'running',
    endpoints: [
      '/api/health',
      '/api/all',
      '/api/departments',
      '/api/notices',
      '/api/news',
      '/api/announcements',
      '/api/events',
      '/api/syllabus',
      '/api/leadership',
      '/api/gallery',
      '/api/contact'
    ]
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`CUSB Backend running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
