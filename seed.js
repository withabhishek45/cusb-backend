import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

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
    name: "Department of Agriculture",
    shortName: "Agriculture",
    description: "The Department of Agriculture focuses on modern agricultural practices, agronomy, horticulture, and sustainable farming techniques. Students gain hands-on experience in crop management, soil science, and agricultural technology. The department is committed to addressing food security challenges through innovative research and extension activities.",
    programs: ["B.Sc. (Hons) Agriculture", "M.Sc. Agriculture (Agronomy)", "M.Sc. Agriculture (Horticulture)", "Ph.D. Agriculture"],
    established: 2014,
    hod: "Dr. Rajesh Kumar",
    hodImage: "https://picsum.photos/seed/hodagri/400/400",
    email: "agriculture@cusb.ac.in",
    phone: "+91-612-2223456",
    vision: "To become a center of excellence in agricultural education and research, contributing to sustainable farming practices and food security.",
    mission: "To produce skilled agricultural professionals through quality education, research, and extension activities that address contemporary challenges in agriculture.",
    objectives: [
      "Impart comprehensive knowledge in agricultural sciences",
      "Promote research in sustainable agriculture",
      "Develop skills in modern farming techniques",
      "Foster entrepreneurship in agriculture sector"
    ],
    facilities: ["Smart Greenhouse", "Soil Testing Lab", "Plant Pathology Lab", "Entomology Lab", "Agronomy Field", "Seed Technology Lab", "Agricultural Economics Lab"],
    images: [
      "https://picsum.photos/seed/agri1/1200/600",
      "https://picsum.photos/seed/agri2/1200/600",
      "https://picsum.photos/seed/agri3/1200/600"
    ],
    studentCount: 180,
    placementRate: 78,
    researchPapers: 120,
    fundedProjects: 18,
    researchGrants: 75,
    infrastructure: "The department houses state-of-the-art laboratories for soil analysis, plant pathology, and biotechnology research. Our smart greenhouse enables year-round research on crop varieties."
  },
  {
    id: "biotechnology",
    name: "Department of Biotechnology",
    shortName: "Biotechnology",
    description: "The Department of Biotechnology offers comprehensive programs in molecular biology, genetics, industrial biotechnology, and bioinformatics. Students engage in cutting-edge research in drug discovery, genetic engineering, and agricultural biotechnology.",
    programs: ["B.Sc. (Hons) Biotechnology", "M.Sc. Biotechnology", "M.Sc. Bioinformatics", "Ph.D. Biotechnology"],
    established: 2014,
    hod: "Dr. Priya Singh",
    hodImage: "https://picsum.photos/seed/hodbiotech/400/400",
    email: "biotechnology@cusb.ac.in",
    phone: "+91-612-2223457",
    vision: "To be a leader in biotechnology education and research, fostering innovation for societal benefit.",
    mission: "To provide interdisciplinary training in biotechnology and create knowledge-based solutions for healthcare, agriculture, and industry.",
    objectives: [
      "Provide quality education in modern biotechnology",
      "Conduct research in frontier areas of biotechnology",
      "Promote industry-academia collaboration",
      "Develop skilled human resources for biotech sector"
    ],
    facilities: ["Molecular Biology Lab", "Cell Culture Lab", "Bioinformatics Center", "Fermentation Unit", "Genetic Engineering Lab", "Protein Analysis Lab", "Microbiology Lab"],
    images: [
      "https://picsum.photos/seed/biotech1/1200/600",
      "https://picsum.photos/seed/biotech2/1200/600",
      "https://picsum.photos/seed/biotech3/1200/600"
    ],
    studentCount: 150,
    placementRate: 85,
    researchPapers: 95,
    fundedProjects: 12,
    researchGrants: 60,
    infrastructure: "The department features advanced molecular biology laboratories, bioinformatics infrastructure, and BSL-2 certified facilities for genetic engineering research."
  },
  {
    id: "chemistry",
    name: "Department of Chemistry",
    shortName: "Chemistry",
    description: "The Department of Chemistry provides rigorous training in organic, inorganic, physical, and analytical chemistry. Our research addresses challenges in drug synthesis, materials science, and environmental chemistry.",
    programs: ["B.Sc. (Hons) Chemistry", "M.Sc. Chemistry", "M.Sc. Analytical Chemistry", "Ph.D. Chemistry"],
    established: 2014,
    hod: "Dr. Anil Kumar",
    hodImage: "https://picsum.photos/seed/hodchem/400/400",
    email: "chemistry@cusb.ac.in",
    phone: "+91-612-2223458",
    vision: "To excel in chemical sciences education and research with focus on sustainability and innovation.",
    mission: "To cultivate a deep understanding of chemical principles and their applications through excellent teaching and transformative research.",
    objectives: [
      "Deliver comprehensive chemistry education",
      "Promote research in chemical sciences",
      "Foster innovation in sustainable chemistry",
      "Produce industry-ready chemistry graduates"
    ],
    facilities: ["Organic Synthesis Lab", "Spectroscopy Lab", "Analytical Lab", "Physical Chemistry Lab", "Instrumentation Center", "Computational Chemistry Lab", "Inorganic Chemistry Lab"],
    images: [
      "https://picsum.photos/seed/chem1/1200/600",
      "https://picsum.photos/seed/chem2/1200/600",
      "https://picsum.photos/seed/chem3/1200/600"
    ],
    studentCount: 140,
    placementRate: 72,
    researchPapers: 150,
    fundedProjects: 20,
    researchGrants: 85,
    infrastructure: "Equipped with advanced spectroscopic instruments including NMR, UV-Vis, FTIR, and HPLC for comprehensive chemical analysis and research."
  },
  {
    id: "commerce",
    name: "Department of Commerce & Business Studies",
    shortName: "Commerce",
    description: "The Department of Commerce & Business Studies offers programs in accounting, finance, taxation, and business management. Our curriculum prepares students for careers in corporate finance, banking, and entrepreneurship.",
    programs: ["B.Com. (Hons)", "M.Com.", "MBA", "M.Com. (Finance)", "Ph.D. Commerce"],
    established: 2014,
    hod: "Dr. Meena Sharma",
    hodImage: "https://picsum.photos/seed/hodcommerce/400/400",
    email: "commerce@cusb.ac.in",
    phone: "+91-612-2223459",
    vision: "To be a premier department developing business leaders with ethical values and global perspective.",
    mission: "To provide industry-relevant education through innovative pedagogy and foster entrepreneurial mindset among students.",
    objectives: [
      "Impart knowledge in commerce and business studies",
      "Develop managerial and entrepreneurial skills",
      "Promote research in commerce and management",
      "Bridge academia and industry through collaborations"
    ],
    facilities: ["Computer Lab", "Accounting Lab", "Library", "Seminar Hall", "Placement Cell", "Incubation Center", "Auditing Room"],
    images: [
      "https://picsum.photos/seed/com1/1200/600",
      "https://picsum.photos/seed/com2/1200/600",
      "https://picsum.photos/seed/com3/1200/600"
    ],
    studentCount: 250,
    placementRate: 90,
    researchPapers: 80,
    fundedProjects: 8,
    researchGrants: 40,
    infrastructure: "Modern computer labs with financial software, a dedicated incubation center for startups, and industry-standard accounting software for practical training."
  },
  {
    id: "computer-science",
    name: "Department of Computer Science",
    shortName: "Computer Science",
    description: "The Department of Computer Science offers programs covering software development, artificial intelligence, data science, cybersecurity, and cloud computing. Students gain practical experience through projects and industry collaborations.",
    programs: ["B.Sc. (Hons) Computer Science", "M.Sc. Computer Science", "MCA", "M.Tech. Computer Science", "Ph.D. Computer Science"],
    established: 2014,
    hod: "Dr. Vikram Singh",
    hodImage: "https://picsum.photos/seed/hodcs/400/400",
    email: "computerscience@cusb.ac.in",
    phone: "+91-612-2223460",
    vision: "To be a center of excellence in computer science education and research, producing globally competent professionals.",
    mission: "To provide state-of-the-art education in computing fundamentals, emerging technologies, and research to solve real-world problems.",
    objectives: [
      "Provide comprehensive computer science education",
      "Promote research in AI, ML, and emerging technologies",
      "Develop industry-ready software professionals",
      "Foster innovation and entrepreneurship in technology"
    ],
    facilities: ["High-Performance Computing Lab", "AI/ML Lab", "Cybersecurity Lab", "Cloud Computing Lab", "Project Lab", "Software Development Lab", "Data Science Lab"],
    images: [
      "https://picsum.photos/seed/cs1/1200/600",
      "https://picsum.photos/seed/cs2/1200/600",
      "https://picsum.photos/seed/cs3/1200/600"
    ],
    studentCount: 300,
    placementRate: 95,
    researchPapers: 200,
    fundedProjects: 25,
    researchGrants: 120,
    infrastructure: "High-performance computing cluster, dedicated GPU servers for AI/ML, cybersecurity labs, and cloud computing infrastructure with AWS and Azure partnerships."
  },
  {
    id: "economics",
    name: "Department of Economics",
    shortName: "Economics",
    description: "The Department of Economics offers comprehensive programs in microeconomics, macroeconomics, econometrics, and development economics. Our research focuses on Indian economic policy and global economic issues.",
    programs: ["B.A. (Hons) Economics", "M.A. Economics", "M.A. Development Economics", "Ph.D. Economics"],
    established: 2014,
    hod: "Dr. Sunita Devi",
    hodImage: "https://picsum.photos/seed/hodecon/400/400",
    email: "economics@cusb.ac.in",
    phone: "+91-612-2223461",
    vision: "To be a leading department in economics education and policy research.",
    mission: "To produce economists equipped with theoretical knowledge and analytical skills to address economic challenges.",
    objectives: [
      "Provide quality economics education",
      "Conduct policy-oriented research",
      "Develop quantitative and analytical skills",
      "Promote understanding of economic development"
    ],
    facilities: ["Economics Lab", "Statistical Software", "Research Cell", "Seminar Library", "Computer Lab", "Data Analysis Center", "Economic Observatory"],
    images: [
      "https://picsum.photos/seed/econ1/1200/600",
      "https://picsum.photos/seed/econ2/1200/600",
      "https://picsum.photos/seed/econ3/1200/600"
    ],
    studentCount: 120,
    placementRate: 75,
    researchPapers: 90,
    fundedProjects: 15,
    researchGrants: 55,
    infrastructure: "Economics research lab with statistical software including STATA, SPSS, and EViews for data analysis and econometric modeling."
  },
  {
    id: "english",
    name: "Department of English",
    shortName: "English",
    description: "The Department of English offers programs in literature, linguistics, creative writing, and communication studies. Students develop critical thinking and communication skills essential for various career paths.",
    programs: ["B.A. (Hons) English", "M.A. English", "M.A. Linguistics", "Ph.D. English"],
    established: 2014,
    hod: "Dr. Amitabh Tripathi",
    hodImage: "https://picsum.photos/seed/hodeng/400/400",
    email: "english@cusb.ac.in",
    phone: "+91-612-2223462",
    vision: "To foster excellence in English language, literature, and communication.",
    mission: "To develop linguistic proficiency, critical analysis, and creative expression among students.",
    objectives: [
      "Impart comprehensive English language education",
      "Develop communication and soft skills",
      "Promote research in literature and linguistics",
      "Foster creative writing and critical thinking"
    ],
    facilities: ["Language Lab", "Media Room", "Theater Studio", "Reading Room", "E-Library", "Audio-Visual Lab", "Creative Writing Center"],
    images: [
      "https://picsum.photos/seed/eng1/1200/600",
      "https://picsum.photos/seed/eng2/1200/600",
      "https://picsum.photos/seed/eng3/1200/600"
    ],
    studentCount: 160,
    placementRate: 70,
    researchPapers: 75,
    fundedProjects: 6,
    researchGrants: 30,
    infrastructure: "State-of-the-art language laboratory with digital resources, theater studio for dramatics, and media room for broadcasting practice."
  },
  {
    id: "hindi",
    name: "Department of Hindi",
    shortName: "Hindi",
    description: "The Department of Hindi focuses on Hindi literature, linguistics, translation studies, and creative writing. The department preserves and promotes Hindi language and literature through teaching and research.",
    programs: ["B.A. (Hons) Hindi", "M.A. Hindi", "M.A. Hindi Linguistics", "Ph.D. Hindi"],
    established: 2014,
    hod: "Dr. Geeta Prasad",
    hodImage: "https://picsum.photos/seed/hodhindi/400/400",
    email: "hindi@cusb.ac.in",
    phone: "+91-612-2223463",
    vision: "To be a center for excellence in Hindi language, literature, and cultural studies.",
    mission: "To promote Hindi language skills and literary appreciation while connecting with contemporary issues.",
    objectives: [
      "Promote Hindi language and literature education",
      "Conduct research in Hindi literature and linguistics",
      "Develop translation and creative writing skills",
      "Preserve and promote Hindi cultural heritage"
    ],
    facilities: ["Language Lab", "Media Center", "Translation Lab", "Archive Room", "Seminar Hall", "Digital Library", "Literary Museum"],
    images: [
      "https://picsum.photos/seed/hin1/1200/600",
      "https://picsum.photos/seed/hin2/1200/600",
      "https://picsum.photos/seed/hin3/1200/600"
    ],
    studentCount: 130,
    placementRate: 65,
    researchPapers: 60,
    fundedProjects: 5,
    researchGrants: 25,
    infrastructure: "Digital language lab, translation studio, and archive room housing rare Hindi manuscripts and literary works."
  },
  {
    id: "history",
    name: "Department of History",
    shortName: "History",
    description: "The Department of History offers programs covering ancient, medieval, and modern Indian history, as well as world history. Students explore historical narratives and develop research skills.",
    programs: ["B.A. (Hons) History", "M.A. History", "M.A. Ancient History", "M.A. Medieval History", "Ph.D. History"],
    established: 2014,
    hod: "Dr. Rameshwar Prasad",
    hodImage: "https://picsum.photos/seed/hodhist/400/400",
    email: "history@cusb.ac.in",
    phone: "+91-612-2223464",
    vision: "To be a leading department in historical research and education.",
    mission: "To develop historical understanding and research capabilities among students.",
    objectives: [
      "Provide comprehensive history education",
      "Promote research in Indian and world history",
      "Develop historiographical skills",
      "Foster understanding of cultural heritage"
    ],
    facilities: ["History Museum", "Archive Center", "Research Lab", "Seminar Room", "Document Room", "Archaeological Lab", "Digital Archives"],
    images: [
      "https://picsum.photos/seed/hist1/1200/600",
      "https://picsum.photos/seed/hist2/1200/600",
      "https://picsum.photos/seed/hist3/1200/600"
    ],
    studentCount: 110,
    placementRate: 60,
    researchPapers: 85,
    fundedProjects: 10,
    researchGrants: 45,
    infrastructure: "History museum with artifacts, archaeological laboratory, and digital archive for historical documents and manuscripts."
  },
  {
    id: "law",
    name: "Department of Law & Governance",
    shortName: "Law",
    description: "The Department of Law offers comprehensive legal education covering constitutional law, criminal law, corporate law, and international law. Students receive practical training through moot courts and legal aid clinics.",
    programs: ["B.A. LL.B (Hons)", "LL.M.", "LL.M. (Constitutional Law)", "Ph.D. Law"],
    established: 2014,
    hod: "Dr. Justice Raghunath Singh",
    hodImage: "https://picsum.photos/seed/hodlaw/400/400",
    email: "law@cusb.ac.in",
    phone: "+91-612-2223465",
    vision: "To produce legal professionals with ethical values and social responsibility.",
    mission: "To provide quality legal education that combines theoretical knowledge with practical skills.",
    objectives: [
      "Impart comprehensive legal education",
      "Develop practical litigation and research skills",
      "Promote access to justice through legal aid",
      "Prepare students for judicial and bar examinations"
    ],
    facilities: ["Moot Court Hall", "Legal Aid Clinic", "Library", "Computer Lab", "Seminar Room", "Drafting Lab", "Alternative Dispute Resolution Center"],
    images: [
      "https://picsum.photos/seed/law1/1200/600",
      "https://picsum.photos/seed/law2/1200/600",
      "https://picsum.photos/seed/law3/1200/600"
    ],
    studentCount: 140,
    placementRate: 82,
    researchPapers: 70,
    fundedProjects: 8,
    researchGrants: 35,
    infrastructure: "Fully equipped moot court hall, legal aid clinic serving community, and alternative dispute resolution center for practical training."
  },
  {
    id: "mathematics",
    name: "Department of Mathematics",
    shortName: "Mathematics",
    description: "The Department of Mathematics offers programs in pure and applied mathematics, statistics, and computational mathematics. The department fosters analytical thinking and problem-solving skills.",
    programs: ["B.Sc. (Hons) Mathematics", "M.Sc. Mathematics", "M.Sc. Statistics", "M.A. Mathematics", "Ph.D. Mathematics"],
    established: 2014,
    hod: "Dr. Naveen Chandra",
    hodImage: "https://picsum.photos/seed/hodmath/400/400",
    email: "mathematics@cusb.ac.in",
    phone: "+91-612-2223466",
    vision: "To be a center of excellence in mathematics education and research.",
    mission: "To develop mathematical thinking and quantitative skills among students.",
    objectives: [
      "Provide quality mathematics education",
      "Promote research in pure and applied mathematics",
      "Develop problem-solving and analytical skills",
      "Prepare students for competitive examinations"
    ],
    facilities: ["Computing Lab", "Mathematics Lab", "Research Room", "Seminar Hall", "Library", "Statistics Lab", "Modeling Lab"],
    images: [
      "https://picsum.photos/seed/math1/1200/600",
      "https://picsum.photos/seed/math2/1200/600",
      "https://picsum.photos/seed/math3/1200/600"
    ],
    studentCount: 125,
    placementRate: 68,
    researchPapers: 100,
    fundedProjects: 12,
    researchGrants: 50,
    infrastructure: "Computer lab with mathematical software including MATLAB, Mathematica, and statistical packages for research and teaching."
  },
  {
    id: "physics",
    name: "Department of Physics",
    shortName: "Physics",
    description: "The Department of Physics offers comprehensive programs in theoretical and experimental physics. Students engage in research in condensed matter physics, particle physics, and astrophysics.",
    programs: ["B.Sc. (Hons) Physics", "M.Sc. Physics", "M.Sc. Electronics", "M.Tech. Materials Science", "Ph.D. Physics"],
    established: 2014,
    hod: "Dr. Subhash Chandra",
    hodImage: "https://picsum.photos/seed/hodphys/400/400",
    email: "physics@cusb.ac.in",
    phone: "+91-612-2223467",
    vision: "To be a leading department in physics education and frontier research.",
    mission: "To provide comprehensive physics education and foster research culture.",
    objectives: [
      "Provide quality physics education",
      "Promote research in frontier areas of physics",
      "Develop experimental and theoretical skills",
      "Prepare students for scientific careers"
    ],
    facilities: ["Physics Lab", "Electronics Lab", "Dark Room", "Computational Lab", "Telescope", "Material Science Lab", "Optics Lab"],
    images: [
      "https://picsum.photos/seed/phys1/1200/600",
      "https://picsum.photos/seed/phys2/1200/600",
      "https://picsum.photos/seed/phys3/1200/600"
    ],
    studentCount: 145,
    placementRate: 72,
    researchPapers: 130,
    fundedProjects: 22,
    researchGrants: 95,
    infrastructure: "Well-equipped physics laboratories, astronomical observatory with telescope, and computational facilities for theoretical research."
  }
];

