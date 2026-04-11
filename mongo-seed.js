import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cusb')
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB error:', err));

import Department from './models/Department.js';
import Notice from './models/Notice.js';
import Event from './models/Event.js';
import Announcement from './models/Announcement.js';
import News from './models/News.js';
import Syllabus from './models/Syllabus.js';
import Stats from './models/Stats.js';

const departments = [
  {
    id: "computer-science",
    name: "Department of Computer Science",
    shortName: "Computer Science",
    description: "The Department of Computer Science offers programs covering software development, artificial intelligence, data science, cybersecurity, and cloud computing.",
    programs: ["B.Sc. (Hons) Computer Science", "M.Sc. Computer Science", "MSc. AI", "Ph.D. Computer Science"],
    established: 2014,
    hod: "Prof. Prabhat Ranjan",
    email: "computerscience@cusb.ac.in",
    phone: "+91-631-2223516",
    vision: "To be a center of excellence in computer science education and research.",
    mission: "To provide state-of-the-art education in computing fundamentals and emerging technologies.",
    objectives: ["Provide comprehensive CS education", "Promote research in AI and ML", "Develop industry-ready professionals", "Foster innovation and entrepreneurship"],
    facilities: ["High-Performance Computing Lab", "AI/ML Lab", "Cybersecurity Lab", "Cloud Computing Lab", "Project Lab", "Software Development Lab"],
    images: ["https://www.cusb.ac.in/images/dept/computer_science/Lab_Photo_dept1.jpg"],
    studentCount: 300,
    placementRate: 95,
    researchPapers: 200,
    fundedProjects: 25,
    researchGrants: 120,
    faculty: [
      { name: "Prof. Prabhat Ranjan", designation: "Professor and Head", email: "prabhatranjan@cusb.ac.in", phone: "+91-631-2223535", image: "https://www.cusb.ac.in/images/dept/computer_science/1.jpg", specialization: "Big Data, Distributed System, Software Engineering", qualification: "M. Tech (MNNIT Allahabad, 2004), Ph. D. (MNNIT Allahabad, 2010)", experience: "20 years", publications: 85, researchInterests: "Big Data, Distributed Systems, Software Engineering", awards: "" },
      { name: "Dr. Jainath Yadav", designation: "Associate Professor", email: "jainath@cusb.ac.in", phone: "+91-631-2223536", image: "https://www.cusb.ac.in/images/dept/computer_science/2.jpg", specialization: "Speech signal processing, machine learning, image and audio watermarking", qualification: "M. Tech and PhD from IIT Kharagpur", experience: "10 years", publications: 45, researchInterests: "Speech Signal Processing, Machine Learning, Watermarking", awards: "" },
      { name: "Dr. Nemi Chandra Rathore", designation: "Associate Professor", email: "nemichandra@cusb.ac.in", phone: "+91-631-2223537", image: "https://www.cusb.ac.in/images/dept/computer_science/3.jpg", specialization: "Security and Privacy in Online Social Networks", qualification: "M Tech (IT), PhD (IIT Patna)", experience: "14 years", publications: 55, researchInterests: "Privacy & Security in Online Social Networks, Network Security, Machine Learning", awards: "" },
      { name: "Dr. Piyush Kumar Singh", designation: "Assistant Professor", email: "piyush@cusb.ac.in", phone: "+91-631-2223538", image: "https://www.cusb.ac.in/images/dept/computer_science/4.jpg", specialization: "Image Processing, Parallel Computing, Wavelet Transform", qualification: "Ph.D. (BHU)", experience: "8 years", publications: 30, researchInterests: "Image Processing, Parallel Computing, Wavelet Transform", awards: "" },
      { name: "Dr. Mrityunjay Singh", designation: "Assistant Professor", email: "mrityunjaysingh@cusb.ac.in", phone: "+91-631-2223539", image: "https://www.cusb.ac.in/images/dept/computer_science/5.jpg", specialization: "Theoretical Computer Science, Discrete Mathematics, Algorithms, Cryptography and Security", qualification: "Ph. D. (IIT Guwahati, 2020)", experience: "4 years", publications: 25, researchInterests: "Theoretical Computer Science, Cryptography, Security", awards: "" },
      { name: "Dr. Prakash Kumar", designation: "Assistant Professor", email: "prakash@cusb.ac.in", phone: "+91-631-2223540", image: "https://www.cusb.ac.in/images/dept/computer_science/drprakash_1.jpeg", specialization: "Network Security, Data Communication and Computer Networks", qualification: "Ph. D. (B.R.A.B.U, 2015)", experience: "18 years", publications: 40, researchInterests: "Network Security, Data Communication, Computer Networks", awards: "" }
    ]
  },
  {
    id: "chemistry",
    name: "Department of Chemistry",
    shortName: "Chemistry",
    description: "The Department of Chemistry provides rigorous training in organic, inorganic, physical, and analytical chemistry.",
    programs: ["B.Sc. (Hons) Chemistry", "M.Sc. Chemistry", "Ph.D. Chemistry"],
    established: 2014,
    hod: "Dr. Anil Kumar",
    email: "chemistry@cusb.ac.in",
    phone: "+91-631-2223512",
    vision: "To excel in chemical sciences education and research with focus on sustainability.",
    mission: "To cultivate a deep understanding of chemical principles through excellent teaching.",
    objectives: ["Deliver comprehensive chemistry education", "Promote research in chemical sciences", "Foster innovation in sustainable chemistry"],
    facilities: ["Organic Synthesis Lab", "Spectroscopy Lab", "Analytical Lab"],
    images: ["https://picsum.photos/seed/chem1/1200/600"],
    studentCount: 140,
    placementRate: 72,
    researchPapers: 150,
    fundedProjects: 20,
    researchGrants: 85,
    faculty: [
      { name: "Dr. Anil Kumar", designation: "Professor & Head", email: "anil.chem@cusb.ac.in", phone: "+91-631-2223524", image: "https://picsum.photos/seed/facchem1/400/400", specialization: "Organic Chemistry", qualification: "Ph.D. (IIT Bombay), M.Sc. Chemistry", experience: "20 years", publications: 72, researchInterests: "Organic Synthesis, Catalysis", awards: "Herbert C. Brown Award 2021" },
      { name: "Dr. Suman Rani", designation: "Associate Professor", email: "suman.chem@cusb.ac.in", phone: "+91-631-2223525", image: "https://picsum.photos/seed/facchem2/400/400", specialization: "Physical Chemistry", qualification: "Ph.D. (IIT Kanpur), M.Sc. Chemistry", experience: "12 years", publications: 45, researchInterests: "Chemical Kinetics, Electrochemistry", awards: "" }
    ]
  },
  {
    id: "physics",
    name: "Department of Physics",
    shortName: "Physics",
    description: "The Department of Physics offers comprehensive programs in theoretical and experimental physics.",
    programs: ["B.Sc. (Hons) Physics", "M.Sc. Physics", "Ph.D. Physics"],
    established: 2014,
    hod: "Dr. Subhash Chandra",
    email: "physics@cusb.ac.in",
    phone: "+91-631-2223513",
    vision: "To be a leading department in physics education and frontier research.",
    mission: "To provide comprehensive physics education and foster research culture.",
    objectives: ["Provide quality physics education", "Promote research in frontier areas", "Develop experimental skills"],
    facilities: ["Physics Lab", "Electronics Lab", "Computational Lab"],
    images: ["https://picsum.photos/seed/phys1/1200/600"],
    studentCount: 145,
    placementRate: 72,
    researchPapers: 130,
    fundedProjects: 22,
    researchGrants: 95,
    faculty: [
      { name: "Dr. Subhash Chandra", designation: "Professor & Head", email: "subhash.phys@cusb.ac.in", phone: "+91-631-2223527", image: "https://picsum.photos/seed/facphys1/400/400", specialization: "Condensed Matter Physics", qualification: "Ph.D. (Panjab University), M.Sc. Physics", experience: "22 years", publications: 85, researchInterests: "Material Science, Nanotechnology", awards: "Shanti Swarup Bhatnagar Prize 2021" }
    ]
  },
  {
    id: "mathematics",
    name: "Dept. of Mathematics",
    shortName: "Mathematics",
    description: "The Department of Mathematics offers programs in pure and applied mathematics, statistics, and computational mathematics.",
    programs: ["B.Sc. (Hons) Mathematics", "M.Sc. Mathematics", "Ph.D. Mathematics"],
    established: 2014,
    hod: "Dr. Naveen Chandra",
    email: "mathematics@cusb.ac.in",
    phone: "+91-631-2223514",
    vision: "To be a center of excellence in mathematics education and research.",
    mission: "To develop mathematical thinking and quantitative skills among students.",
    objectives: ["Provide quality mathematics education", "Promote research in mathematics"],
    facilities: ["Computing Lab", "Mathematics Lab"],
    images: ["https://picsum.photos/seed/math1/1200/600"],
    studentCount: 125,
    placementRate: 68,
    researchPapers: 100,
    fundedProjects: 12,
    researchGrants: 50,
    faculty: [
      { name: "Dr. Naveen Chandra", designation: "Professor & Head", email: "naveen.math@cusb.ac.in", phone: "+91-631-2223530", image: "https://picsum.photos/seed/facmath1/400/400", specialization: "Applied Mathematics", qualification: "Ph.D. (IIT Delhi), M.Sc. Mathematics", experience: "18 years", publications: 60, researchInterests: "Differential Equations, Mathematical Modeling", awards: "Mathematical Society Award 2021" }
    ]
  },
  {
    id: "biotechnology",
    name: "Department of Biotechnology",
    shortName: "Biotechnology",
    description: "The Department of Biotechnology offers comprehensive programs in molecular biology, genetics, industrial biotechnology, and bioinformatics.",
    programs: ["B.Sc. (Hons) Biotechnology", "M.Sc. Biotechnology", "Ph.D. Biotechnology"],
    established: 2014,
    hod: "Dr. Priya Singh",
    email: "biotechnology@cusb.ac.in",
    phone: "+91-631-2223505",
    vision: "To be a leader in biotechnology education and research.",
    mission: "To provide interdisciplinary training in biotechnology.",
    objectives: ["Provide quality education in modern biotechnology", "Conduct research in frontier areas"],
    facilities: ["Molecular Biology Lab", "Cell Culture Lab", "Bioinformatics Center"],
    images: ["https://picsum.photos/seed/biotech1/1200/600"],
    studentCount: 150,
    placementRate: 85,
    researchPapers: 95,
    fundedProjects: 12,
    researchGrants: 60,
    faculty: [
      { name: "Dr. Priya Singh", designation: "Professor & Head", email: "priya.biotech@cusb.ac.in", phone: "+91-631-2223509", image: "https://picsum.photos/seed/facbiotech1/400/400", specialization: "Molecular Biology", qualification: "Ph.D. (AIIMS Delhi), M.Sc. Biotechnology", experience: "18 years", publications: 65, researchInterests: "Gene Therapy, Genetic Engineering", awards: "Shanti Swarup Bhatnagar Prize 2022" }
    ]
  },
  {
    id: "english",
    name: "Department of English",
    shortName: "English",
    description: "The Department of English offers programs in literature, linguistics, creative writing, and communication studies.",
    programs: ["B.A. (Hons) English", "M.A. English", "Ph.D. English"],
    established: 2014,
    hod: "Dr. Amitabh Tripathi",
    email: "english@cusb.ac.in",
    phone: "+91-631-2223519",
    vision: "To foster excellence in English language, literature, and communication.",
    mission: "To develop linguistic proficiency, critical analysis, and creative expression.",
    objectives: ["Impart comprehensive English education", "Develop communication skills"],
    facilities: ["Language Lab", "Media Room", "Theater Studio"],
    images: ["https://picsum.photos/seed/eng1/1200/600"],
    studentCount: 200,
    placementRate: 70,
    researchPapers: 75,
    fundedProjects: 6,
    researchGrants: 30,
    faculty: [
      { name: "Dr. Amitabh Tripathi", designation: "Professor & Head", email: "amitabh.eng@cusb.ac.in", phone: "+91-631-2223543", image: "https://picsum.photos/seed/faceng1/400/400", specialization: "English Literature", qualification: "Ph.D. (BHU), M.A. English", experience: "20 years", publications: 62, researchInterests: "Victorian Literature, Postcolonial Studies", awards: "Padma Shri 2023" }
    ]
  },
  {
    id: "commerce",
    name: "Department of Commerce and Business Studies",
    shortName: "Commerce",
    description: "The Department of Commerce and Business Studies offers programs in accounting, finance, taxation, and business management.",
    programs: ["B.Com. (Hons)", "M.Com.", "MBA", "Ph.D. Commerce"],
    established: 2014,
    hod: "Dr. Meena Sharma",
    email: "commerce@cusb.ac.in",
    phone: "+91-631-2223522",
    vision: "To be a premier department developing business leaders with ethical values.",
    mission: "To provide industry-relevant education through innovative pedagogy.",
    objectives: ["Impart knowledge in commerce", "Develop managerial skills"],
    facilities: ["Computer Lab", "Accounting Lab", "Incubation Center"],
    images: ["https://picsum.photos/seed/com1/1200/600"],
    studentCount: 280,
    placementRate: 90,
    researchPapers: 80,
    fundedProjects: 8,
    researchGrants: 40,
    faculty: [
      { name: "Dr. Meena Sharma", designation: "Professor & Head", email: "meena.com@cusb.ac.in", phone: "+91-631-2223550", image: "https://picsum.photos/seed/faccom1/400/400", specialization: "Finance", qualification: "Ph.D. (Delhi University), MBA Finance, CA", experience: "18 years", publications: 55, researchInterests: "Corporate Finance, Financial Markets", awards: "Best Teacher Award 2020" }
    ]
  },
  {
    id: "economics",
    name: "Department of Economic Studies and Policy",
    shortName: "Economics",
    description: "The Department of Economic Studies and Policy offers comprehensive programs in microeconomics, macroeconomics, econometrics, and development economics.",
    programs: ["B.A. (Hons) Economics", "M.A. Economics", "Ph.D. Economics"],
    established: 2014,
    hod: "Dr. Sunita Devi",
    email: "economics@cusb.ac.in",
    phone: "+91-631-2223508",
    vision: "To be a leading department in economics education and policy research.",
    mission: "To produce economists equipped with theoretical knowledge and analytical skills.",
    objectives: ["Provide quality economics education", "Conduct policy-oriented research"],
    facilities: ["Economics Lab", "Statistical Software", "Research Cell"],
    images: ["https://picsum.photos/seed/economics1/1200/600"],
    studentCount: 130,
    placementRate: 75,
    researchPapers: 90,
    fundedProjects: 15,
    researchGrants: 55,
    faculty: [
      { name: "Dr. Sunita Devi", designation: "Professor & Head", email: "sunita.econ@cusb.ac.in", phone: "+91-631-2223516", image: "https://picsum.photos/seed/facecon1/400/400", specialization: "Development Economics", qualification: "Ph.D. (JNU Delhi), M.A. Economics", experience: "18 years", publications: 55, researchInterests: "Poverty Alleviation, Rural Development", awards: "Economics Excellence Award 2020" }
    ]
  },
  {
    id: "geology",
    name: "Department of Geology",
    shortName: "Geology",
    description: "The Department of Geology offers comprehensive study of Earth sciences including mineralogy, petrology, structural geology, and environmental geology.",
    programs: ["B.Sc. (Hons) Geology", "M.Sc. Geology", "Ph.D. Geology"],
    established: 2015,
    hod: "Dr. Rajeshwar Prasad",
    email: "geology@cusb.ac.in",
    phone: "+91-631-2223502",
    vision: "To excel in earth sciences education and geological research.",
    mission: "To produce skilled geologists for industry, research, and environmental sectors.",
    objectives: ["Provide quality geology education", "Conduct geological surveys"],
    facilities: ["Mineralogy Lab", "Petrology Lab", "Geochemistry Lab", "Field Station"],
    images: ["https://picsum.photos/seed/geology1/1200/600"],
    studentCount: 75,
    placementRate: 70,
    researchPapers: 55,
    fundedProjects: 8,
    researchGrants: 40,
    faculty: [
      { name: "Dr. Rajeshwar Prasad", designation: "Associate Professor & Head", email: "rajesh.geology@cusb.ac.in", phone: "+91-631-2223503", image: "https://picsum.photos/seed/facgeo1/400/400", specialization: "Mineralogy", qualification: "Ph.D. (IIT Roorkee), M.Sc. Geology", experience: "14 years", publications: 40, researchInterests: "Mineral Exploration, Geochemistry", awards: "Best Researcher Award 2019" }
    ]
  },
  {
    id: "bioinformatics",
    name: "Dept. of Bioinformatics",
    shortName: "Bioinformatics",
    description: "The Department of Bioinformatics combines biology and computer science to analyze complex biological data.",
    programs: ["M.Sc. Bioinformatics", "M.Tech. Bioinformatics", "Ph.D. Bioinformatics"],
    established: 2016,
    hod: "Dr. Alok Kumar",
    email: "bioinformatics@cusb.ac.in",
    phone: "+91-631-2223501",
    vision: "To be a leading department in computational biology and bioinformatics research.",
    mission: "To provide interdisciplinary training combining biology, computer science, and statistics.",
    objectives: ["Train students in computational biology", "Promote research in genomics and proteomics"],
    facilities: ["High Performance Computing Lab", "Genome Analysis Lab", "Structural Biology Lab"],
    images: ["https://picsum.photos/seed/bioinfo1/1200/600"],
    studentCount: 80,
    placementRate: 85,
    researchPapers: 65,
    fundedProjects: 10,
    researchGrants: 45,
    faculty: [
      { name: "Dr. Alok Kumar", designation: "Associate Professor & Head", email: "alok.bioinfo@cusb.ac.in", phone: "+91-631-2223501", image: "https://picsum.photos/seed/facbioinfo1/400/400", specialization: "Computational Biology", qualification: "Ph.D. (IIT Delhi), M.Sc. Bioinformatics", experience: "12 years", publications: 35, researchInterests: "Genomics, Protein Structure Prediction", awards: "Young Scientist Award 2020" }
    ]
  }
];

