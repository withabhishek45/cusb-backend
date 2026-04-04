import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";

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

const leadershipData = [
  {
    id: "president",
    title: "President",
    name: "Hon'ble President of India",
    image: "https://picsum.photos/seed/president/400/500",
    message: "The Central University of South Bihar exemplifies the commitment to excellence in higher education. I congratulate the university on its remarkable journey and urge it to continue fostering academic brilliance and societal contribution.",
    tenure: "President of India"
  },
  {
    id: "chancellor",
    title: "Chancellor",
    name: "Prof. (Dr.) K. G. S. Ojha",
    image: "https://picsum.photos/seed/chancellor/400/500",
    message: "As the Chancellor, I am proud of our university's achievements. We remain committed to providing quality education and fostering research that contributes to national development.",
    tenure: "2022 - Present"
  },
  {
    id: "vice-chancellor",
    title: "Vice Chancellor",
    name: "Prof. (Dr.) K. K. Sharma",
    image: "https://picsum.photos/seed/vc/400/500",
    message: "Our vision is to make CUSB a world-class university. We focus on innovative teaching, cutting-edge research, and holistic development of students to prepare them for global challenges.",
    tenure: "2023 - Present"
  }
];

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
    image: "https://picsum.photos/seed/agriculture/1200/600",
    coverImage: "https://picsum.photos/seed/agri-cover/1600/800"
  },
  {
    id: "biotechnology",
    name: "Department of Biotechnology",
    shortName: "Biotechnology",
    description: "The Department of Biotechnology offers comprehensive programs in molecular biology, genetics, industrial biotechnology, and bioinformatics. Students engage in cutting-edge research in drug discovery, genetic engineering, and agricultural biotechnology. The department bridges the gap between biology and technology.",
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
    image: "https://picsum.photos/seed/biotechnology/1200/600",
    coverImage: "https://picsum.photos/seed/biotech-cover/1600/800"
  },
  {
    id: "chemistry",
    name: "Department of Chemistry",
    shortName: "Chemistry",
    description: "The Department of Chemistry provides rigorous training in organic, inorganic, physical, and analytical chemistry. Our research addresses challenges in drug synthesis, materials science, and environmental chemistry. The department has well-equipped laboratories and research facilities.",
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
    image: "https://picsum.photos/seed/chemistry/1200/600",
    coverImage: "https://picsum.photos/seed/chem-cover/1600/800"
  },
  {
    id: "commerce",
    name: "Department of Commerce & Business Studies",
    shortName: "Commerce",
    description: "The Department of Commerce & Business Studies offers programs in accounting, finance, taxation, and business management. Our curriculum prepares students for careers in corporate finance, banking, and entrepreneurship. The department emphasizes practical learning through case studies and industry projects.",
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
    image: "https://picsum.photos/seed/commerce/1200/600",
    coverImage: "https://picsum.photos/seed/commerce-cover/1600/800"
  },
  {
    id: "computer-science",
    name: "Department of Computer Science",
    shortName: "Computer Science",
    description: "The Department of Computer Science offers programs covering software development, artificial intelligence, data science, cybersecurity, and cloud computing. Students gain practical experience through projects and industry collaborations. The department has state-of-the-art computing facilities.",
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
    image: "https://picsum.photos/seed/computer/1200/600",
    coverImage: "https://picsum.photos/seed/cs-cover/1600/800"
  },
  {
    id: "economics",
    name: "Department of Economics",
    shortName: "Economics",
    description: "The Department of Economics offers comprehensive programs in microeconomics, macroeconomics, econometrics, and development economics. Our research focuses on Indian economic policy and global economic issues. Students develop strong analytical and quantitative skills.",
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
    image: "https://picsum.photos/seed/economics/1200/600",
    coverImage: "https://picsum.photos/seed/econ-cover/1600/800"
  },
  {
    id: "english",
    name: "Department of English",
    shortName: "English",
    description: "The Department of English offers programs in literature, linguistics, creative writing, and communication studies. Students develop critical thinking and communication skills essential for various career paths. The department fosters appreciation for diverse literary traditions.",
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
    image: "https://picsum.photos/seed/english/1200/600",
    coverImage: "https://picsum.photos/seed/eng-cover/1600/800"
  },
  {
    id: "hindi",
    name: "Department of Hindi",
    shortName: "Hindi",
    description: "The Department of Hindi focuses on Hindi literature, linguistics, translation studies, and creative writing. The department preserves and promotes Hindi language and literature through teaching and research. Students explore classical and modern Hindi literature.",
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
    image: "https://picsum.photos/seed/hindi/1200/600",
    coverImage: "https://picsum.photos/seed/hindi-cover/1600/800"
  },
  {
    id: "history",
    name: "Department of History",
    shortName: "History",
    description: "The Department of History offers programs covering ancient, medieval, and modern Indian history, as well as world history. Students explore historical narratives and develop research skills. The department encourages critical analysis of historical events and their contemporary relevance.",
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
    image: "https://picsum.photos/seed/history/1200/600",
    coverImage: "https://picsum.photos/seed/hist-cover/1600/800"
  },
  {
    id: "law",
    name: "Department of Law & Governance",
    shortName: "Law",
    description: "The Department of Law offers comprehensive legal education covering constitutional law, criminal law, corporate law, and international law. Students receive practical training through moot courts and legal aid clinics. The department prepares students for judicial services and legal practice.",
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
    image: "https://picsum.photos/seed/law/1200/600",
    coverImage: "https://picsum.photos/seed/law-cover/1600/800"
  },
  {
    id: "mathematics",
    name: "Department of Mathematics",
    shortName: "Mathematics",
    description: "The Department of Mathematics offers programs in pure and applied mathematics, statistics, and computational mathematics. The department fosters analytical thinking and problem-solving skills essential for various careers. Students engage with theoretical foundations and practical applications.",
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
    image: "https://picsum.photos/seed/mathematics/1200/600",
    coverImage: "https://picsum.photos/seed/math-cover/1600/800"
  },
  {
    id: "physics",
    name: "Department of Physics",
    shortName: "Physics",
    description: "The Department of Physics offers comprehensive programs in theoretical and experimental physics. Students engage in research in condensed matter physics, particle physics, and astrophysics. The department has well-equipped laboratories for hands-on learning.",
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
    image: "https://picsum.photos/seed/physics/1200/600",
    coverImage: "https://picsum.photos/seed/phys-cover/1600/800"
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
  { title: "CUSB Launches New PhD Programs in AI and Data Science", content: "Central University of South Bihar announces new doctoral programs in Artificial Intelligence and Data Science starting from academic year 2026-27. The programs will focus on cutting-edge research in machine learning, deep learning, and big data analytics.", date: "22 Mar 2026", type: "Announcement", image: "https://picsum.photos/seed/news1/1200/700" },
  { title: "CUSB Ranked Among Top 50 Universities in NIRF 2026", content: "Central University of South Bihar has achieved a significant rank improvement in the National Institutional Ranking Framework 2026. The university now ranks 47th among all Indian universities, reflecting our commitment to academic excellence.", date: "18 Mar 2026", type: "Achievement", image: "https://picsum.photos/seed/news2/1200/700" },
  { title: "International Conference on Sustainable Development at CUSB", content: "CUSB hosts international conference on sustainable development with participants from 15 countries. The conference focused on environmental conservation, renewable energy, and sustainable agriculture practices.", date: "10 Mar 2026", type: "Event", image: "https://picsum.photos/seed/news3/1200/700" },
  { title: "CUSB Students Win National Innovation Challenge 2026", content: "Team from Central University of South Bihar wins first prize in National Innovation Challenge with their startup idea on agricultural technology. The team received INR 10 lakhs seed funding.", date: "5 Mar 2026", type: "Achievement", image: "https://picsum.photos/seed/news4/1200/700" },
  { title: "New Research Center for Climate Change inaugurated at CUSB", content: "Honorable Vice Chancellor inaugurates new research center focused on climate change and environmental sustainability. The center will conduct interdisciplinary research on climate adaptation strategies.", date: "1 Mar 2026", type: "Press Release", image: "https://picsum.photos/seed/news5/1200/700" },
  { title: "CUSB Signs MoU with IIT Patna for Joint Research", content: "Central University of South Bihar has signed a memorandum of understanding with IIT Patna for collaborative research in science and technology domains.", date: "25 Feb 2026", type: "Achievement", image: "https://picsum.photos/seed/news6/1200/700" },
  { title: "Placement Season 2026: 95% Students Get Campus Offers", content: "The placement season 2026 has been highly successful with 95% of eligible students receiving campus placement offers from top companies including Google, Microsoft, and TCS.", date: "20 Feb 2026", type: "Achievement", image: "https://picsum.photos/seed/news7/1200/700" },
  { title: "New Library Building Inaugurated by Hon'ble Chancellor", content: "A new state-of-the-art library building with digital resources, study rooms, and 24/7 access has been inaugurated to enhance the learning experience.", date: "15 Feb 2026", type: "Press Release", image: "https://picsum.photos/seed/news8/1200/700" },
  { title: "CUSB Hosts National Sports Meet 2026", content: "University hosts the National Inter-University Sports Meet with over 50 universities participating in various sports categories.", date: "10 Feb 2026", type: "Event", image: "https://picsum.photos/seed/news9/1200/700" },
  { title: "Research Paper Published in Nature Journal", content: "Dr. Subhash Chandra from Physics department publishes groundbreaking research on quantum materials in Nature journal.", date: "5 Feb 2026", type: "Achievement", image: "https://picsum.photos/seed/news10/1200/700" }
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
  { title: "Examination Schedule for Semester End 2026", category: "Examination", date: "25 Mar 2026", link: "#", description: "The examination timetable for the end semester examinations has been published. Students are advised to check their respective department notices." },
  { title: "Fee Payment Deadline - Last Date 30th March 2026", category: "Fee", date: "24 Mar 2026", link: "#", description: "All students must pay their semester fees by 30th March 2026. Late fee will be applicable after the deadline." },
  { title: "Hostel Allotment List Published", category: "Hostel", date: "22 Mar 2026", link: "#", description: "The hostel allotment list for the academic year 2026-27 has been published. Students can check their allotment status online." },
  { title: "Research Methodology Workshop Registration Open", category: "Workshop", date: "20 Mar 2026", link: "#", description: "A 5-day workshop on Research Methodology will be conducted from 1st to 5th April 2026. Register before 28th March." },
  { title: "Summer Internship Program 2026", category: "Placement", date: "18 Mar 2026", link: "#", description: "Applications are open for the Summer Internship Program 2026. Students can apply through the placement portal." },
  { title: "Library Holiday Schedule", category: "General", date: "15 Mar 2026", link: "#", description: "The library will remain closed on public holidays. Special arrangements during exam season will be notified separately." },
  { title: "Anti-Ragging Committee Meeting", category: "General", date: "12 Mar 2026", link: "#", description: "An anti-ragging committee meeting will be held on 15th March 2026 at 11 AM in the Conference Hall." },
  { title: "Scholarship Applications Open", category: "Scholarship", date: "10 Mar 2026", link: "#", description: "National Scholarship Portal applications are now open. Last date for submission is 30th April 2026." },
  { title: "Convocation 2026 Date Announced", category: "Event", date: "8 Mar 2026", link: "#", description: "The 8th Annual Convocation will be held on 15th April 2026. Students completing their degrees must register online." },
  { title: "Online Examination Guidelines", category: "Examination", date: "5 Mar 2026", link: "#", description: "Guidelines for online examinations have been published. Students must follow the instructions carefully." }
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
  { department: "computer-science", program: "B.Sc", semester: "3", subjects: ["Discrete Mathematics", "Object Oriented Programming", "Database Management", "Digital Electronics", "Software Engineering"], year: "2024" },
  { department: "computer-science", program: "M.Sc", semester: "1", subjects: ["Advanced Algorithms", "Machine Learning", "Database Systems", "Research Methodology", "Probability & Statistics"], year: "2024" },
  { department: "chemistry", program: "B.Sc", semester: "1", subjects: ["Organic Chemistry-I", "Inorganic Chemistry-I", "Physical Chemistry-I", "Mathematics for Chemists", "English"], year: "2024" },
  { department: "chemistry", program: "M.Sc", semester: "1", subjects: ["Advanced Organic Chemistry", "Coordination Chemistry", "Thermodynamics", "Spectroscopy", "Laboratory Practice"], year: "2024" },
  { department: "commerce", program: "B.Com", semester: "1", subjects: ["Financial Accounting", "Business Mathematics", "Business Economics", "Business Communication", "Computer Applications"], year: "2024" },
  { department: "commerce", program: "M.Com", semester: "1", subjects: ["Advanced Accounting", "Business Finance", "Marketing Management", "Research Methods", "Human Resource Management"], year: "2024" },
  { department: "physics", program: "B.Sc", semester: "1", subjects: ["Mechanics", "Wave Motion", "Optics", "Mathematics for Physics-I", "English Communication"], year: "2024" },
  { department: "physics", program: "M.Sc", semester: "1", subjects: ["Classical Mechanics", "Quantum Mechanics-I", "Electromagnetic Theory", "Mathematical Physics", "Statistical Physics"], year: "2024" },
  { department: "mathematics", program: "B.Sc", semester: "1", subjects: ["Calculus", "Linear Algebra", "Differential Equations", "Set Theory", "English"], year: "2024" },
  { department: "mathematics", program: "M.Sc", semester: "1", subjects: ["Real Analysis", "Abstract Algebra", "Topology", "Complex Analysis", "Measure Theory"], year: "2024" }
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

    // Seed departments
    for (const dept of departments) {
      await addDoc(collection(db, 'departments'), dept);
    }
    console.log(`Added ${departments.length} departments`);

    // Seed faculty
    for (const fac of facultyData) {
      await addDoc(collection(db, 'faculty'), fac);
    }
    console.log(`Added ${facultyData.length} faculty members`);

    // Seed news
    for (const news of newsData) {
      await addDoc(collection(db, 'news'), news);
    }
    console.log(`Added ${newsData.length} news items`);

    // Seed announcements
    for (const ann of announcementsData) {
      await addDoc(collection(db, 'announcements'), ann);
    }
    console.log(`Added ${announcementsData.length} announcements`);

    // Seed notices
    for (const notice of noticesData) {
      await addDoc(collection(db, 'notices'), notice);
    }
    console.log(`Added ${noticesData.length} notices`);

    // Seed events
    for (const event of eventsData) {
      await addDoc(collection(db, 'events'), event);
    }
    console.log(`Added ${eventsData.length} events`);

    // Seed stats
    await addDoc(collection(db, 'stats'), statsData);
    console.log("Added stats");

    // Seed syllabus
    for (const syl of syllabusData) {
      await addDoc(collection(db, 'syllabus'), syl);
    }
    console.log(`Added ${syllabusData.length} syllabus records`);

    // Seed leadership
    for (const lead of leadershipData) {
      await addDoc(collection(db, 'leadership'), lead);
    }
    console.log(`Added ${leadershipData.length} leadership members`);

    // Seed gallery
    for (const gal of galleryData) {
      await addDoc(collection(db, 'gallery'), gal);
    }
    console.log(`Added ${galleryData.length} gallery items`);

    // Seed quick links
    for (const ql of quickLinksData) {
      await addDoc(collection(db, 'quickLinks'), ql);
    }
    console.log(`Added ${quickLinksData.length} quick links`);

    // Seed contact info
    await addDoc(collection(db, 'contactInfo'), contactInfoData);
    console.log("Added contact info");

    console.log("\n Database seeding completed successfully!");
    console.log("\n Collections created:");
    console.log("  - departments (12)");
    console.log("  - faculty (36)");
    console.log("  - news (10)");
    console.log("  - announcements (10)");
    console.log("  - notices (10)");
    console.log("  - events (12)");
    console.log("  - syllabus (12)");
    console.log("  - leadership (3)");
    console.log("  - gallery (10)");
    console.log("  - quickLinks (8)");
    console.log("  - stats (1)");
    console.log("  - contactInfo (1)");
    
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDatabase();