const facultyData = [
  { name: "Dr. Rajesh Kumar", designation: "Professor & Head", department: "agriculture", email: "rajesh.agri@cusb.ac.in", image: "https://picsum.photos/seed/faculty1/300/300", specialization: "Agronomy, Crop Science", education: "Ph.D. from IIT Kharagpur", publications: 45, experience: "18 years" },
  { name: "Dr. Ashok Kumar", designation: "Associate Professor", department: "agriculture", email: "ashok.agri@cusb.ac.in", image: "https://picsum.photos/seed/facultyag2/300/300", specialization: "Horticulture, Vegetable Science", education: "Ph.D. from PAU Ludhiana", publications: 32, experience: "12 years" },
  { name: "Dr. Vandana Devi", designation: "Assistant Professor", department: "agriculture", email: "vandana.agri@cusb.ac.in", image: "https://picsum.photos/seed/facultyag3/300/300", specialization: "Soil Science, Plant Nutrition", education: "Ph.D. from IARI New Delhi", publications: 28, experience: "8 years" },
  { name: "Dr. Priya Singh", designation: "Professor & Head", department: "biotechnology", email: "priya.biotech@cusb.ac.in", image: "https://picsum.photos/seed/faculty2/300/300", specialization: "Molecular Biology, Genetics", education: "Ph.D. from AIIMS Delhi", publications: 38, experience: "15 years" },
  { name: "Dr. Sanjay Kumar", designation: "Associate Professor", department: "biotechnology", email: "sanjay.biotech@cusb.ac.in", image: "https://picsum.photos/seed/facultybt2/300/300", specialization: "Microbiology, Fermentation", education: "Ph.D. from IIT Roorkee", publications: 35, experience: "14 years" },
  { name: "Dr. Neha Gupta", designation: "Assistant Professor", department: "biotechnology", email: "neha.biotech@cusb.ac.in", image: "https://picsum.photos/seed/facultybt3/300/300", specialization: "Bioinformatics, Computational Biology", education: "Ph.D. from CCMB Hyderabad", publications: 25, experience: "6 years" },
  { name: "Dr. Anil Kumar", designation: "Professor & Head", department: "chemistry", email: "anil.chem@cusb.ac.in", image: "https://picsum.photos/seed/faculty3/300/300", specialization: "Organic Chemistry", education: "Ph.D. from IIT Bombay", publications: 52, experience: "20 years" },
  { name: "Dr. Ritu Singh", designation: "Associate Professor", department: "chemistry", email: "ritu.chem@cusb.ac.in", image: "https://picsum.photos/seed/facultych2/300/300", specialization: "Physical Chemistry", education: "Ph.D. from BHU Varanasi", publications: 40, experience: "13 years" },
  { name: "Dr. Manoj Sharma", designation: "Assistant Professor", department: "chemistry", email: "manoj.chem@cusb.ac.in", image: "https://picsum.photos/seed/facultych3/300/300", specialization: "Analytical Chemistry", education: "Ph.D. from IIT Delhi", publications: 22, experience: "7 years" },
  { name: "Dr. Meena Sharma", designation: "Professor & Head", department: "commerce", email: "meena.commerce@cusb.ac.in", image: "https://picsum.photos/seed/faculty4/300/300", specialization: "Finance, Accounting", education: "Ph.D. from Delhi University", publications: 30, experience: "16 years" },
  { name: "Dr. Rakesh Jha", designation: "Associate Professor", department: "commerce", email: "rakesh.commerce@cusb.ac.in", image: "https://picsum.photos/seed/facultyco2/300/300", specialization: "Marketing, Management", education: "Ph.D. from Banaras Hindu University", publications: 28, experience: "12 years" },
  { name: "Dr. Preeti Kumari", designation: "Assistant Professor", department: "commerce", email: "preeti.commerce@cusb.ac.in", image: "https://picsum.photos/seed/facultyco3/300/300", specialization: "Taxation, Business Law", education: "Ph.D. from University of Calcutta", publications: 18, experience: "5 years" },
  { name: "Dr. Vikram Singh", designation: "Professor & Head", department: "computer-science", email: "vikram.cs@cusb.ac.in", image: "https://picsum.photos/seed/faculty5/300/300", specialization: "Artificial Intelligence, ML", education: "Ph.D. from IIT Madras", publications: 60, experience: "22 years" },
  { name: "Dr. Saurabh Mishra", designation: "Associate Professor", department: "computer-science", email: "saurabh.cs@cusb.ac.in", image: "https://picsum.photos/seed/facultycs2/300/300", specialization: "Data Science, Big Data", education: "Ph.D. from IISc Bangalore", publications: 45, experience: "14 years" },
  { name: "Dr. Pallavi Rani", designation: "Assistant Professor", department: "computer-science", email: "pallavi.cs@cusb.ac.in", image: "https://picsum.photos/seed/facultycs3/300/300", specialization: "Cybersecurity, Networking", education: "Ph.D. from IIT Kanpur", publications: 30, experience: "8 years" },
  { name: "Dr. Sunita Devi", designation: "Professor & Head", department: "economics", email: "sunita.econ@cusb.ac.in", image: "https://picsum.photos/seed/faculty6/300/300", specialization: "Development Economics", education: "Ph.D. from JNU Delhi", publications: 35, experience: "17 years" },
  { name: "Dr. Abhishek Kumar", designation: "Associate Professor", department: "economics", email: "abhishek.econ@cusb.ac.in", image: "https://picsum.photos/seed/facultyec2/300/300", specialization: "Econometrics, Finance", education: "Ph.D. from Delhi School of Economics", publications: 28, experience: "11 years" },
  { name: "Dr. Richa Sinha", designation: "Assistant Professor", department: "economics", email: "richa.econ@cusb.ac.in", image: "https://picsum.photos/seed/facultyec3/300/300", specialization: "International Economics", education: "Ph.D. from Gokhale Institute Pune", publications: 20, experience: "6 years" },
  { name: "Dr. Amitabh Tripathi", designation: "Professor & Head", department: "english", email: "amitabh.eng@cusb.ac.in", image: "https://picsum.photos/seed/faculty7/300/300", specialization: "English Literature", education: "Ph.D. from BHU Varanasi", publications: 42, experience: "19 years" },
  { name: "Dr. Kavita Sharma", designation: "Associate Professor", department: "english", email: "kavita.eng@cusb.ac.in", image: "https://picsum.photos/seed/facultyen2/300/300", specialization: "Linguistics, Applied Linguistics", education: "Ph.D. from University of Delhi", publications: 32, experience: "13 years" },
  { name: "Dr. Deepak Kumar", designation: "Assistant Professor", department: "english", email: "deepak.eng@cusb.ac.in", image: "https://picsum.photos/seed/facultyen3/300/300", specialization: "Creative Writing, Media Studies", education: "Ph.D. from Jamia Millia Islamia", publications: 18, experience: "7 years" },
  { name: "Dr. Geeta Prasad", designation: "Professor & Head", department: "hindi", email: "geeta.hindi@cusb.ac.in", image: "https://picsum.photos/seed/faculty8/300/300", specialization: "Hindi Literature", education: "Ph.D. from Lucknow University", publications: 28, experience: "16 years" },
  { name: "Dr. Rajendra Yadav", designation: "Associate Professor", department: "hindi", email: "rajendra.hindi@cusb.ac.in", image: "https://picsum.photos/seed/facultyhi2/300/300", specialization: "Hindi Linguistics, Translation", education: "Ph.D. from Hindi Sansthan Delhi", publications: 25, experience: "12 years" },
  { name: "Dr. Sarojini Devi", designation: "Assistant Professor", department: "hindi", email: "sarojini.hindi@cusb.ac.in", image: "https://picsum.photos/seed/facultyhi3/300/300", specialization: "Chhayavaad Literature", education: "Ph.D. from Kashi Hindu University", publications: 15, experience: "5 years" },
  { name: "Dr. Rameshwar Prasad", designation: "Professor & Head", department: "history", email: "rameshwar.hist@cusb.ac.in", image: "https://picsum.photos/seed/faculty9/300/300", specialization: "Ancient Indian History", education: "Ph.D. from University of Patna", publications: 50, experience: "21 years" },
  { name: "Dr. Bina Kumari", designation: "Associate Professor", department: "history", email: "bina.hist@cusb.ac.in", image: "https://picsum.photos/seed/facultyhs2/300/300", specialization: "Medieval History", education: "Ph.D. from JNU Delhi", publications: 38, experience: "15 years" },
  { name: "Dr. Chandrashekhar", designation: "Assistant Professor", department: "history", email: "chandrashekhar.hist@cusb.ac.in", image: "https://picsum.photos/seed/facultyhs3/300/300", specialization: "Modern Indian History", education: "Ph.D. from Aligarh Muslim University", publications: 22, experience: "8 years" },
  { name: "Dr. Justice Raghunath Singh", designation: "Professor & Head", department: "law", email: "raghunath.law@cusb.ac.in", image: "https://picsum.photos/seed/faculty10/300/300", specialization: "Constitutional Law", education: "LL.D. from NLU Delhi", publications: 55, experience: "25 years" },
  { name: "Dr. Madhav Raj", designation: "Associate Professor", department: "law", email: "madhav.law@cusb.ac.in", image: "https://picsum.photos/seed/facultylw2/300/300", specialization: "Criminal Law, International Law", education: "Ph.D. from NLU Jodhpur", publications: 35, experience: "14 years" },
  { name: "Dr. Sadhana Singh", designation: "Assistant Professor", department: "law", email: "sadhana.law@cusb.ac.in", image: "https://picsum.photos/seed/facultylw3/300/300", specialization: "Corporate Law, IPR", education: "LL.M. from NLU Bhopal", publications: 20, experience: "6 years" },
  { name: "Dr. Naveen Chandra", designation: "Professor & Head", department: "mathematics", email: "naveen.math@cusb.ac.in", image: "https://picsum.photos/seed/faculty11/300/300", specialization: "Applied Mathematics", education: "Ph.D. from IIT Delhi", publications: 48, experience: "18 years" },
  { name: "Dr. Dinesh Kumar", designation: "Associate Professor", department: "mathematics", email: "dinesh.math@cusb.ac.in", image: "https://picsum.photos/seed/facultymt2/300/300", specialization: "Statistics, Probability", education: "Ph.D. from ISI Kolkata", publications: 40, experience: "14 years" },
  { name: "Dr. Pinki Kumari", designation: "Assistant Professor", department: "mathematics", email: "pinki.math@cusb.ac.in", image: "https://picsum.photos/seed/facultymt3/300/300", specialization: "Pure Mathematics, Algebra", education: "Ph.D. from IIT Roorkee", publications: 18, experience: "5 years" },
  { name: "Dr. Subhash Chandra", designation: "Professor & Head", department: "physics", email: "subhash.phys@cusb.ac.in", image: "https://picsum.photos/seed/faculty12/300/300", specialization: "Condensed Matter Physics", education: "Ph.D. from Panjab University", publications: 65, experience: "22 years" },
  { name: "Dr. Rajeshwar Singh", designation: "Associate Professor", department: "physics", email: "rajeshwar.phys@cusb.ac.in", image: "https://picsum.photos/seed/facultyph2/300/300", specialization: "Particle Physics, Cosmology", education: "Ph.D. from University of Delhi", publications: 42, experience: "15 years" },
  { name: "Dr. Arti Kumari", designation: "Assistant Professor", department: "physics", email: "arti.phys@cusb.ac.in", image: "https://picsum.photos/seed/facultyph3/300/300", specialization: "Electronics, Instrumentation", education: "Ph.D. from IIT Patna", publications: 25, experience: "7 years" }
];