const notices = [
  { title: "Academic Calendar AY 2025-26 for UG & PG programmes", category: "Academic", date: "2025", link: "#", description: "Academic Calendar for Undergraduate and Postgraduate programmes" },
  { title: "Notice for Submission of Backlog Forms", category: "Examination", date: "02-April-26", link: "#", description: "Backlog form for appearing in backlog course" },
  { title: "Examination Schedule for Semester End 2026", category: "Examination", date: "25 Mar 2026", link: "#", description: "Examination timetable published." },
  { title: "Fee Payment Deadline - Last Date 30th March 2026", category: "Fee", date: "24 Mar 2026", link: "#", description: "All students must pay semester fees by the deadline." },
  { title: "Hostel Allotment List Published", category: "Hostel", date: "22 Mar 2026", link: "#", description: "Hostel allotment for 2026-27 has been published." },
  { title: "Research Methodology Workshop Registration Open", category: "Workshop", date: "20 Mar 2026", link: "#", description: "5-day workshop on Research Methodology from 1st to 5th April 2026." },
  { title: "Scholarship Applications Open", category: "Scholarship", date: "15 Mar 2026", link: "#", description: "National Scholarship Portal applications are now open." },
  { title: "Convocation 2026 Date Announced", category: "Event", date: "12 Mar 2026", link: "#", description: "8th Annual Convocation will be held on 15th April 2026." }
];

