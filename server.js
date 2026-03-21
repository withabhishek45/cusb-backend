import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const news = [
  { id: '1', title: 'CUSB Launches New PhD Programs in AI and Data Science', content: 'Central University of South Bihar announces new doctoral programs in Artificial Intelligence and Data Science starting from academic year 2026-27.', date: '22 Mar 2026', type: 'Announcement', image: 'https://picsum.photos/seed/news1/1200/700' },
  { id: '2', title: 'CUSB Ranked Among Top 50 Universities in NIRF 2026', content: 'Central University of South Bihar has achieved a significant rank improvement in the National Institutional Ranking Framework 2026.', date: '18 Mar 2026', type: 'Achievement', image: 'https://picsum.photos/seed/news2/1200/700' },
  { id: '3', title: 'International Conference on Sustainable Development at CUSB', content: 'CUSB hosts international conference on sustainable development with participants from 15 countries.', date: '10 Mar 2026', type: 'Event', image: 'https://picsum.photos/seed/news3/1200/700' },
  { id: '4', title: 'CUSB Students Win National Innovation Challenge 2026', content: 'Team from Central University of South Bihar wins first prize in National Innovation Challenge with their startup idea on agricultural technology.', date: '5 Mar 2026', type: 'Achievement', image: 'https://picsum.photos/seed/news4/1200/700' },
  { id: '5', title: 'New Research Center for Climate Change inaugurated at CUSB', content: 'Honorable Vice Chancellor inaugurates new research center focused on climate change and environmental sustainability.', date: '1 Mar 2026', type: 'Press Release', image: 'https://picsum.photos/seed/news5/1200/700' },
];

const announcements = [
  { id: '1', text: 'Admissions Open for 2026-27 | Apply Now', priority: 'high' },
  { id: '2', text: 'Fellowship 2026 - Applications Deadline Extended', priority: 'high' },
  { id: '3', text: 'Vigilance Awareness Week - 27th October to 2nd November, 2025', priority: 'medium' },
  { id: '4', text: 'Research Grant Opportunities Available for Faculty', priority: 'medium' },
  { id: '5', text: 'Annual Fest 2026 - Register Your Team', priority: 'low' },
  { id: '6', text: 'New Online Courses Launched | Enroll Today', priority: 'low' },
];

const recentEvents = [
  { id: 'event-1', title: '17th Foundation Day Celebration', subtitle: 'Ceremony and Awards', date: '27 Feb 2026', image: '/images/fd27.jpeg' },
  { id: 'event-2', title: 'Alumini Meet 2026', subtitle: 'Reconnect with fellow graduates', date: '25 Feb 2026', image: '/images/ameet.jpeg' },
  { id: 'event-3', title: 'International Conference on AI', subtitle: 'AI in Sustainable Systems', date: '5 Mar 2026', image: '/images/interconf.jpg' },
  { id: 'event-4', title: 'Inter-Departmental Sports Meet', subtitle: 'Inter-departmental competitions', date: '28 Feb 2026', image: '/images/sportimg.jpeg' },
  { id: 'event-5', title: 'Cultural Night 2026', subtitle: 'Celebrating diversity and talent', date: '15 Feb 2026', image: 'https://picsum.photos/seed/event5/600/400' },
  { id: 'event-6', title: 'Research Showcase', subtitle: 'Faculty and student research presentations', date: '8 Feb 2026', image: 'https://picsum.photos/seed/event6/600/400' },
];

const upcomingEvents = [
  { id: 'upcoming-1', title: 'Startup Bootcamp', subtitle: '3-day intensive training', date: '8 Apr 2026', image: 'https://picsum.photos/seed/upcoming1/600/400' },
  { id: 'upcoming-2', title: 'Research Symposium', subtitle: 'Presentations from faculty', date: '18 Apr 2026', image: 'https://picsum.photos/seed/upcoming2/600/400' },
  { id: 'upcoming-3', title: 'Campus Marathon', subtitle: 'Health & fitness event', date: '26 Apr 2026', image: 'https://picsum.photos/seed/upcoming3/600/400' },
  { id: 'upcoming-4', title: 'International Conference', subtitle: 'Global perspectives on technology', date: '5 May 2026', image: 'https://picsum.photos/seed/upcoming4/600/400' },
  { id: 'upcoming-5', title: 'Art Exhibition', subtitle: 'Student and faculty artwork display', date: '12 May 2026', image: 'https://picsum.photos/seed/upcoming5/600/400' },
  { id: 'upcoming-6', title: 'Hackathon 2026', subtitle: '48-hour coding challenge', date: '20 May 2026', image: 'https://picsum.photos/seed/upcoming6/600/400' },
];