const newsData = [
  { title: "CUSB Launches New PhD Programs in AI and Data Science", content: "Central University of South Bihar announces new doctoral programs in Artificial Intelligence and Data Science starting from academic year 2026-27.", date: "22 Mar 2026", type: "Announcement", image: "https://picsum.photos/seed/news1/1200/700" },
  { title: "CUSB Ranked Among Top 50 Universities in NIRF 2026", content: "Central University of South Bihar has achieved a significant rank improvement in the National Institutional Ranking Framework 2026.", date: "18 Mar 2026", type: "Achievement", image: "https://picsum.photos/seed/news2/1200/700" },
  { title: "International Conference on Sustainable Development at CUSB", content: "CUSB hosts international conference on sustainable development with participants from 15 countries.", date: "10 Mar 2026", type: "Event", image: "https://picsum.photos/seed/news3/1200/700" },
  { title: "CUSB Students Win National Innovation Challenge 2026", content: "Team from Central University of South Bihar wins first prize in National Innovation Challenge.", date: "5 Mar 2026", type: "Achievement", image: "https://picsum.photos/seed/news4/1200/700" },
  { title: "New Research Center for Climate Change inaugurated at CUSB", content: "Honorable Vice Chancellor inaugurates new research center focused on climate change.", date: "1 Mar 2026", type: "Press Release", image: "https://picsum.photos/seed/news5/1200/700" },
  { title: "CUSB Signs MoU with IIT Patna for Joint Research", content: "Central University of South Bihar has signed a memorandum of understanding with IIT Patna.", date: "25 Feb 2026", type: "Achievement", image: "https://picsum.photos/seed/news6/1200/700" },
  { title: "Placement Season 2026: 95% Students Get Campus Offers", content: "The placement season 2026 has been highly successful with 95% of eligible students receiving campus placement offers.", date: "20 Feb 2026", type: "Achievement", image: "https://picsum.photos/seed/news7/1200/700" },
  { title: "New Library Building Inaugurated by Hon'ble Chancellor", content: "A new state-of-the-art library building with digital resources has been inaugurated.", date: "15 Feb 2026", type: "Press Release", image: "https://picsum.photos/seed/news8/1200/700" },
  { title: "CUSB Hosts National Sports Meet 2026", content: "University hosts the National Inter-University Sports Meet with over 50 universities participating.", date: "10 Feb 2026", type: "Event", image: "https://picsum.photos/seed/news9/1200/700" },
  { title: "Research Paper Published in Nature Journal", content: "Dr. Subhash Chandra from Physics department publishes groundbreaking research.", date: "5 Feb 2026", type: "Achievement", image: "https://picsum.photos/seed/news10/1200/700" }
];

