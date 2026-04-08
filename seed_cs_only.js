import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHu90nH0kTqhcnhg9mpOeE-HKbzi-J24k",
  authDomain: "cusb-backend.firebaseapp.com",
  projectId: "cusb-backend",
  storageBucket: "cusb-backend.firebasestorage.app",
  messagingSenderId: "120273485140",
  appId: "1:120273485140:web:45edbc89940f6942021cc1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const departments = [
  {
    id: "agriculture",
    studentCount: 180,
    researchGrants: 75,
    objectives: ["Impart agricultural sciences knowledge", "Promote sustainable agriculture", "Develop farming skills", "Foster entrepreneurship in agriculture"],
    name: "Department of Agriculture",
    vision: "To become a center of excellence in agricultural education and research.",
    description: "The Department of Agriculture focuses on modern agricultural practices, agronomy, horticulture, and sustainable farming techniques.",
    established: 2014,
    programs: ["B.Sc. (Hons) Agriculture", "M.Sc. Agriculture (Agronomy)", "M.Sc. Agriculture (Horticulture)", "Ph.D. Agriculture"],
    phone: "+91-631-2223526",
    hod: "Dr. Rajesh Kumar",
    images: ["https://picsum.photos/seed/agri1/1200/600", "https://picsum.photos/seed/agri2/1200/600", "https://picsum.photos/seed/agri3/1200/600"],
    researchPapers: 120,
    shortName: "Agriculture",
    placementRate: 78,
    facilities: ["Smart Greenhouse", "Soil Testing Lab", "Plant Pathology Lab", "Entomology Lab", "Agronomy Field", "Seed Technology Lab"],
    mission: "To produce skilled agricultural professionals through quality education and research.",
    faculty: [
      { experience: "18 years", email: "rajesh.agri@cusb.ac.in", publications: 60, phone: "+91-631-2223559", name: "Dr. Rajesh Kumar", researchInterests: "Sustainable Agriculture, Crop Management, Soil Health", awards: "Young Scientist Award 2015", designation: "Professor & Head", specialization: "Agronomy", image: "https://picsum.photos/seed/facagri1/400/400", qualification: "Ph.D. (IIT Kharagpur), M.Sc. Agriculture" },
      { email: "ashok.agri@cusb.ac.in", experience: "12 years", name: "Dr. Ashok Kumar", phone: "+91-631-2223560", publications: 42, researchInterests: "Vegetable Production, Floriculture, Post-harvest Technology", awards: "", designation: "Associate Professor", image: "https://picsum.photos/seed/facagri2/400/400", qualification: "Ph.D. (PAU Ludhiana), M.Sc. Horticulture", specialization: "Horticulture" },
      { designation: "Assistant Professor", awards: "Best Paper Award 2019", specialization: "Soil Science", image: "https://picsum.photos/seed/facagri3/400/400", qualification: "Ph.D. (IARI New Delhi), M.Sc. Soil Science", name: "Dr. Vandana Devi", phone: "+91-631-2223561", publications: 28, researchInterests: "Soil Fertility, Plant Nutrition, Organic Farming", experience: "8 years", email: "vandana.agri@cusb.ac.in" }
    ],
    email: "agriculture@cusb.ac.in",
    fundedProjects: 18
  },
  {
    id: "bioinformatics",
    objectives: ["Train students in computational biology", "Promote research in genomics and proteomics", "Develop bioinformatics tools", "Bridge biology and IT industries"],
    researchGrants: 45,
    studentCount: 80,
    name: "Dept. of Bioinformatics",
    vision: "To be a leading department in computational biology and bioinformatics research.",
    description: "The Department of Bioinformatics combines biology and computer science to analyze complex biological data. Students learn computational approaches to understand biological systems, protein structures, and genetic information.",
    established: 2016,
    programs: ["M.Sc. Bioinformatics", "M.Tech. Bioinformatics", "Ph.D. Bioinformatics"],
    researchPapers: 65,
    images: ["https://picsum.photos/seed/bioinfo1/1200/600", "https://picsum.photos/seed/bioinfo2/1200/600", "https://picsum.photos/seed/bioinfo3/1200/600"],
    hod: "Dr. Alok Kumar",
    phone: "+91-631-2223501",
    placementRate: 85,
    shortName: "Bioinformatics",
    fundedProjects: 10,
    email: "bioinformatics@cusb.ac.in",
    faculty: [
      { experience: "12 years", email: "alok.bioinfo@cusb.ac.in", awards: "Young Scientist Award 2020", designation: "Associate Professor & Head", specialization: "Computational Biology", image: "https://picsum.photos/seed/facbioinfo1/400/400", qualification: "Ph.D. (IIT Delhi), M.Sc. Bioinformatics", name: "Dr. Alok Kumar", phone: "+91-631-2223501", publications: 35, researchInterests: "Genomics, Protein Structure Prediction, Drug Discovery" },
      { awards: "", designation: "Assistant Professor", specialization: "Structural Bioinformatics", image: "https://picsum.photos/seed/facbioinfo2/400/400", qualification: "Ph.D. (NIT Surathkal), M.Tech Bioinformatics", name: "Dr. Priya Ranjan", publications: 22, phone: "+91-631-2223502", researchInterests: "Molecular Modeling, Drug Design, Network Biology", email: "priya.bioinfo@cusb.ac.in", experience: "6 years" }
    ],
    mission: "To provide interdisciplinary training combining biology, computer science, and statistics.",
    facilities: ["High Performance Computing Lab", "Genome Analysis Lab", "Structural Biology Lab", "Sequence Analysis Lab", "Protein Modeling Lab"]
  },
  {
    id: "biotechnology",
    name: "Department of Biotechnology",
    vision: "To be a leader in biotechnology education and research, fostering innovation for societal benefit.",
    objectives: ["Provide quality education in modern biotechnology", "Conduct research in frontier areas", "Promote industry-academia collaboration", "Develop skilled human resources"],
    studentCount: 150,
    researchGrants: 60,
    established: 2014,
    description: "The Department of Biotechnology offers comprehensive programs in molecular biology, genetics, industrial biotechnology, and bioinformatics. Students engage in cutting-edge research in drug discovery, genetic engineering, and agricultural biotechnology.",
    researchPapers: 95,
    hod: "Dr. Priya Singh",
    phone: "+91-631-2223505",
    images: ["https://picsum.photos/seed/biotech1/1200/600", "https://picsum.photos/seed/biotech2/1200/600", "https://picsum.photos/seed/biotech3/1200/600"],
    programs: ["B.Sc. (Hons) Biotechnology", "M.Sc. Biotechnology", "M.Sc. Bioinformatics", "Ph.D. Biotechnology"],
    email: "biotechnology@cusb.ac.in",
    faculty: [
      { experience: "18 years", email: "priya.biotech@cusb.ac.in", qualification: "Ph.D. (AIIMS Delhi), M.Sc. Biotechnology", specialization: "Molecular Biology", image: "https://picsum.photos/seed/facbiotech1/400/400", designation: "Professor & Head", awards: "Shanti Swarup Bhatnagar Prize 2022", researchInterests: "Gene Therapy, Genetic Engineering, Drug Development", phone: "+91-631-2223509", publications: 65, name: "Dr. Priya Singh" },
      { email: "sanjay.biotech@cusb.ac.in", experience: "14 years", researchInterests: "Industrial Microbiology, Enzyme Technology", phone: "+91-631-2223510", publications: 48, name: "Dr. Sanjay Kumar", qualification: "Ph.D. (IIT Roorkee), M.Sc. Microbiology", specialization: "Microbiology", image: "https://picsum.photos/seed/facbiotech2/400/400", awards: "Best Researcher Award 2020", designation: "Associate Professor" },
      { designation: "Assistant Professor", awards: "", specialization: "Bioinformatics", image: "https://picsum.photos/seed/facbiotech3/400/400", qualification: "Ph.D. (IIT Delhi), M.Sc. Bioinformatics", name: "Dr. Neha Gupta", publications: 25, phone: "+91-631-2223511", researchInterests: "Computational Biology, Protein Structure, Drug Discovery", email: "neha.biotech@cusb.ac.in", experience: "6 years" }
    ],
    fundedProjects: 12,
    mission: "To provide interdisciplinary training in biotechnology and create knowledge-based solutions for healthcare, agriculture, and industry.",
    facilities: ["Molecular Biology Lab", "Cell Culture Lab", "Bioinformatics Center", "Fermentation Unit", "Genetic Engineering Lab", "Protein Analysis Lab"],
    placementRate: 85,
    shortName: "Biotechnology"
  },
  {
    id: "chemistry",
    vision: "To excel in chemical sciences education and research with focus on sustainability.",
    name: "Department of Chemistry",
    studentCount: 140,
    researchGrants: 85,
    objectives: ["Deliver comprehensive chemistry education", "Promote research in chemical sciences", "Foster innovation in sustainable chemistry", "Produce industry-ready graduates"],
    established: 2014,
    description: "The Department of Chemistry provides rigorous training in organic, inorganic, physical, and analytical chemistry.",
    hod: "Dr. Anil Kumar",
    phone: "+91-631-2223512",
    images: ["https://picsum.photos/seed/chem1/1200/600", "https://picsum.photos/seed/chem2/1200/600", "https://picsum.photos/seed/chem3/1200/600"],
    researchPapers: 150,
    programs: ["B.Sc. (Hons) Chemistry", "M.Sc. Chemistry", "M.Sc. Analytical Chemistry", "Ph.D. Chemistry"],
    mission: "To cultivate a deep understanding of chemical principles through excellent teaching.",
    facilities: ["Organic Synthesis Lab", "Spectroscopy Lab", "Analytical Lab", "Physical Chemistry Lab", "Instrumentation Center", "Computational Chemistry Lab"],
    faculty: [
      { qualification: "Ph.D. (IIT Bombay), M.Sc. Chemistry", specialization: "Organic Chemistry", image: "https://picsum.photos/seed/facchem1/400/400", designation: "Professor & Head", awards: "Herbert C. Brown Award 2021", researchInterests: "Organic Synthesis, Catalysis, Natural Products", phone: "+91-631-2223524", publications: 72, name: "Dr. Anil Kumar", email: "anil.chem@cusb.ac.in", experience: "20 years" },
      { awards: "", designation: "Associate Professor", specialization: "Physical Chemistry", image: "https://picsum.photos/seed/facchem2/400/400", qualification: "Ph.D. (IIT Kanpur), M.Sc. Chemistry", publications: 45, phone: "+91-631-2223525", name: "Dr. Suman Rani", researchInterests: "Chemical Kinetics, Electrochemistry", email: "suman.chem@cusb.ac.in", experience: "12 years" },
      { specialization: "Inorganic Chemistry", image: "https://picsum.photos/seed/facchem3/400/400", qualification: "Ph.D. (BHU Varanasi), M.Sc. Chemistry", awards: "", designation: "Assistant Professor", researchInterests: "Coordination Chemistry, Bioinorganic Chemistry", phone: "+91-631-2223526", publications: 18, name: "Dr. Rakesh Thakur", email: "rakesh.chem@cusb.ac.in", experience: "5 years" }
    ],
    email: "chemistry@cusb.ac.in",
    fundedProjects: 20,
    shortName: "Chemistry",
    placementRate: 72
  },
  {
    id: "computer-science",
    studentCount: 300,
    facilities: ["High-Performance Computing Lab", "AI/ML Lab", "Cybersecurity Lab", "Cloud Computing Lab", "Project Lab", "Software Development Lab"],
    fundedProjects: 25,
    researchPapers: 200,
    researchGrants: 120,
    objectives: ["Provide comprehensive CS education", "Promote research in AI and ML", "Develop industry-ready professionals", "Foster innovation and entrepreneurship"],
    shortName: "Computer Science",
    placementRate: 95,
    established: 2014,
    faculty: [
      { name: "Prof. Prabhat Ranjan", phone: "+91-631-2223535", qualification: "M. Tech (MNNIT Allahabad, 2004), Ph. D. (MNNIT Allahabad, 2010)", awards: "", email: "prabhatranjan@cusb.ac.in", experience: "20 years", specialization: "Big Data, Distributed System, Software Engineering", image: "https://www.cusb.ac.in/images/dept/computer_science/1.jpg", researchInterests: "Big Data, Distributed Systems, Software Engineering", designation: "Professor and Head", publications: 85 },
      { awards: "", qualification: "M. Tech and PhD from IIT Kharagpur", phone: "+91-631-2223536", email: "jainath@cusb.ac.in", experience: "10 years", name: "Dr. Jainath Yadav", designation: "Associate Professor", researchInterests: "Speech Signal Processing, Machine Learning, Watermarking", image: "https://www.cusb.ac.in/images/dept/computer_science/2.jpg", publications: 45, specialization: "Speech signal processing, machine learning, image and audio watermarking" },
      { experience: "14 years", email: "nemichandra@cusb.ac.in", awards: "", qualification: "M Tech (IT), PhD (IIT Patna)", phone: "+91-631-2223537", name: "Dr. Nemi Chandra Rathore", publications: 55, designation: "Associate Professor", researchInterests: "Privacy & Security in Online Social Networks, Network Security, Machine Learning", image: "https://www.cusb.ac.in/images/dept/computer_science/3.jpg", specialization: "Security and Privacy in Online Social Networks" },
      { email: "piyush@cusb.ac.in", experience: "8 years", awards: "", phone: "+91-631-2223538", qualification: "Ph.D. (BHU)", name: "Dr. Piyush Kumar Singh", publications: 30, designation: "Assistant Professor", researchInterests: "Image Processing, Parallel Computing, Wavelet Transform", image: "https://www.cusb.ac.in/images/dept/computer_science/4.jpg", specialization: "Image Processing, Parallel Computing, Wavelet Transform" },
      { specialization: "Theoretical Computer Science, Discrete Mathematics, Algorithms, Cryptography and Security", publications: 25, image: "https://www.cusb.ac.in/images/dept/computer_science/5.jpg", designation: "Assistant Professor", researchInterests: "Theoretical Computer Science, Cryptography, Security", name: "Dr. Mrityunjay Singh", email: "mrityunjaysingh@cusb.ac.in", experience: "4 years", phone: "+91-631-2223539", qualification: "Ph. D. (IIT Guwahati, 2020)", awards: "" },
      { image: "https://www.cusb.ac.in/images/dept/computer_science/drprakash_1.jpeg", researchInterests: "Network Security, Data Communication, Computer Networks", designation: "Assistant Professor", publications: 40, specialization: "Network Security, Data Communication and Computer Networks", qualification: "Ph. D. (B.R.A.B.U, 2015)", phone: "+91-631-2223540", awards: "", email: "prakash@cusb.ac.in", experience: "18 years", name: "Dr. Prakash Kumar" }
    ],
    vision: "To be a center of excellence in computer science education and research.",
    images: ["https://www.cusb.ac.in/images/dept/computer_science/Lab_Photo_dept1.jpg"],
    phone: "+91-631-2223516",
    hod: "Prof. Prabhat Ranjan",
    email: "computerscience@cusb.ac.in",
    name: "Department of Computer Science",
    programs: ["B.Sc. (Hons) Computer Science", "M.Sc. Computer Science", "MSc. AI", "Ph.D. Computer Science"],
    mission: "To provide state-of-the-art education in computing fundamentals and emerging technologies.",
    description: "The Department of Computer Science offers programs covering software development, artificial intelligence, data science, cybersecurity, and cloud computing."
  }
];