const tenders = [
  { id: 'tender-1', title: 'Lab Equipment Procurement', subtitle: 'Open until 30 Apr 2026', date: '25 Mar 2026', image: 'https://picsum.photos/seed/tender1/600/400' },
  { id: 'tender-2', title: 'Campus Renovation Works', subtitle: 'Bid submission deadline 15 May', date: '22 Mar 2026', image: 'https://picsum.photos/seed/tender2/600/400' },
  { id: 'tender-3', title: 'IT Infrastructure Upgrade', subtitle: 'Network and server enhancements', date: '10 Apr 2026', image: 'https://picsum.photos/seed/tender3/600/400' },
  { id: 'tender-4', title: 'Library Books Acquisition', subtitle: 'Academic and reference materials', date: '5 Apr 2026', image: 'https://picsum.photos/seed/tender4/600/400' },
  { id: 'tender-5', title: 'Sports Equipment Supply', subtitle: 'Gym and field equipment', date: '1 Apr 2026', image: 'https://picsum.photos/seed/tender5/600/400' },
  { id: 'tender-6', title: 'Catering Services', subtitle: 'Campus dining and events', date: '28 Mar 2026', image: 'https://picsum.photos/seed/tender6/600/400' },
];

const recruitment = [
  { id: 'recruit-1', title: 'Assistant Professor - Computer Science', subtitle: 'Teaching and research position', date: '25 Mar 2026', image: 'https://picsum.photos/seed/recruit1/600/400' },
  { id: 'recruit-2', title: 'Lab Technician', subtitle: 'Science laboratory support', date: '20 Mar 2026', image: 'https://picsum.photos/seed/recruit2/600/400' },
  { id: 'recruit-3', title: 'Administrative Officer', subtitle: 'Office management and coordination', date: '15 Mar 2026', image: 'https://picsum.photos/seed/recruit3/600/400' },
  { id: 'recruit-4', title: 'Research Associate', subtitle: 'Research project support', date: '10 Mar 2026', image: 'https://picsum.photos/seed/recruit4/600/400' },
  { id: 'recruit-5', title: 'Librarian', subtitle: 'Library management and services', date: '5 Mar 2026', image: 'https://picsum.photos/seed/recruit5/600/400' },
  { id: 'recruit-6', title: 'Sports Coach', subtitle: 'Athletics and physical education', date: '28 Feb 2026', image: 'https://picsum.photos/seed/recruit6/600/400' },
];

const updates = [
  { id: 'update-1', title: 'New Library Hours', subtitle: 'Open 8am–10pm starting April', date: '1 Apr 2026', image: 'https://picsum.photos/seed/update1/600/400' },
  { id: 'update-2', title: 'Campus Wi-Fi Upgrade', subtitle: 'Faster speeds arriving soon', date: '15 Mar 2026', image: 'https://picsum.photos/seed/update2/600/400' },
  { id: 'update-3', title: 'Parking Policy Changes', subtitle: 'New regulations effective April 1', date: '10 Apr 2026', image: 'https://picsum.photos/seed/update3/600/400' },
  { id: 'update-4', title: 'Health Center Expansion', subtitle: 'New services available', date: '8 Apr 2026', image: 'https://picsum.photos/seed/update4/600/400' },
  { id: 'update-5', title: 'Course Registration Opens', subtitle: 'Fall semester enrollment begins', date: '5 Apr 2026', image: 'https://picsum.photos/seed/update5/600/400' },
  { id: 'update-6', title: 'New Dining Options', subtitle: 'Cafeteria menu updates', date: '1 Apr 2026', image: 'https://picsum.photos/seed/update6/600/400' },
];