const announcementsData = [
  { text: "Admissions Open for 2026-27 | Apply Now", priority: "high" },
  { text: "Fellowship 2026 - Applications Deadline Extended to 30th April", priority: "high" },
  { text: "Vigilance Awareness Week - 27th October to 2nd November, 2025", priority: "medium" },
  { text: "Research Grant Opportunities Available for Faculty", priority: "medium" },
  { text: "Annual Fest 2026 - Register Your Team by 15th April", priority: "low" },
  { text: "New Online Courses Launched | Enroll Today", priority: "low" },
  { text: "Campus Placement Drive - TCS, Infosys on 20th April", priority: "high" },
  { text: "National Science Day Celebration on 28th February", priority: "medium" },
  { text: "Library Extended Hours During Exam Season", priority: "medium" },
  { text: "Yoga and Meditation Classes for Students", priority: "low" }
];

const noticesData = [
  { title: "Examination Schedule for Semester End 2026", category: "Examination", date: "25 Mar 2026", link: "#", description: "The examination timetable for the end semester examinations has been published." },
  { title: "Fee Payment Deadline - Last Date 30th March 2026", category: "Fee", date: "24 Mar 2026", link: "#", description: "All students must pay their semester fees by 30th March 2026." },
  { title: "Hostel Allotment List Published", category: "Hostel", date: "22 Mar 2026", link: "#", description: "The hostel allotment list for the academic year 2026-27 has been published." },
  { title: "Research Methodology Workshop Registration Open", category: "Workshop", date: "20 Mar 2026", link: "#", description: "A 5-day workshop on Research Methodology will be conducted from 1st to 5th April 2026." },
  { title: "Summer Internship Program 2026", category: "Placement", date: "18 Mar 2026", link: "#", description: "Applications are open for the Summer Internship Program 2026." },
  { title: "Library Holiday Schedule", category: "General", date: "15 Mar 2026", link: "#", description: "The library will remain closed on public holidays." },
  { title: "Anti-Ragging Committee Meeting", category: "General", date: "12 Mar 2026", link: "#", description: "An anti-ragging committee meeting will be held on 15th March 2026." },
  { title: "Scholarship Applications Open", category: "Scholarship", date: "10 Mar 2026", link: "#", description: "National Scholarship Portal applications are now open." },
  { title: "Convocation 2026 Date Announced", category: "Event", date: "8 Mar 2026", link: "#", description: "The 8th Annual Convocation will be held on 15th April 2026." },
  { title: "Online Examination Guidelines", category: "Examination", date: "5 Mar 2026", link: "#", description: "Guidelines for online examinations have been published." }
];

