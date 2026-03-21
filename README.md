# CUSB Backend API

Backend API for Central University of South Bihar website.

## Setup

```bash
cd backend
npm install
npm run dev
```

## API Endpoints

### News
- `GET /api/news` - Get all news
- `GET /api/news/:id` - Get single news
- `POST /api/news` - Create news (multipart/form-data)

### Announcements
- `GET /api/announcements` - Get all announcements

### Events
- `GET /api/events?type=past|upcoming` - Get events

### Notices
- `GET /api/notices` - Get all notices
- `GET /api/notices?category=academic|general` - Filter by category

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/:id` - Get single department

### Tenders
- `GET /api/tenders` - Get all tenders
- `GET /api/tenders?status=open` - Filter by status

### Recruitment
- `GET /api/recruitment` - Get all job openings
- `GET /api/recruitment?type=faculty|staff|research` - Filter by type

### Stats
- `GET /api/stats` - Get university statistics

### Contact
- `POST /api/contact` - Submit contact form