const newsletters = [
  { id: 'newsletter-1', title: 'Spring 2026 Edition', subtitle: 'Research breakthroughs and student achievements', date: '1 Apr 2026', image: 'https://picsum.photos/seed/newsletter1/600/400' },
  { id: 'newsletter-2', title: 'Winter 2025 Edition', subtitle: 'Holiday events and academic highlights', date: '15 Dec 2025', image: 'https://picsum.photos/seed/newsletter2/600/400' },
  { id: 'newsletter-3', title: 'Fall 2025 Edition', subtitle: 'New faculty and campus developments', date: '1 Oct 2025', image: 'https://picsum.photos/seed/newsletter3/600/400' },
  { id: 'newsletter-4', title: 'Summer 2025 Edition', subtitle: 'Graduation ceremonies and summer programs', date: '15 Jun 2025', image: 'https://picsum.photos/seed/newsletter4/600/400' },
  { id: 'newsletter-5', title: 'Spring 2025 Edition', subtitle: 'Community outreach and partnerships', date: '1 Apr 2025', image: 'https://picsum.photos/seed/newsletter5/600/400' },
  { id: 'newsletter-6', title: 'Winter 2024 Edition', subtitle: 'Year-end review and future plans', date: '15 Dec 2024', image: 'https://picsum.photos/seed/newsletter6/600/400' },
];

const departments = [
  { id: '1', name: 'Agriculture', description: 'Modern agriculture, agronomy and sustainable farming', programs: ['B.Sc', 'M.Sc', 'PhD'] },
  { id: '2', name: 'Biotechnology', description: 'Molecular biology, genetics and industrial biotech', programs: ['B.Sc', 'M.Sc', 'PhD'] },
  { id: '3', name: 'Chemistry', description: 'Organic, inorganic and physical chemistry', programs: ['B.Sc', 'M.Sc', 'PhD'] },
  { id: '4', name: 'Commerce & Business Studies', description: 'Accounting, finance and business studies', programs: ['B.Com', 'M.Com', 'PhD'] },
  { id: '5', name: 'Computer Science', description: 'Programming, AI, data structures and software development', programs: ['B.Sc', 'M.Sc', 'PhD'] },
  { id: '6', name: 'Economics', description: 'Micro, macro and econometrics', programs: ['B.A', 'M.A', 'PhD'] },
  { id: '7', name: 'English', description: 'Literature, linguistics and communication', programs: ['B.A', 'M.A', 'PhD'] },
  { id: '8', name: 'Hindi', description: 'Hindi literature and language studies', programs: ['B.A', 'M.A', 'PhD'] },
  { id: '9', name: 'History', description: 'Ancient, medieval and modern history', programs: ['B.A', 'M.A', 'PhD'] },
  { id: '10', name: 'Law & Governance', description: 'Legal studies and governance', programs: ['B.A LL.B', 'LL.M', 'PhD'] },
  { id: '11', name: 'Mathematics', description: 'Pure and applied mathematics', programs: ['B.Sc', 'M.Sc', 'PhD'] },
  { id: '12', name: 'Physics', description: 'Theoretical and experimental physics', programs: ['B.Sc', 'M.Sc', 'PhD'] },
];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/news', (req, res) => res.json(news));
app.get('/api/news/:id', (req, res) => {
  const item = news.find(n => n.id === req.params.id);
  return item ? res.json(item) : res.status(404).json({ error: 'Not found' });
});

app.get('/api/announcements', (req, res) => res.json(announcements));

app.get('/api/events/recent', (req, res) => res.json(recentEvents));
app.get('/api/events/upcoming', (req, res) => res.json(upcomingEvents));
app.get('/api/events', (req, res) => res.json([...recentEvents, ...upcomingEvents]));

app.get('/api/tenders', (req, res) => res.json(tenders));
app.get('/api/recruitment', (req, res) => res.json(recruitment));
app.get('/api/updates', (req, res) => res.json(updates));
app.get('/api/newsletters', (req, res) => res.json(newsletters));
app.get('/api/departments', (req, res) => res.json(departments));

app.get('/api/stats', (req, res) => {
  res.json({ students: 4100, staff: 200, courses: 50, projects: 100 });
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }
  console.log('Contact form:', { name, email, subject, message });
  res.json({ success: true, message: 'Thank you for contacting us!' });
});

app.use('/uploads', express.static(uploadsDir));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