const eventsData = [
  { title: "17th Foundation Day Celebration", subtitle: "Ceremony and Awards", date: "27 Feb 2026", image: "/images/fd27.jpeg", type: "recent" },
  { title: "Alumini Meet 2026", subtitle: "Reconnect with fellow graduates", date: "25 Feb 2026", image: "/images/ameet.jpeg", type: "recent" },
  { title: "International Conference on AI", subtitle: "AI in Sustainable Systems", date: "5 Mar 2026", image: "/images/interconf.jpg", type: "recent" },
  { title: "Inter-Departmental Sports Meet", subtitle: "Annual sports competition", date: "28 Feb 2026", image: "https://picsum.photos/seed/sports/600/400", type: "recent" },
  { title: "Cultural Fest Utsav 2026", subtitle: "Three days of cultural events", date: "20 Feb 2026", image: "https://picsum.photos/seed/cultural/600/400", type: "recent" },
  { title: "Startup Bootcamp", subtitle: "3-day intensive training", date: "8 Apr 2026", image: "https://picsum.photos/seed/upcoming1/600/400", type: "upcoming" },
  { title: "Research Symposium", subtitle: "Presentations from faculty", date: "18 Apr 2026", image: "https://picsum.photos/seed/upcoming2/600/400", type: "upcoming" },
  { title: "Campus Marathon", subtitle: "Health & fitness event", date: "26 Apr 2026", image: "https://picsum.photos/seed/upcoming3/600/400", type: "upcoming" },
  { title: "International Conference", subtitle: "Global perspectives on technology", date: "5 May 2026", image: "https://picsum.photos/seed/upcoming4/600/400", type: "upcoming" },
  { title: "Art Exhibition", subtitle: "Student and faculty artwork display", date: "12 May 2026", image: "https://picsum.photos/seed/upcoming5/600/400", type: "upcoming" },
  { title: "Hackathon 2026", subtitle: "48-hour coding challenge", date: "20 May 2026", image: "https://picsum.photos/seed/upcoming6/600/400", type: "upcoming" },
  { title: "Annual Convocation", subtitle: "Graduation ceremony", date: "15 Apr 2026", image: "https://picsum.photos/seed/convocation/600/400", type: "upcoming" }
];

