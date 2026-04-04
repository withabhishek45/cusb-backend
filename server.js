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

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/stats', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, 'stats'));
    const stats = snapshot.docs[0]?.data() || { students: 4100, staff: 200, courses: 50, projects: 100 };
    res.json(stats);
  } catch (error) {
    res.json({ students: 4100, staff: 200, courses: 50, projects: 100 });
  }
});

app.get('/api/leadership', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, 'leadership'));
    const leadership = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
    const snapshot = await getDocs(collection(db, 'departments'));
    const departments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/departments/:id', async (req, res) => {
  try {
    const docRef = doc(db, 'departments', req.params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      res.json({ id: docSnap.id, ...docSnap.data() });
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
    let snapshot;
    if (department) {
      snapshot = await getDocs(query(collection(db, 'faculty'), where('department', '==', department)));
    } else {
      snapshot = await getDocs(collection(db, 'faculty'));
    }
    const faculty = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/faculty/:id', async (req, res) => {
  try {
    const docRef = doc(db, 'faculty', req.params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      res.json({ id: docSnap.id, ...docSnap.data() });
    } else {
      res.status(404).json({ error: 'Faculty not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/news', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, 'news'));
    const news = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/news/:id', async (req, res) => {
  try {
    const docRef = doc(db, 'news', req.params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      res.json({ id: docSnap.id, ...docSnap.data() });
    } else {
      res.status(404).json({ error: 'News not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/announcements', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, 'announcements'));
    const announcements = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const { type } = req.query;
    let snapshot;
    if (type) {
      snapshot = await getDocs(query(collection(db, 'events'), where('type', '==', type)));
    } else {
      snapshot = await getDocs(collection(db, 'events'));
    }
    const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/notices', async (req, res) => {
  try {
    const { category } = req.query;
    let snapshot;
    if (category) {
      snapshot = await getDocs(query(collection(db, 'notices'), where('category', '==', category)));
    } else {
      snapshot = await getDocs(collection(db, 'notices'));
    }
    const notices = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/syllabus', async (req, res) => {
  try {
    const { department, program } = req.query;
    let snapshot;
    if (department && program) {
      snapshot = await getDocs(query(collection(db, 'syllabus'), where('department', '==', department), where('program', '==', program)));
    } else if (department) {
      snapshot = await getDocs(query(collection(db, 'syllabus'), where('department', '==', department)));
    } else {
      snapshot = await getDocs(collection(db, 'syllabus'));
    }
    const syllabus = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(syllabus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/gallery', async (req, res) => {
  try {
    const { category } = req.query;
    let snapshot;
    if (category) {
      snapshot = await getDocs(query(collection(db, 'gallery'), where('category', '==', category)));
    } else {
      snapshot = await getDocs(collection(db, 'gallery'));
    }
    const gallery = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/quickLinks', async (req, res) => {
  try {
    const { category } = req.query;
    let snapshot;
    if (category) {
      snapshot = await getDocs(query(collection(db, 'quickLinks'), where('category', '==', category)));
    } else {
      snapshot = await getDocs(collection(db, 'quickLinks'));
    }
    const links = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/contactInfo', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, 'contactInfo'));
    const info = snapshot.docs[0]?.data() || null;
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, 'contact'));
    const contacts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(contacts);
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
    res.json({ success: true, message: 'Thank you for contacting us!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/departments', async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, 'departments'), req.body);
    res.json({ id: docRef.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/faculty', async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, 'faculty'), req.body);
    res.json({ id: docRef.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/news', async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, 'news'), req.body);
    res.json({ id: docRef.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/announcements', async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, 'announcements'), req.body);
    res.json({ id: docRef.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/notices', async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, 'notices'), req.body);
    res.json({ id: docRef.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, 'events'), req.body);
    res.json({ id: docRef.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/syllabus', async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, 'syllabus'), req.body);
    res.json({ id: docRef.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/gallery', async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, 'gallery'), req.body);
    res.json({ id: docRef.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/departments/:id', async (req, res) => {
  try {
    await updateDoc(doc(db, 'departments', req.params.id), req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/faculty/:id', async (req, res) => {
  try {
    await updateDoc(doc(db, 'faculty', req.params.id), req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/departments/:id', async (req, res) => {
  try {
    await deleteDoc(doc(db, 'departments', req.params.id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/faculty/:id', async (req, res) => {
  try {
    await deleteDoc(doc(db, 'faculty', req.params.id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