const syllabusData = [
  { department: "computer-science", program: "M.Sc. Computer Science", link: "https://www.cusb.ac.in/images/dept/computer_science/Syllabus/Msc_cs_syllabus.pdf", semesters: [{ sem: 1, subjects: ["Data Structures", "Algorithms", "Operating Systems", "Discrete Mathematics", "Programming Lab"] }, { sem: 2, subjects: ["Database Management", "Computer Networks", "Software Engineering", "Theory of Computation", "Web Technologies"] }, { sem: 3, subjects: ["Machine Learning", "Artificial Intelligence", "Cloud Computing", "Cyber Security", "Elective"] }, { sem: 4, subjects: ["Project/Dissertation", "Viva Voce", "Seminar"] }] }
];

const noticesData = [
  { title: "Academic Calendar AY 2025-26 for B.Sc.(Hons.) Agriculture programme", category: "Academic", date: "2025", link: "#", description: "Academic Calendar for students admitted in B.Sc.(Hons.) Agriculture programme" },
  { title: "Academic Calendar AY 2025-26 for Diploma in Pharmacy", category: "Academic", date: "2025", link: "#", description: "Academic Calendar for students of Diploma in Pharmacy" },
  { title: "Academic Calendar AY 2025-26 for PhD Students", category: "Academic", date: "2025", link: "#", description: "Academic Calendar for PhD Students admitted in AY 2025-26" },
  { title: "Academic Calendar 2025-26 (January-June) for UG & PG programmes", category: "Academic", date: "2025", link: "#", description: "Academic Calendar for Undergraduate and Postgraduate programmes" },
  { title: "Academic Calendar 2025-26 (July-December) for AY 2025-26", category: "Academic", date: "2025", link: "#", description: "Academic Calendar for students of Undergraduate and B.Lib.I.Sc programmes" },
  { title: "Notice for Submission of Backlog Forms", category: "Examination", date: "02-April-26", link: "#", description: "Backlog form for appearing in backlog course" },
  { title: "Notification regarding issuance of Character Certificate", category: "Examination", date: "26-March-26", link: "#", description: "Notification No. CUSB/Acad./9-17/2025/AE-633" },
  { title: "Clarification for submission of Monthly Student Attendance Records", category: "Examination", date: "19-March-26", link: "#", description: "Extension of last date for submission pending monthly attendance record" },
  { title: "Submission of Monthly Student Attendance Records", category: "Examination", date: "12-March-26", link: "#", description: "Format available from Email" },
  { title: "Revised list of students for Supplementary/Backlog Examination", category: "Examination", date: "13-Feb-26", link: "#", description: "Revised list of students applied for Supplementary/Backlog Examination" },
  { title: "Time-Table of Supplementary Examination", category: "Examination", date: "12-Feb-26", link: "#", description: "Time-Table of 5 year Integrated UG-PG programme / Backlog Examination" },
  { title: "List of students for Supplementary/Backlog Examination of UG Programmes", category: "Examination", date: "11-Feb-26", link: "#", description: "List of students applied for Supplementary/Backlog Examination" },
  { title: "Mandatory Course Registration on SAMARTH Portal", category: "Examination", date: "05-Feb-26", link: "#", description: "All students must register on SAMARTH Portal" },
  { title: "Semester registration for Undergraduate and Postgraduate students", category: "Examination", date: "04-Feb-26", link: "#", description: "Registration of students promoted to next semester" },
  { title: "Registration of newly enrolled Ph.D. Scholars on SAMARTH portal", category: "Examination", date: "30-Jan-26", link: "#", description: "Generation of ABC ID for new Ph.D. scholars" },
  { title: "List of provisionally eligible students for Gold Medals", category: "Examination", date: "29-Jan-26", link: "#", description: "List for Gold Medals of Year-2023 and Year-2024" },
  { title: "Issuance of Enrolment Number to Ph.D. students", category: "Examination", date: "20-Jan-26", link: "#", description: "Enrolment Number for students admitted in Ph.D. programmes" },
  { title: "Physical Document Verification of Ph.D. Scholars", category: "Examination", date: "21-Jan-26", link: "#", description: "Document verification for AY 2025-26" },
  { title: "Allotment of supervisor to Ph.D. Scholars", category: "Examination", date: "21-Jan-26", link: "#", description: "Allotment of supervisor and co-supervisor" },
  { title: "Submission of six-monthly progress reports", category: "Examination", date: "21-Jan-26", link: "#", description: "Progress reports for July-December 2025" },
  { title: "Issuance of Bonafide Certificate and Fee Structure", category: "Examination", date: "15-Jan-26", link: "#", description: "Notice regarding issuance of certificates" },
  { title: "Extension of last date for registration to repeat courses", category: "Examination", date: "15-Jan-26", link: "#", description: "Extension for Undergraduate and Postgraduate programmes" },
  { title: "Semester registration for Undergraduate (4th/6th/8th/10th) and PG (2nd/4th)", category: "Examination", date: "10-Jan-26", link: "#", description: "Semester registration for January-June 2026" },
  { title: "Semester registration for Ph.D. Scholars", category: "Examination", date: "10-Jan-26", link: "#", description: "Registration for AY 2020-21, 2022-23, 2023-24 and 2024-25" },
  { title: "Registration for repeat courses", category: "Examination", date: "09-Jan-26", link: "#", description: "Form for Repeat Courses" },
  { title: "Semester registration for PG programmes (2nd Semester under paid seat)", category: "Examination", date: "09-Jan-26", link: "#", description: "For the period of January-June 2026" },
  { title: "Supplementary Examination for Postgraduate Programmes", category: "Examination", date: "30-July-25", link: "#", description: "Supplementary Examination for PG programmes" },
  { title: "Supplementary Examination for B.Sc. Agriculture & Integrated UG-PG", category: "Examination", date: "30-July-25", link: "#", description: "Examination to be held in August-2025" },
  { title: "PM-Vidyalaxmi Schemes for Students", category: "Scholarship", date: "23-Apr-25", link: "#", description: "New schemes for student welfare" },
  { title: "Degree data of passed out students in year-2024", category: "Academic", date: "02-Jan-26", link: "#", description: "List of passed out students" }
];