const syllabusData = [
  { department: "computer-science", program: "B.Sc", semester: "1", subjects: ["Mathematics-I", "Physics", "Computer Fundamentals", "C Programming", "English Communication"], year: "2024" },
  { department: "computer-science", program: "B.Sc", semester: "2", subjects: ["Mathematics-II", "Chemistry", "Data Structures", "C++ Programming", "Environmental Studies"], year: "2024" },
  { department: "computer-science", program: "M.Sc", semester: "1", subjects: ["Advanced Algorithms", "Machine Learning", "Database Systems", "Research Methodology", "Probability & Statistics"], year: "2024" },
  { department: "chemistry", program: "B.Sc", semester: "1", subjects: ["Organic Chemistry-I", "Inorganic Chemistry-I", "Physical Chemistry-I", "Mathematics for Chemists", "English"], year: "2024" },
  { department: "commerce", program: "B.Com", semester: "1", subjects: ["Financial Accounting", "Business Mathematics", "Business Economics", "Business Communication", "Computer Applications"], year: "2024" },
  { department: "physics", program: "B.Sc", semester: "1", subjects: ["Mechanics", "Wave Motion", "Optics", "Mathematics for Physics-I", "English Communication"], year: "2024" }
];

const statsData = {
  students: 4500,
  staff: 220,
  courses: 65,
  projects: 120,
  publications: 850,
  collaborations: 25
};