const events = [
  { title: "17th Foundation Day Celebration", subtitle: "Ceremony and Awards", date: "27 Feb 2026", image: "/images/fd27.jpeg", type: "recent" },
  { title: "Alumini Meet 2026", subtitle: "Reconnect with fellow graduates", date: "25 Feb 2026", image: "/images/ameet.jpeg", type: "recent" },
  { title: "International Conference on AI", subtitle: "AI in Sustainable Systems", date: "5 Mar 2026", image: "/images/interconf.jpg", type: "recent" },
  { title: "Startup Bootcamp", subtitle: "3-day intensive training", date: "8 Apr 2026", image: "https://picsum.photos/seed/upcoming1/600/400", type: "upcoming" },
  { title: "Research Symposium", subtitle: "Presentations from faculty", date: "18 Apr 2026", image: "https://picsum.photos/seed/upcoming2/600/400", type: "upcoming" },
  { title: "Annual Convocation", subtitle: "Graduation ceremony", date: "15 Apr 2026", image: "https://picsum.photos/seed/convocation/600/400", type: "upcoming" },
  { title: "Hackathon 2026", subtitle: "48-hour coding challenge", date: "5 May 2026", image: "https://picsum.photos/seed/hackathon/600/400", type: "upcoming" }
];

const announcements = [
  { title: "Semester Registration for Jan-June 2026", subtitle: "Last Date: 10th January", date: "10-Jan-26", type: "high" },
  { title: "Backlog Form Submission", subtitle: "Last Date: 2nd April 2026", date: "02-April-26", type: "high" },
  { title: "SAMARTH Portal Registration Mandatory", subtitle: "All students must register", date: "05-Feb-26", type: "high" },
  { title: "Ph.D. Document Verification", subtitle: "For AY 2025-26", date: "21-Jan-26", type: "medium" },
  { title: "PM-Vidyalaxmi Scholarship Schemes", subtitle: "Apply for student welfare", date: "23-Apr-25", type: "medium" }
];