const announcementsData = [
  { title: "Semester Registration for Jan-June 2026", subtitle: "Last Date: 10th January", date: "10-Jan-26", type: "high" },
  { title: "Backlog Form Submission", subtitle: "Last Date: 2nd April 2026", date: "02-April-26", type: "high" },
  { title: "SAMARTH Portal Registration Mandatory", subtitle: "All students must register", date: "05-Feb-26", type: "high" },
  { title: "Ph.D. Document Verification", subtitle: "For AY 2025-26", date: "21-Jan-26", type: "medium" },
  { title: "Ph.D. Supervisor Allotment", subtitle: "Allotment process started", date: "21-Jan-26", type: "medium" },
  { title: "PM-Vidyalaxmi Scholarship Schemes", subtitle: "Apply for student welfare", date: "23-Apr-25", type: "medium" },
  { title: "Six-Monthly Progress Reports Due", subtitle: "For July-December 2025", date: "21-Jan-26", type: "low" },
  { title: "Supplementary Exam Schedule Released", subtitle: "For PG & Agriculture programmes", date: "30-July-25", type: "high" }
];

const eventsData = [
  { title: "17th Foundation Day Celebration", subtitle: "Ceremony and Awards", date: "27 Feb 2026", image: "/images/fd27.jpeg", type: "recent" },
  { title: "Alumini Meet 2026", subtitle: "Reconnect with fellow graduates", date: "25 Feb 2026", image: "/images/ameet.jpeg", type: "recent" },
  { title: "International Conference on AI", subtitle: "AI in Sustainable Systems", date: "5 Mar 2026", image: "/images/interconf.jpg", type: "recent" },
  { title: "Startup Bootcamp", subtitle: "3-day intensive training", date: "8 Apr 2026", image: "https://picsum.photos/seed/upcoming1/600/400", type: "upcoming" },
  { title: "Research Symposium", subtitle: "Presentations from faculty", date: "18 Apr 2026", image: "https://picsum.photos/seed/upcoming2/600/400", type: "upcoming" },
  { title: "Campus Marathon", subtitle: "Health and fitness event", date: "26 Apr 2026", image: "https://picsum.photos/seed/upcoming3/600/400", type: "upcoming" },
  { title: "Annual Convocation", subtitle: "Graduation ceremony", date: "15 Apr 2026", image: "https://picsum.photos/seed/convocation/600/400", type: "upcoming" },
  { title: "Hackathon 2026", subtitle: "48-hour coding challenge", date: "5 May 2026", image: "https://picsum.photos/seed/hackathon/600/400", type: "upcoming" }
];

const statsData = { students: 4500, staff: 220, courses: 85, projects: 120, publications: 850, collaborations: 25 };

async function seedDatabase() {
  console.log("Starting database seeding...");
  try {
    const collections = ['departments', 'syllabus', 'news', 'notices', 'events', 'stats', 'announcements'];
    for (const col of collections) {
      const snapshot = await getDocs(collection(db, col));
      const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
    }
    console.log("Cleared existing data");

    for (const dept of departments) { await addDoc(collection(db, 'departments'), dept); }
    console.log(`Added ${departments.length} departments with faculty`);

    for (const syl of syllabusData) { await addDoc(collection(db, 'syllabus'), syl); }
    console.log(`Added ${syllabusData.length} syllabus records`);

    for (const ann of announcementsData) { await addDoc(collection(db, 'announcements'), ann); }
    for (const notice of noticesData) { await addDoc(collection(db, 'notices'), notice); }
    for (const event of eventsData) { await addDoc(collection(db, 'events'), event); }
    await addDoc(collection(db, 'stats'), statsData);

    console.log(`Added ${noticesData.length} notices`);
    console.log(`Added ${announcementsData.length} announcements`);
    console.log(`Added ${eventsData.length} events`);
    console.log("\n Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDatabase();