const galleryData = [
  { title: "Campus View", image: "https://picsum.photos/seed/gallery1/800/600", category: "Campus" },
  { title: "Library Building", image: "https://picsum.photos/seed/gallery2/800/600", category: "Infrastructure" },
  { title: "Computer Lab", image: "https://picsum.photos/seed/gallery3/800/600", category: "Labs" },
  { title: "Annual Fest", image: "https://picsum.photos/seed/gallery4/800/600", category: "Events" },
  { title: "Convocation", image: "https://picsum.photos/seed/gallery5/800/600", category: "Events" },
  { title: "Research Lab", image: "https://picsum.photos/seed/gallery6/800/600", category: "Labs" },
  { title: "Sports Meet", image: "https://picsum.photos/seed/gallery7/800/600", category: "Sports" },
  { title: "Cultural Event", image: "https://picsum.photos/seed/gallery8/800/600", category: "Events" },
  { title: "Hostel Building", image: "https://picsum.photos/seed/gallery9/800/600", category: "Infrastructure" },
  { title: "Conference Hall", image: "https://picsum.photos/seed/gallery10/800/600", category: "Infrastructure" }
];

const quickLinksData = [
  { title: "Student Portal", url: "#", category: "Academic" },
  { title: "Examination", url: "#", category: "Academic" },
  { title: "Library", url: "#", category: "Academic" },
  { title: "Downloads", url: "#", category: "Resources" },
  { title: "NIRF Report", url: "#", category: "Reports" },
  { title: "NAAC Reports", url: "#", category: "Reports" },
  { title: "Tenders", url: "#", category: "Admin" },
  { title: "RTI", url: "#", category: "Admin" }
];