const news = [
  { title: "CUSB Launches New PhD Programs in AI and Data Science", content: "Central University of South Bihar announces new doctoral programs.", date: "22 Mar 2026", type: "Announcement", image: "https://picsum.photos/seed/news1/1200/700" },
  { title: "CUSB Ranked Among Top 50 Universities in NIRF 2026", content: "University achieves significant rank improvement.", date: "18 Mar 2026", type: "Achievement", image: "https://picsum.photos/seed/news2/1200/700" },
  { title: "International Conference on Sustainable Development at CUSB", content: "CUSB hosts international conference with participants from 15 countries.", date: "10 Mar 2026", type: "Event", image: "https://picsum.photos/seed/news3/1200/700" }
];

const stats = { students: 4500, staff: 220, courses: 85, projects: 120, publications: 850, collaborations: 25 };

async function seedDatabase() {
  try {
    console.log("Clearing existing data...");
    await Promise.all([
      Department.deleteMany({}),
      Notice.deleteMany({}),
      Event.deleteMany({}),
      Announcement.deleteMany({}),
      News.deleteMany({}),
      Stats.deleteMany({})
    ]);

    console.log("Inserting departments...");
    await Department.insertMany(departments);
    console.log(`Added ${departments.length} departments`);

    console.log("Inserting notices...");
    await Notice.insertMany(notices);
    console.log(`Added ${notices.length} notices`);

    console.log("Inserting events...");
    await Event.insertMany(events);
    console.log(`Added ${events.length} events`);

    console.log("Inserting announcements...");
    await Announcement.insertMany(announcements);
    console.log(`Added ${announcements.length} announcements`);

    console.log("Inserting news...");
    await News.insertMany(news);
    console.log(`Added ${news.length} news`);

    console.log("Inserting stats...");
    await Stats.create(stats);

    console.log("\n✅ Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