const contactInfoData = {
  address: "Central University of South Bihar, Gaya-Panchanpur Road, Gaya - 823001, Bihar, India",
  phone: "+91-631-2223456",
  email: "info@cusb.ac.in",
  website: "www.cusb.ac.in",
  viceChancellor: "vc@cusb.ac.in",
  registrar: "registrar@cusb.ac.in"
};

async function seedDatabase() {
  console.log("Starting comprehensive database seeding...");
  
  try {
    const collections = ['departments', 'faculty', 'news', 'announcements', 'notices', 'events', 'stats', 'syllabus', 'leadership', 'gallery', 'quickLinks', 'contactInfo'];
    
    for (const col of collections) {
      const snapshot = await getDocs(collection(db, col));
      for (const document of snapshot.docs) {
        await deleteDoc(document.ref);
      }
    }
    console.log("Cleared existing data");

    for (const dept of departments) {
      await addDoc(collection(db, 'departments'), dept);
    }
    console.log(`Added ${departments.length} departments with images`);

    for (const fac of facultyData) {
      await addDoc(collection(db, 'faculty'), fac);
    }
    console.log(`Added ${facultyData.length} faculty members`);

    for (const news of newsData) {
      await addDoc(collection(db, 'news'), news);
    }
    console.log(`Added ${newsData.length} news items`);

    for (const ann of announcementsData) {
      await addDoc(collection(db, 'announcements'), ann);
    }
    console.log(`Added ${announcementsData.length} announcements`);

    for (const notice of noticesData) {
      await addDoc(collection(db, 'notices'), notice);
    }
    console.log(`Added ${noticesData.length} notices`);

    for (const event of eventsData) {
      await addDoc(collection(db, 'events'), event);
    }
    console.log(`Added ${eventsData.length} events`);

    await addDoc(collection(db, 'stats'), statsData);
    console.log("Added stats");

    for (const syl of syllabusData) {
      await addDoc(collection(db, 'syllabus'), syl);
    }
    console.log(`Added ${syllabusData.length} syllabus records`);

    await addDoc(collection(db, 'quickLinks'), { links: quickLinksData });
    console.log("Added quick links");

    await addDoc(collection(db, 'contactInfo'), contactInfoData);
    console.log("Added contact info");

    console.log("\n Database seeding completed successfully!");
    
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDatabase();
