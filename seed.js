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
    id: "agriculture",
    name: "Department of Agriculture",
    shortName: "Agriculture",
    description: "The Department of Agriculture focuses on modern agricultural practices, agronomy, horticulture, and sustainable farming techniques.",
    programs: ["B.Sc. (Hons) Agriculture", "M.Sc. Agriculture (Agronomy)", "M.Sc. Agriculture (Horticulture)", "Ph.D. Agriculture"],
    established: 2014,
    hod: "Dr. Rajesh Kumar",
    email: "agriculture@cusb.ac.in",
    phone: "+91-631-2223526",
    vision: "To become a center of excellence in agricultural education and research.",
    mission: "To produce skilled agricultural professionals through quality education and research.",
    objectives: ["Impart agricultural sciences knowledge", "Promote sustainable agriculture", "Develop farming skills", "Foster entrepreneurship in agriculture"],
    facilities: ["Smart Greenhouse", "Soil Testing Lab", "Plant Pathology Lab", "Entomology Lab", "Agronomy Field", "Seed Technology Lab"],
    images: ["https://picsum.photos/seed/agri1/1200/600", "https://picsum.photos/seed/agri2/1200/600", "https://picsum.photos/seed/agri3/1200/600"],
    studentCount: 180,
    placementRate: 78,
    researchPapers: 120,
    fundedProjects: 18,
    researchGrants: 75,
    faculty: [
      { name: "Dr. Rajesh Kumar", designation: "Professor & Head", email: "rajesh.agri@cusb.ac.in", phone: "+91-631-2223559", image: "https://picsum.photos/seed/facagri1/400/400", specialization: "Agronomy", qualification: "Ph.D. (IIT Kharagpur), M.Sc. Agriculture", experience: "18 years", publications: 60, researchInterests: "Sustainable Agriculture, Crop Management, Soil Health", awards: "Young Scientist Award 2015" },
      { name: "Dr. Ashok Kumar", designation: "Associate Professor", email: "ashok.agri@cusb.ac.in", phone: "+91-631-2223560", image: "https://picsum.photos/seed/facagri2/400/400", specialization: "Horticulture", qualification: "Ph.D. (PAU Ludhiana), M.Sc. Horticulture", experience: "12 years", publications: 42, researchInterests: "Vegetable Production, Floriculture, Post-harvest Technology", awards: "" },
      { name: "Dr. Vandana Devi", designation: "Assistant Professor", email: "vandana.agri@cusb.ac.in", phone: "+91-631-2223561", image: "https://picsum.photos/seed/facagri3/400/400", specialization: "Soil Science", qualification: "Ph.D. (IARI New Delhi), M.Sc. Soil Science", experience: "8 years", publications: 28, researchInterests: "Soil Fertility, Plant Nutrition, Organic Farming", awards: "Best Paper Award 2019" }
    ]
  },
  {
    id: "bioinformatics",
    name: "Dept. of Bioinformatics",
    shortName: "Bioinformatics",
    description: "The Department of Bioinformatics combines biology and computer science to analyze complex biological data. Students learn computational approaches to understand biological systems, protein structures, and genetic information.",
    programs: ["M.Sc. Bioinformatics", "M.Tech. Bioinformatics", "Ph.D. Bioinformatics"],
    established: 2016,
    hod: "Dr. Alok Kumar",
    email: "bioinformatics@cusb.ac.in",
    phone: "+91-631-2223501",
    vision: "To be a leading department in computational biology and bioinformatics research.",
    mission: "To provide interdisciplinary training combining biology, computer science, and statistics.",
    objectives: ["Train students in computational biology", "Promote research in genomics and proteomics", "Develop bioinformatics tools", "Bridge biology and IT industries"],
    facilities: ["High Performance Computing Lab", "Genome Analysis Lab", "Structural Biology Lab", "Sequence Analysis Lab", "Protein Modeling Lab"],
    images: ["https://picsum.photos/seed/bioinfo1/1200/600", "https://picsum.photos/seed/bioinfo2/1200/600", "https://picsum.photos/seed/bioinfo3/1200/600"],
    studentCount: 80,
    placementRate: 85,
    researchPapers: 65,
    fundedProjects: 10,
    researchGrants: 45,
    faculty: [
      { name: "Dr. Alok Kumar", designation: "Associate Professor & Head", email: "alok.bioinfo@cusb.ac.in", phone: "+91-631-2223501", image: "https://picsum.photos/seed/facbioinfo1/400/400", specialization: "Computational Biology", qualification: "Ph.D. (IIT Delhi), M.Sc. Bioinformatics", experience: "12 years", publications: 35, researchInterests: "Genomics, Protein Structure Prediction, Drug Discovery", awards: "Young Scientist Award 2020" },
      { name: "Dr. Priya Ranjan", designation: "Assistant Professor", email: "priya.bioinfo@cusb.ac.in", phone: "+91-631-2223502", image: "https://picsum.photos/seed/facbioinfo2/400/400", specialization: "Structural Bioinformatics", qualification: "Ph.D. (NIT Surathkal), M.Tech Bioinformatics", experience: "6 years", publications: 22, researchInterests: "Molecular Modeling, Drug Design, Network Biology", awards: "" }
    ]
  },
  {
    id: "biotechnology",
    name: "Department of Biotechnology",
    shortName: "Biotechnology",
    description: "The Department of Biotechnology offers comprehensive programs in molecular biology, genetics, industrial biotechnology, and bioinformatics. Students engage in cutting-edge research in drug discovery, genetic engineering, and agricultural biotechnology.",
    programs: ["B.Sc. (Hons) Biotechnology", "M.Sc. Biotechnology", "M.Sc. Bioinformatics", "Ph.D. Biotechnology"],
    established: 2014,
    hod: "Dr. Priya Singh",
    email: "biotechnology@cusb.ac.in",
    phone: "+91-631-2223505",
    vision: "To be a leader in biotechnology education and research, fostering innovation for societal benefit.",
    mission: "To provide interdisciplinary training in biotechnology and create knowledge-based solutions for healthcare, agriculture, and industry.",
    objectives: ["Provide quality education in modern biotechnology", "Conduct research in frontier areas", "Promote industry-academia collaboration", "Develop skilled human resources"],
    facilities: ["Molecular Biology Lab", "Cell Culture Lab", "Bioinformatics Center", "Fermentation Unit", "Genetic Engineering Lab", "Protein Analysis Lab"],
    images: ["https://picsum.photos/seed/biotech1/1200/600", "https://picsum.photos/seed/biotech2/1200/600", "https://picsum.photos/seed/biotech3/1200/600"],
    studentCount: 150,
    placementRate: 85,
    researchPapers: 95,
    fundedProjects: 12,
    researchGrants: 60,
    faculty: [
      { name: "Dr. Priya Singh", designation: "Professor & Head", email: "priya.biotech@cusb.ac.in", phone: "+91-631-2223509", image: "https://picsum.photos/seed/facbiotech1/400/400", specialization: "Molecular Biology", qualification: "Ph.D. (AIIMS Delhi), M.Sc. Biotechnology", experience: "18 years", publications: 65, researchInterests: "Gene Therapy, Genetic Engineering, Drug Development", awards: "Shanti Swarup Bhatnagar Prize 2022" },
      { name: "Dr. Sanjay Kumar", designation: "Associate Professor", email: "sanjay.biotech@cusb.ac.in", phone: "+91-631-2223510", image: "https://picsum.photos/seed/facbiotech2/400/400", specialization: "Microbiology", qualification: "Ph.D. (IIT Roorkee), M.Sc. Microbiology", experience: "14 years", publications: 48, researchInterests: "Industrial Microbiology, Enzyme Technology", awards: "Best Researcher Award 2020" },
      { name: "Dr. Neha Gupta", designation: "Assistant Professor", email: "neha.biotech@cusb.ac.in", phone: "+91-631-2223511", image: "https://picsum.photos/seed/facbiotech3/400/400", specialization: "Bioinformatics", qualification: "Ph.D. (IIT Delhi), M.Sc. Bioinformatics", experience: "6 years", publications: 25, researchInterests: "Computational Biology, Protein Structure, Drug Discovery", awards: "" }
    ]
  },
  {
    id: "chemistry",
    name: "Department of Chemistry",
    shortName: "Chemistry",
    description: "The Department of Chemistry provides rigorous training in organic, inorganic, physical, and analytical chemistry.",
    programs: ["B.Sc. (Hons) Chemistry", "M.Sc. Chemistry", "M.Sc. Analytical Chemistry", "Ph.D. Chemistry"],
    established: 2014,
    hod: "Dr. Anil Kumar",
    email: "chemistry@cusb.ac.in",
    phone: "+91-631-2223512",
    vision: "To excel in chemical sciences education and research with focus on sustainability.",
    mission: "To cultivate a deep understanding of chemical principles through excellent teaching.",
    objectives: ["Deliver comprehensive chemistry education", "Promote research in chemical sciences", "Foster innovation in sustainable chemistry", "Produce industry-ready graduates"],
    facilities: ["Organic Synthesis Lab", "Spectroscopy Lab", "Analytical Lab", "Physical Chemistry Lab", "Instrumentation Center", "Computational Chemistry Lab"],
    images: ["https://picsum.photos/seed/chem1/1200/600", "https://picsum.photos/seed/chem2/1200/600", "https://picsum.photos/seed/chem3/1200/600"],
    studentCount: 140,
    placementRate: 72,
    researchPapers: 150,
    fundedProjects: 20,
    researchGrants: 85,
    faculty: [
      { name: "Dr. Anil Kumar", designation: "Professor & Head", email: "anil.chem@cusb.ac.in", phone: "+91-631-2223524", image: "https://picsum.photos/seed/facchem1/400/400", specialization: "Organic Chemistry", qualification: "Ph.D. (IIT Bombay), M.Sc. Chemistry", experience: "20 years", publications: 72, researchInterests: "Organic Synthesis, Catalysis, Natural Products", awards: "Herbert C. Brown Award 2021" },
      { name: "Dr. Suman Rani", designation: "Associate Professor", email: "suman.chem@cusb.ac.in", phone: "+91-631-2223525", image: "https://picsum.photos/seed/facchem2/400/400", specialization: "Physical Chemistry", qualification: "Ph.D. (IIT Kanpur), M.Sc. Chemistry", experience: "12 years", publications: 45, researchInterests: "Chemical Kinetics, Electrochemistry", awards: "" },
      { name: "Dr. Rakesh Thakur", designation: "Assistant Professor", email: "rakesh.chem@cusb.ac.in", phone: "+91-631-2223526", image: "https://picsum.photos/seed/facchem3/400/400", specialization: "Inorganic Chemistry", qualification: "Ph.D. (BHU Varanasi), M.Sc. Chemistry", experience: "5 years", publications: 18, researchInterests: "Coordination Chemistry, Bioinorganic Chemistry", awards: "" }
    ]
  },
  {
    id: "commerce",
    name: "Department of Commerce and Business Studies",
    shortName: "Commerce",
    description: "The Department of Commerce and Business Studies offers programs in accounting, finance, taxation, and business management.",
    programs: ["B.Com. (Hons)", "M.Com.", "MBA", "M.Com. (Finance)", "Ph.D. Commerce"],
    established: 2014,
    hod: "Dr. Meena Sharma",
    email: "commerce@cusb.ac.in",
    phone: "+91-631-2223522",
    vision: "To be a premier department developing business leaders with ethical values.",
    mission: "To provide industry-relevant education through innovative pedagogy.",
    objectives: ["Impart knowledge in commerce", "Develop managerial skills", "Promote research in management", "Bridge academia and industry"],
    facilities: ["Computer Lab", "Accounting Lab", "Incubation Center", "Seminar Hall", "Placement Cell"],
    images: ["https://picsum.photos/seed/com1/1200/600", "https://picsum.photos/seed/com2/1200/600", "https://picsum.photos/seed/com3/1200/600"],
    studentCount: 280,
    placementRate: 90,
    researchPapers: 80,
    fundedProjects: 8,
    researchGrants: 40,
    faculty: [
      { name: "Dr. Meena Sharma", designation: "Professor & Head", email: "meena.com@cusb.ac.in", phone: "+91-631-2223550", image: "https://picsum.photos/seed/faccom1/400/400", specialization: "Finance", qualification: "Ph.D. (Delhi University), MBA Finance, CA", experience: "18 years", publications: 55, researchInterests: "Corporate Finance, Financial Markets, Auditing", awards: "Best Teacher Award 2020" },
      { name: "Dr. Ajay Kumar", designation: "Associate Professor", email: "ajay.com@cusb.ac.in", phone: "+91-631-2223551", image: "https://picsum.photos/seed/faccom2/400/400", specialization: "Marketing", qualification: "Ph.D. (BHU), MBA Marketing", experience: "12 years", publications: 40, researchInterests: "Digital Marketing, Consumer Behavior, Brand Management", awards: "Best Researcher Award 2021" },
      { name: "Dr. Priyanka Singh", designation: "Assistant Professor", email: "priyanka.com@cusb.ac.in", phone: "+91-631-2223552", image: "https://picsum.photos/seed/faccom3/400/400", specialization: "Taxation", qualification: "Ph.D. (Lucknow University), M.Com, CA", experience: "7 years", publications: 20, researchInterests: "GST, Income Tax, Corporate Tax Planning", awards: "" }
    ]
  },
  {
    id: "economics",
    name: "Department of Economic Studies and Policy",
    shortName: "Economics",
    description: "The Department of Economic Studies and Policy offers comprehensive programs in microeconomics, macroeconomics, econometrics, and development economics.",
    programs: ["B.A. (Hons) Economics", "M.A. Economics", "M.A. Development Economics", "Ph.D. Economics"],
    established: 2014,
    hod: "Dr. Sunita Devi",
    email: "economics@cusb.ac.in",
    phone: "+91-631-2223508",
    vision: "To be a leading department in economics education and policy research.",
    mission: "To produce economists equipped with theoretical knowledge and analytical skills.",
    objectives: ["Provide quality economics education", "Conduct policy-oriented research", "Develop quantitative skills", "Promote economic development studies"],
    facilities: ["Economics Lab", "Statistical Software", "Research Cell", "Data Analysis Center", "Computer Lab"],
    images: ["https://picsum.photos/seed/economics1/1200/600", "https://picsum.photos/seed/economics2/1200/600", "https://picsum.photos/seed/economics3/1200/600"],
    studentCount: 130,
    placementRate: 75,
    researchPapers: 90,
    fundedProjects: 15,
    researchGrants: 55,
    faculty: [
      { name: "Dr. Sunita Devi", designation: "Professor & Head", email: "sunita.econ@cusb.ac.in", phone: "+91-631-2223516", image: "https://picsum.photos/seed/facecon1/400/400", specialization: "Development Economics", qualification: "Ph.D. (JNU Delhi), M.A. Economics", experience: "18 years", publications: 55, researchInterests: "Poverty Alleviation, Rural Development, Policy Analysis", awards: "Economics Excellence Award 2020" },
      { name: "Dr. Dinesh Prasad", designation: "Associate Professor", email: "dinesh.econ@cusb.ac.in", phone: "+91-631-2223517", image: "https://picsum.photos/seed/facecon2/400/400", specialization: "Econometrics", qualification: "Ph.D. (DSE), M.A. Economics", experience: "12 years", publications: 38, researchInterests: "Time Series Analysis, Econometric Modeling", awards: "" }
    ]
  },
  {
    id: "teacher-education",
    name: "Department of Teacher Education",
    shortName: "Education",
    description: "The Department of Teacher Education offers programs in elementary and secondary education, educational technology, and counseling psychology.",
    programs: ["B.Ed.", "M.Ed.", "M.A. Education", "Ph.D. Education"],
    established: 2015,
    hod: "Dr. Sushma Devi",
    email: "education@cusb.ac.in",
    phone: "+91-631-2223517",
    vision: "To be a model department for teacher education and educational research.",
    mission: "To produce competent and compassionate teachers for diverse educational settings.",
    objectives: ["Provide quality teacher education", "Research educational practices", "Develop teaching skills", "Promote inclusive education"],
    facilities: ["Teaching Practice Lab", "Educational Technology Lab", "Psychology Lab", "Library", "School Observation Center"],
    images: ["https://picsum.photos/seed/edu1/1200/600", "https://picsum.photos/seed/edu2/1200/600", "https://picsum.photos/seed/edu3/1200/600"],
    studentCount: 200,
    placementRate: 90,
    researchPapers: 60,
    fundedProjects: 10,
    researchGrants: 40,
    faculty: [
      { name: "Dr. Sushma Devi", designation: "Associate Professor & Head", email: "sushma.edu@cusb.ac.in", phone: "+91-631-2223539", image: "https://picsum.photos/seed/facedu1/400/400", specialization: "Education", qualification: "Ph.D. (University of Delhi), M.Ed.", experience: "15 years", publications: 52, researchInterests: "Educational Psychology, Teacher Education, Inclusive Education", awards: "Education Excellence Award 2021" },
      { name: "Dr. Rajesh Kumar", designation: "Assistant Professor", email: "rajesh.edu@cusb.ac.in", phone: "+91-631-2223540", image: "https://picsum.photos/seed/facedu2/400/400", specialization: "Educational Technology", qualification: "Ph.D. (BHU), M.Ed.", experience: "8 years", publications: 30, researchInterests: "E-Learning, ICT in Education, Educational Technology", awards: "" }
    ]
  },
  {
    id: "english",
    name: "Department of English",
    shortName: "English",
    description: "The Department of English offers programs in literature, linguistics, creative writing, and communication studies.",
    programs: ["B.A. (Hons) English", "M.A. English", "M.A. Linguistics", "Ph.D. English"],
    established: 2014,
    hod: "Dr. Amitabh Tripathi",
    email: "english@cusb.ac.in",
    phone: "+91-631-2223519",
    vision: "To foster excellence in English language, literature, and communication.",
    mission: "To develop linguistic proficiency, critical analysis, and creative expression among students.",
    objectives: ["Impart comprehensive English education", "Develop communication skills", "Promote research in literature", "Foster creative writing"],
    facilities: ["Language Lab", "Media Room", "Theater Studio", "Reading Room", "E-Library", "Audio-Visual Lab"],
    images: ["https://picsum.photos/seed/eng1/1200/600", "https://picsum.photos/seed/eng2/1200/600", "https://picsum.photos/seed/eng3/1200/600"],
    studentCount: 200,
    placementRate: 70,
    researchPapers: 75,
    fundedProjects: 6,
    researchGrants: 30,
    faculty: [
      { name: "Dr. Amitabh Tripathi", designation: "Professor & Head", email: "amitabh.eng@cusb.ac.in", phone: "+91-631-2223543", image: "https://picsum.photos/seed/faceng1/400/400", specialization: "English Literature", qualification: "Ph.D. (BHU), M.A. English", experience: "20 years", publications: 62, researchInterests: "Victorian Literature, Postcolonial Studies, Literary Criticism", awards: "Padma Shri 2023" },
      { name: "Dr. Preeti Sharma", designation: "Associate Professor", email: "preeti.eng@cusb.ac.in", phone: "+91-631-2223544", image: "https://picsum.photos/seed/faceng2/400/400", specialization: "Linguistics", qualification: "Ph.D. (JNU), M.A. Linguistics", experience: "12 years", publications: 42, researchInterests: "Sociolinguistics, Discourse Analysis, Language Teaching", awards: "Best Teacher Award 2021" },
      { name: "Dr. Kiran Kumari", designation: "Assistant Professor", email: "kiran.eng@cusb.ac.in", phone: "+91-631-2223545", image: "https://picsum.photos/seed/faceng3/400/400", specialization: "Creative Writing", qualification: "Ph.D. (University of Calcutta), M.A. English", experience: "6 years", publications: 18, researchInterests: "Creative Writing, Comparative Literature, Translation", awards: "" }
    ]
  },
  {
    id: "environmental-sciences",
    name: "Department of Environmental Sciences",
    shortName: "Environmental Sciences",
    description: "The Department of Environmental Sciences focuses on environmental monitoring, climate change, pollution control, and sustainable development. Students learn to address environmental challenges through scientific approaches.",
    programs: ["B.Sc. (Hons) Environmental Science", "M.Sc. Environmental Science", "M.Sc. Climate Science", "Ph.D. Environmental Sciences"],
    established: 2016,
    hod: "Dr. Anil Kumar",
    email: "environment@cusb.ac.in",
    phone: "+91-631-2223506",
    vision: "To be a center of excellence in environmental research and sustainability.",
    mission: "To produce environmental professionals for a sustainable future.",
    objectives: ["Study climate change and its impacts", "Research pollution control methods", "Promote sustainable practices", "Train environmental scientists"],
    facilities: ["Environmental Monitoring Lab", "Water Quality Lab", "Air Quality Lab", "GIS Lab", "Climate Observatory", "Waste Management Unit"],
    images: ["https://picsum.photos/seed/envsci1/1200/600", "https://picsum.photos/seed/envsci2/1200/600", "https://picsum.photos/seed/envsci3/1200/600"],
    studentCount: 100,
    placementRate: 78,
    researchPapers: 75,
    fundedProjects: 18,
    researchGrants: 70,
    faculty: [
      { name: "Dr. Anil Kumar", designation: "Associate Professor & Head", email: "anil.env@cusb.ac.in", phone: "+91-631-2223512", image: "https://picsum.photos/seed/facenv1/400/400", specialization: "Environmental Science", qualification: "Ph.D. (IIT Kharagpur), M.Sc. Environmental Science", experience: "13 years", publications: 52, researchInterests: "Climate Change, Environmental Pollution, Sustainability", awards: "Environmental Excellence Award 2021" },
      { name: "Dr. Neha Gupta", designation: "Assistant Professor", email: "neha.env@cusb.ac.in", phone: "+91-631-2223513", image: "https://picsum.photos/seed/facenv2/400/400", specialization: "Ecology", qualification: "Ph.D. (University of Pune), M.Sc. Environmental Science", experience: "6 years", publications: 28, researchInterests: "Ecosystem Services, Biodiversity, Conservation", awards: "" }
    ]
  },
  {
    id: "geography",
    name: "Department of Geography",
    shortName: "Geography",
    description: "The Department of Geography offers programs in physical geography, human geography, and geographic information systems. Students learn about spatial analysis, remote sensing, and sustainable development.",
    programs: ["B.A. (Hons) Geography", "M.A. Geography", "M.Sc. Geoinformatics", "Ph.D. Geography"],
    established: 2015,
    hod: "Dr. Manoj Kumar",
    email: "geography@cusb.ac.in",
    phone: "+91-631-2223503",
    vision: "To be a center of excellence in geographic research and spatial analysis.",
    mission: "To provide comprehensive geography education with modern technology.",
    objectives: ["Promote geospatial technology education", "Conduct regional planning research", "Study climate change impacts", "Develop GIS applications"],
    facilities: ["GIS Lab", "Cartography Lab", "Remote Sensing Lab", "Weather Station", "Field Equipment"],
    images: ["https://picsum.photos/seed/geography1/1200/600", "https://picsum.photos/seed/geography2/1200/600", "https://picsum.photos/seed/geography3/1200/600"],
    studentCount: 120,
    placementRate: 72,
    researchPapers: 70,
    fundedProjects: 12,
    researchGrants: 50,
    faculty: [
      { name: "Dr. Manoj Kumar", designation: "Associate Professor & Head", email: "manoj.geo@cusb.ac.in", phone: "+91-631-2223505", image: "https://picsum.photos/seed/facgeog1/400/400", specialization: "Geomorphology", qualification: "Ph.D. (JNU), M.A. Geography", experience: "15 years", publications: 48, researchInterests: "Climate Change, Geospatial Analysis, Regional Planning", awards: "Geography Excellence Award 2021" },
      { name: "Dr. Sunita Kumari", designation: "Assistant Professor", email: "sunita.geo@cusb.ac.in", phone: "+91-631-2223506", image: "https://picsum.photos/seed/facgeog2/400/400", specialization: "GIS & Remote Sensing", qualification: "Ph.D. (Delhi University), M.Sc. Geoinformatics", experience: "7 years", publications: 20, researchInterests: "GIS Applications, Urban Geography, Cartography", awards: "" }
    ]
  },
  {
    id: "geology",
    name: "Department of Geology",
    shortName: "Geology",
    description: "The Department of Geology offers comprehensive study of Earth sciences including mineralogy, petrology, structural geology, and environmental geology. Students gain practical experience through field work and laboratory analysis.",
    programs: ["B.Sc. (Hons) Geology", "M.Sc. Geology", "M.Sc. Applied Geology", "Ph.D. Geology"],
    established: 2015,
    hod: "Dr. Rajeshwar Prasad",
    email: "geology@cusb.ac.in",
    phone: "+91-631-2223502",
    vision: "To excel in earth sciences education and geological research.",
    mission: "To produce skilled geologists for industry, research, and environmental sectors.",
    objectives: ["Provide quality geology education", "Conduct geological surveys", "Promote environmental geology", "Train students in field techniques"],
    facilities: ["Mineralogy Lab", "Petrology Lab", "Geochemistry Lab", "Field Station", "Geophysical Instruments"],
    images: ["https://picsum.photos/seed/geology1/1200/600", "https://picsum.photos/seed/geology2/1200/600", "https://picsum.photos/seed/geology3/1200/600"],
    studentCount: 75,
    placementRate: 70,
    researchPapers: 55,
    fundedProjects: 8,
    researchGrants: 40,
    faculty: [
      { name: "Dr. Rajeshwar Prasad", designation: "Associate Professor & Head", email: "rajesh.geology@cusb.ac.in", phone: "+91-631-2223503", image: "https://picsum.photos/seed/facgeo1/400/400", specialization: "Mineralogy", qualification: "Ph.D. (IIT Roorkee), M.Sc. Geology", experience: "14 years", publications: 40, researchInterests: "Mineral Exploration, Geochemistry, Petrology", awards: "Best Researcher Award 2019" },
      { name: "Dr. Amit Kumar", designation: "Assistant Professor", email: "amit.geology@cusb.ac.in", phone: "+91-631-2223504", image: "https://picsum.photos/seed/facgeo2/400/400", specialization: "Structural Geology", qualification: "Ph.D. (BHU), M.Sc. Geology", experience: "8 years", publications: 25, researchInterests: "Tectonics, Field Geology, Remote Sensing", awards: "" }
    ]
  },
  {
    id: "history-archaeology",
    name: "Department of Historical Studies and Archaeology",
    shortName: "History & Archaeology",
    description: "The Department of Historical Studies and Archaeology offers programs covering ancient, medieval, and modern history with special emphasis on archaeological studies.",
    programs: ["B.A. (Hons) History", "M.A. History", "M.A. Archaeology", "Ph.D. History"],
    established: 2014,
    hod: "Dr. Rameshwar Prasad",
    email: "history@cusb.ac.in",
    phone: "+91-631-2223507",
    vision: "To be a leading department in historical research and archaeological studies.",
    mission: "To develop historical understanding and research capabilities among students.",
    objectives: ["Provide comprehensive history education", "Promote archaeological research", "Develop fieldwork skills", "Preserve cultural heritage"],
    facilities: ["History Museum", "Archaeological Lab", "Archive Center", "Digital Archives", "Field Equipment"],
    images: ["https://picsum.photos/seed/history1/1200/600", "https://picsum.photos/seed/history2/1200/600", "https://picsum.photos/seed/history3/1200/600"],
    studentCount: 140,
    placementRate: 60,
    researchPapers: 85,
    fundedProjects: 10,
    researchGrants: 45,
    faculty: [
      { name: "Dr. Rameshwar Prasad", designation: "Professor & Head", email: "rameshwar.hist@cusb.ac.in", phone: "+91-631-2223514", image: "https://picsum.photos/seed/fachist1/400/400", specialization: "Ancient Indian History", qualification: "Ph.D. (University of Patna), M.A. History", experience: "22 years", publications: 65, researchInterests: "Indus Valley Civilization, Vedic Period, Archaeology", awards: "Best Historian Award 2022" },
      { name: "Dr. Shyam Singh", designation: "Associate Professor", email: "shyam.hist@cusb.ac.in", phone: "+91-631-2223515", image: "https://picsum.photos/seed/fachist2/400/400", specialization: "Medieval History", qualification: "Ph.D. (AMU Aligarh), M.A. History", experience: "14 years", publications: 40, researchInterests: "Mughal History, Cultural History, Historical Archaeology", awards: "" }
    ]
  },
  {
    id: "indian-languages",
    name: "Dept. of Indian Languages",
    shortName: "Indian Languages",
    description: "The Department of Indian Languages offers programs in Hindi, Sanskrit, Maithili, and other Indian languages.",
    programs: ["B.A. (Hons) Hindi", "M.A. Hindi", "M.A. Sanskrit", "M.A. Maithili", "Ph.D. Hindi"],
    established: 2014,
    hod: "Dr. Geeta Prasad",
    email: "indianlanguages@cusb.ac.in",
    phone: "+91-631-2223520",
    vision: "To be a center for excellence in Indian languages and cultural studies.",
    mission: "To promote Indian languages, literature, and cultural heritage.",
    objectives: ["Promote Indian language education", "Conduct linguistic research", "Develop translation skills", "Preserve cultural heritage"],
    facilities: ["Language Lab", "Translation Lab", "Archive Room", "Digital Library", "Literary Museum"],
    images: ["https://picsum.photos/seed/indlang1/1200/600", "https://picsum.photos/seed/indlang2/1200/600", "https://picsum.photos/seed/indlang3/1200/600"],
    studentCount: 180,
    placementRate: 65,
    researchPapers: 60,
    fundedProjects: 5,
    researchGrants: 25,
    faculty: [
      { name: "Dr. Geeta Prasad", designation: "Professor & Head", email: "geeta.hin@cusb.ac.in", phone: "+91-631-2223546", image: "https://picsum.photos/seed/fachin1/400/400", specialization: "Hindi Literature", qualification: "Ph.D. (Lucknow University), M.A. Hindi", experience: "18 years", publications: 48, researchInterests: "Chhayavaad Literature, Modern Hindi Poetry, Folk Literature", awards: "Sahitya Akademi Award 2020" },
      { name: "Dr. Raghunath Tiwari", designation: "Associate Professor", email: "raghunath.hin@cusb.ac.in", phone: "+91-631-2223547", image: "https://picsum.photos/seed/fachin2/400/400", specialization: "Sanskrit", qualification: "Ph.D. (Vidyapati University), M.A. Sanskrit", experience: "12 years", publications: 35, researchInterests: "Sanskrit Literature, Vedic Studies, Indian Philosophy", awards: "" }
    ]
  },
  {
    id: "law",
    name: "Department of Law and Governance",
    shortName: "Law",
    description: "The Department of Law and Governance offers comprehensive legal education covering constitutional law, criminal law, corporate law, and international law.",
    programs: ["B.A. LL.B (Hons)", "LL.M.", "LL.M. (Constitutional Law)", "Ph.D. Law"],
    established: 2014,
    hod: "Dr. Justice Raghunath Singh",
    email: "law@cusb.ac.in",
    phone: "+91-631-2223524",
    vision: "To produce legal professionals with ethical values and social responsibility.",
    mission: "To provide quality legal education combining theory with practical skills.",
    objectives: ["Impart comprehensive legal education", "Develop litigation skills", "Promote access to justice", "Prepare for judicial examinations"],
    facilities: ["Moot Court Hall", "Legal Aid Clinic", "Library", "Computer Lab", "Drafting Lab", "ADR Center"],
    images: ["https://picsum.photos/seed/law1/1200/600", "https://picsum.photos/seed/law2/1200/600", "https://picsum.photos/seed/law3/1200/600"],
    studentCount: 140,
    placementRate: 82,
    researchPapers: 70,
    fundedProjects: 8,
    researchGrants: 35,
    faculty: [
      { name: "Dr. Justice Raghunath Singh", designation: "Professor & Head", email: "raghunath.law@cusb.ac.in", phone: "+91-631-2223555", image: "https://picsum.photos/seed/faclaw1/400/400", specialization: "Constitutional Law", qualification: "LL.D. (NLU Delhi), LL.M., B.A. LL.B.", experience: "25 years", publications: 70, researchInterests: "Constitutional Law, Human Rights, Administrative Law", awards: "Senior advocate Award 2019" },
      { name: "Dr. Aparna Mishra", designation: "Associate Professor", email: "aparna.law@cusb.ac.in", phone: "+91-631-2223556", image: "https://picsum.photos/seed/faclaw2/400/400", specialization: "Criminal Law", qualification: "Ph.D. (NALSAR), LL.M. Criminal Law", experience: "12 years", publications: 45, researchInterests: "Criminal Justice, Human Rights Law, Criminology", awards: "Legal Excellence Award 2020" }
    ]
  },
  {
    id: "library-science",
    name: "Dept. of Library & Information Science",
    shortName: "Library Science",
    description: "The Department of Library & Information Science offers programs in library management, information systems, digital libraries, and knowledge management.",
    programs: ["B.Lib.I.Sc.", "M.Lib.I.Sc.", "M.A. Library Science", "Ph.D. Library Science"],
    established: 2015,
    hod: "Dr. Rakesh Kumar",
    email: "library@cusb.ac.in",
    phone: "+91-631-2223511",
    vision: "To be a leader in library and information science education.",
    mission: "To produce information professionals for the digital age.",
    objectives: ["Train library professionals", "Promote digital library development", "Research information systems", "Develop knowledge management skills"],
    facilities: ["Digital Library Lab", "Cataloging Lab", "Classification Lab", "ICT Lab", "E-Resource Center"],
    images: ["https://picsum.photos/seed/library1/1200/600", "https://picsum.photos/seed/library2/1200/600", "https://picsum.photos/seed/library3/1200/600"],
    studentCount: 60,
    placementRate: 88,
    researchPapers: 40,
    fundedProjects: 5,
    researchGrants: 20,
    faculty: [
      { name: "Dr. Rakesh Kumar", designation: "Associate Professor & Head", email: "rakesh.lib@cusb.ac.in", phone: "+91-631-2223522", image: "https://picsum.photos/seed/faclib1/400/400", specialization: "Library Science", qualification: "Ph.D. (University of Delhi), M.Lib.I.Sc.", experience: "16 years", publications: 42, researchInterests: "Digital Libraries, Knowledge Management, Information Literacy", awards: "Library Science Award 2021" },
      { name: "Dr. Sunita Devi", designation: "Assistant Professor", email: "sunita.lib@cusb.ac.in", phone: "+91-631-2223523", image: "https://picsum.photos/seed/faclib2/400/400", specialization: "Information Science", qualification: "Ph.D. (JNU), M.Lib.I.Sc.", experience: "8 years", publications: 28, researchInterests: "E-Resources, Bibliometrics, Library Automation", awards: "" }
    ]
  },
  {
    id: "life-sciences",
    name: "Dept. of Life Sciences",
    shortName: "Life Sciences",
    description: "The Department of Life Sciences offers comprehensive programs in botany, zoology, and environmental science. Students explore biodiversity, ecology, and conservation biology through theoretical and practical approaches.",
    programs: ["B.Sc. (Hons) Life Sciences", "M.Sc. Life Sciences", "M.Sc. Botany", "M.Sc. Zoology", "Ph.D. Life Sciences"],
    established: 2014,
    hod: "Dr. Sunita Kumari",
    email: "lifesciences@cusb.ac.in",
    phone: "+91-631-2223504",
    vision: "To be a leader in life sciences education and biodiversity research.",
    mission: "To promote understanding of living organisms and ecosystems.",
    objectives: ["Study biodiversity conservation", "Research ecosystem dynamics", "Train in modern biology techniques", "Promote environmental awareness"],
    facilities: ["Botany Lab", "Zoology Lab", "Microbiology Lab", "Ecology Field Station", "Herbarium", "Museum"],
    images: ["https://picsum.photos/seed/lifesci1/1200/600", "https://picsum.photos/seed/lifesci2/1200/600", "https://picsum.photos/seed/lifesci3/1200/600"],
    studentCount: 180,
    placementRate: 75,
    researchPapers: 90,
    fundedProjects: 15,
    researchGrants: 65,
    faculty: [
      { name: "Dr. Sunita Kumari", designation: "Associate Professor & Head", email: "sunita.life@cusb.ac.in", phone: "+91-631-2223507", image: "https://picsum.photos/seed/faclife1/400/400", specialization: "Botany", qualification: "Ph.D. (BHU), M.Sc. Botany", experience: "16 years", publications: 55, researchInterests: "Plant Diversity, Conservation Biology, Ethnobotany", awards: "Botany Excellence Award 2020" },
      { name: "Dr. Rakesh Kumar", designation: "Associate Professor", email: "rakesh.life@cusb.ac.in", phone: "+91-631-2223508", image: "https://picsum.photos/seed/faclife2/400/400", specialization: "Zoology", qualification: "Ph.D. (University of Delhi), M.Sc. Zoology", experience: "12 years", publications: 42, researchInterests: "Wildlife Biology, Entomology, Ecology", awards: "" }
    ]
  },
  {
    id: "mass-communication",
    name: "Department of Mass Communication and Media",
    shortName: "Mass Communication",
    description: "The Department of Mass Communication and Media offers programs in journalism, digital media, advertising, and public relations.",
    programs: ["B.A. (Hons) Journalism", "M.A. Mass Communication", "M.A. Journalism", "Ph.D. Mass Communication"],
    established: 2016,
    hod: "Dr. Prakash Kumar",
    email: "masscommunication@cusb.ac.in",
    phone: "+91-631-2223521",
    vision: "To be a premier department in media education and journalism research.",
    mission: "To produce media professionals with ethical values and technical skills.",
    objectives: ["Provide quality media education", "Train in journalism practices", "Develop digital media skills", "Promote ethical journalism"],
    facilities: ["News Room", "Radio Studio", "TV Studio", "Editing Lab", "Photography Lab", "Media Lab"],
    images: ["https://picsum.photos/seed/media1/1200/600", "https://picsum.photos/seed/media2/1200/600", "https://picsum.photos/seed/media3/1200/600"],
    studentCount: 120,
    placementRate: 85,
    researchPapers: 50,
    fundedProjects: 8,
    researchGrants: 30,
    faculty: [
      { name: "Dr. Prakash Kumar", designation: "Associate Professor & Head", email: "prakash.masscom@cusb.ac.in", phone: "+91-631-2223548", image: "https://picsum.photos/seed/facmass1/400/400", specialization: "Journalism", qualification: "Ph.D. (University of Delhi), M.A. Journalism", experience: "14 years", publications: 45, researchInterests: "Digital Journalism, Media Ethics, Communication Theory", awards: "Media Excellence Award 2021" },
      { name: "Dr. Suman Devi", designation: "Assistant Professor", email: "suman.masscom@cusb.ac.in", phone: "+91-631-2223549", image: "https://picsum.photos/seed/facmass2/400/400", specialization: "Film Studies", qualification: "Ph.D. (University of Mumbai), M.A. Film Studies", experience: "8 years", publications: 28, researchInterests: "Film Criticism, Documentary Production, Visual Communication", awards: "" }
    ]
  },
  {
    id: "mathematics",
    name: "Dept. of Mathematics",
    shortName: "Mathematics",
    description: "The Department of Mathematics offers programs in pure and applied mathematics, statistics, and computational mathematics.",
    programs: ["B.Sc. (Hons) Mathematics", "M.Sc. Mathematics", "M.A. Mathematics", "Ph.D. Mathematics"],
    established: 2014,
    hod: "Dr. Naveen Chandra",
    email: "mathematics@cusb.ac.in",
    phone: "+91-631-2223514",
    vision: "To be a center of excellence in mathematics education and research.",
    mission: "To develop mathematical thinking and quantitative skills among students.",
    objectives: ["Provide quality mathematics education", "Promote research in mathematics", "Develop problem-solving skills", "Prepare students for competitive exams"],
    facilities: ["Computing Lab", "Mathematics Lab", "Research Room", "Statistics Lab", "Modeling Lab"],
    images: ["https://picsum.photos/seed/math1/1200/600", "https://picsum.photos/seed/math2/1200/600", "https://picsum.photos/seed/math3/1200/600"],
    studentCount: 125,
    placementRate: 68,
    researchPapers: 100,
    fundedProjects: 12,
    researchGrants: 50,
    faculty: [
      { name: "Dr. Naveen Chandra", designation: "Professor & Head", email: "naveen.math@cusb.ac.in", phone: "+91-631-2223530", image: "https://picsum.photos/seed/facmath1/400/400", specialization: "Applied Mathematics", qualification: "Ph.D. (IIT Delhi), M.Sc. Mathematics", experience: "18 years", publications: 60, researchInterests: "Differential Equations, Mathematical Modeling", awards: "Mathematical Society Award 2021" },
      { name: "Dr. Arvind Kumar", designation: "Associate Professor", email: "arvind.math@cusb.ac.in", phone: "+91-631-2223531", image: "https://picsum.photos/seed/facmath2/400/400", specialization: "Algebra", qualification: "Ph.D. (ISI Kolkata), M.Stat", experience: "13 years", publications: 48, researchInterests: "Group Theory, Ring Theory", awards: "" },
      { name: "Dr. Poonam Devi", designation: "Assistant Professor", email: "poonam.math@cusb.ac.in", phone: "+91-631-2223532", image: "https://picsum.photos/seed/facmath3/400/400", specialization: "Topology", qualification: "Ph.D. (University of Delhi), M.Sc. Mathematics", experience: "6 years", publications: 25, researchInterests: "General Topology, Functional Analysis", awards: "" }
    ]
  },
  {
    id: "pharmacy",
    name: "Department of Pharmacy",
    shortName: "Pharmacy",
    description: "The Department of Pharmacy offers programs in pharmaceutical sciences, pharmacology, drug discovery, and clinical pharmacy.",
    programs: ["B.Pharm.", "M.Pharm.", "M.Pharm. Pharmacology", "M.Pharm. Pharmaceutics", "Ph.D. Pharmacy"],
    established: 2016,
    hod: "Dr. Rajeshwar Kumar",
    email: "pharmacy@cusb.ac.in",
    phone: "+91-631-2223525",
    vision: "To be a center of excellence in pharmaceutical education and research.",
    mission: "To produce skilled pharmacists for healthcare and pharmaceutical industries.",
    objectives: ["Provide quality pharmacy education", "Promote drug research", "Develop clinical skills", "Train in pharmaceutical technology"],
    facilities: ["Pharmaceutics Lab", "Pharmacology Lab", "Pharmaceutical Chemistry Lab", "Instrumentation Lab", "Herbal Garden", "Industry Visit Center"],
    images: ["https://picsum.photos/seed/pharmacy1/1200/600", "https://picsum.photos/seed/pharmacy2/1200/600", "https://picsum.photos/seed/pharmacy3/1200/600"],
    studentCount: 120,
    placementRate: 88,
    researchPapers: 85,
    fundedProjects: 15,
    researchGrants: 65,
    faculty: [
      { name: "Dr. Rajeshwar Kumar", designation: "Associate Professor & Head", email: "rajeshwar.pharm@cusb.ac.in", phone: "+91-631-2223557", image: "https://picsum.photos/seed/facpharm1/400/400", specialization: "Pharmaceutics", qualification: "Ph.D. (JNU), M.Pharm. Pharmaceutics", experience: "14 years", publications: 55, researchInterests: "Drug Delivery Systems, Nanotechnology, Formulation Development", awards: "Pharmacy Excellence Award 2021" },
      { name: "Dr. Sunita Devi", designation: "Assistant Professor", email: "sunita.pharm@cusb.ac.in", phone: "+91-631-2223558", image: "https://picsum.photos/seed/facpharm2/400/400", specialization: "Pharmacology", qualification: "Ph.D. (AIIMS), M.Pharm. Pharmacology", experience: "8 years", publications: 35, researchInterests: "Pharmacology, Drug Discovery, Toxicology", awards: "" }
    ]
  },
  {
    id: "physical-education",
    name: "Department of Physical Education",
    shortName: "Physical Education",
    description: "The Department of Physical Education offers programs in sports science, health education, and sports management.",
    programs: ["B.P.Ed.", "M.P.Ed.", "M.Sc. Sports Science", "Ph.D. Physical Education"],
    established: 2015,
    hod: "Dr. Rakesh Singh",
    email: "physicaleducation@cusb.ac.in",
    phone: "+91-631-2223518",
    vision: "To be a center of excellence in physical education and sports sciences.",
    mission: "To promote health, fitness, and sports excellence through quality education.",
    objectives: ["Provide quality physical education", "Train sports coaches", "Research sports science", "Promote health and fitness"],
    facilities: ["Sports Complex", "Gymnasium", "Athletics Track", "Swimming Pool", "Sports Science Lab", "Physiotherapy Center"],
    images: ["https://picsum.photos/seed/physed1/1200/600", "https://picsum.photos/seed/physed2/1200/600", "https://picsum.photos/seed/physed3/1200/600"],
    studentCount: 150,
    placementRate: 82,
    researchPapers: 45,
    fundedProjects: 6,
    researchGrants: 25,
    faculty: [
      { name: "Dr. Rakesh Singh", designation: "Associate Professor & Head", email: "rakesh.pe@cusb.ac.in", phone: "+91-631-2223541", image: "https://picsum.photos/seed/facpe1/400/400", specialization: "Physical Education", qualification: "Ph.D. (LNUPE Gwalior), M.P.Ed.", experience: "16 years", publications: 45, researchInterests: "Sports Training, Sports Science, Fitness Management", awards: "Sports Science Award 2020" },
      { name: "Dr. Ajay Kumar", designation: "Assistant Professor", email: "ajay.pe@cusb.ac.in", phone: "+91-631-2223542", image: "https://picsum.photos/seed/facpe2/400/400", specialization: "Sports Psychology", qualification: "Ph.D. (LNUPE Gwalior), M.P.Ed.", experience: "9 years", publications: 28, researchInterests: "Sports Psychology, Athlete Performance, Sports Sociology", awards: "" }
    ]
  },
  {
    id: "physics",
    name: "Department of Physics",
    shortName: "Physics",
    description: "The Department of Physics offers comprehensive programs in theoretical and experimental physics.",
    programs: ["B.Sc. (Hons) Physics", "M.Sc. Physics", "M.Sc. Electronics", "M.Tech. Materials Science", "Ph.D. Physics"],
    established: 2014,
    hod: "Dr. Subhash Chandra",
    email: "physics@cusb.ac.in",
    phone: "+91-631-2223513",
    vision: "To be a leading department in physics education and frontier research.",
    mission: "To provide comprehensive physics education and foster research culture.",
    objectives: ["Provide quality physics education", "Promote research in frontier areas", "Develop experimental skills", "Prepare students for scientific careers"],
    facilities: ["Physics Lab", "Electronics Lab", "Dark Room", "Computational Lab", "Telescope", "Material Science Lab"],
    images: ["https://picsum.photos/seed/phys1/1200/600", "https://picsum.photos/seed/phys2/1200/600", "https://picsum.photos/seed/phys3/1200/600"],
    studentCount: 145,
    placementRate: 72,
    researchPapers: 130,
    fundedProjects: 22,
    researchGrants: 95,
    faculty: [
      { name: "Dr. Subhash Chandra", designation: "Professor & Head", email: "subhash.phys@cusb.ac.in", phone: "+91-631-2223527", image: "https://picsum.photos/seed/facphys1/400/400", specialization: "Condensed Matter Physics", qualification: "Ph.D. (Panjab University), M.Sc. Physics", experience: "22 years", publications: 85, researchInterests: "Material Science, Nanotechnology, Superconductivity", awards: "Shanti Swarup Bhatnagar Prize 2021" },
      { name: "Dr. Kameshwar Prasad", designation: "Associate Professor", email: "kameshwar.phys@cusb.ac.in", phone: "+91-631-2223528", image: "https://picsum.photos/seed/facphys2/400/400", specialization: "Particle Physics", qualification: "Ph.D. (IIT Kanpur), M.Sc. Physics", experience: "14 years", publications: 55, researchInterests: "High Energy Physics, Quantum Mechanics", awards: "" },
      { name: "Dr. Sushma Kumari", designation: "Assistant Professor", email: "sushma.phys@cusb.ac.in", phone: "+91-631-2223529", image: "https://picsum.photos/seed/facphys3/400/400", specialization: "Astrophysics", qualification: "Ph.D. (Aryabhatta Research Institute), M.Sc. Physics", experience: "8 years", publications: 30, researchInterests: "Cosmology, Stellar Astrophysics, Radio Astronomy", awards: "" }
    ]
  },
  {
    id: "political-studies",
    name: "Dept. of Political Studies",
    shortName: "Political Science",
    description: "The Department of Political Studies offers programs in political theory, comparative politics, international relations, and public administration.",
    programs: ["B.A. (Hons) Political Science", "M.A. Political Science", "M.A. International Relations", "Ph.D. Political Science"],
    established: 2014,
    hod: "Dr. Ashok Kumar",
    email: "politicalscience@cusb.ac.in",
    phone: "+91-631-2223509",
    vision: "To be a premier department in political science education and research.",
    mission: "To develop informed citizens and scholars with analytical capabilities.",
    objectives: ["Provide comprehensive political science education", "Research governance and public policy", "Study international relations", "Promote democratic values"],
    facilities: ["Political Science Lab", "Moot Parliament", "Research Center", "Library", "Seminar Hall"],
    images: ["https://picsum.photos/seed/political1/1200/600", "https://picsum.photos/seed/political2/1200/600", "https://picsum.photos/seed/political3/1200/600"],
    studentCount: 160,
    placementRate: 65,
    researchPapers: 70,
    fundedProjects: 8,
    researchGrants: 35,
    faculty: [
      { name: "Dr. Ashok Kumar", designation: "Associate Professor & Head", email: "ashok.pol@cusb.ac.in", phone: "+91-631-2223518", image: "https://picsum.photos/seed/facpol1/400/400", specialization: "Political Theory", qualification: "Ph.D. (JNU Delhi), M.A. Political Science", experience: "14 years", publications: 45, researchInterests: "Democratic Theory, Public Policy, Governance", awards: "Political Science Award 2021" },
      { name: "Dr. Meena Devi", designation: "Assistant Professor", email: "meena.pol@cusb.ac.in", phone: "+91-631-2223519", image: "https://picsum.photos/seed/facpol2/400/400", specialization: "International Relations", qualification: "Ph.D. (University of Delhi), M.A. IR", experience: "8 years", publications: 30, researchInterests: "International Politics, South Asian Studies", awards: "" }
    ]
  },
  {
    id: "psychology",
    name: "Dept. of Psychological Sciences",
    shortName: "Psychology",
    description: "The Department of Psychological Sciences offers programs in clinical psychology, counseling psychology, industrial psychology, and neuropsychology.",
    programs: ["B.A. (Hons) Psychology", "M.A. Psychology", "M.Sc. Clinical Psychology", "Ph.D. Psychology"],
    established: 2015,
    hod: "Dr. Suman Devi",
    email: "psychology@cusb.ac.in",
    phone: "+91-631-2223523",
    vision: "To be a center of excellence in psychological education and mental health.",
    mission: "To produce skilled psychologists for clinical, educational, and industrial settings.",
    objectives: ["Provide quality psychology education", "Train in counseling techniques", "Research mental health issues", "Promote psychological well-being"],
    facilities: ["Psychology Lab", "Counseling Center", "Observation Room", "Assessment Lab", "Clinical Training Center"],
    images: ["https://picsum.photos/seed/psych1/1200/600", "https://picsum.photos/seed/psych2/1200/600", "https://picsum.photos/seed/psych3/1200/600"],
    studentCount: 140,
    placementRate: 75,
    researchPapers: 65,
    fundedProjects: 10,
    researchGrants: 45,
    faculty: [
      { name: "Dr. Suman Devi", designation: "Associate Professor & Head", email: "suman.psy@cusb.ac.in", phone: "+91-631-2223553", image: "https://picsum.photos/seed/facpsy1/400/400", specialization: "Clinical Psychology", qualification: "Ph.D. (University of Delhi), M.A. Clinical Psychology", experience: "15 years", publications: 50, researchInterests: "Clinical Psychology, Counseling, Mental Health", awards: "Psychology Excellence Award 2020" },
      { name: "Dr. Rajesh Kumar", designation: "Assistant Professor", email: "rajesh.psy@cusb.ac.in", phone: "+91-631-2223554", image: "https://picsum.photos/seed/facpsy2/400/400", specialization: "Industrial Psychology", qualification: "Ph.D. (IIT Kharagpur), M.A. Psychology", experience: "8 years", publications: 30, researchInterests: "Organizational Behavior, HR Psychology, Workplace Well-being", awards: "" }
    ]
  },
  {
    id: "sociology",
    name: "Department of Sociological Studies",
    shortName: "Sociology",
    description: "The Department of Sociological Studies offers programs in sociological theory, research methodology, rural sociology, and urban sociology.",
    programs: ["B.A. (Hons) Sociology", "M.A. Sociology", "M.A. Criminology", "Ph.D. Sociology"],
    established: 2014,
    hod: "Dr. Meena Devi",
    email: "sociology@cusb.ac.in",
    phone: "+91-631-2223510",
    vision: "To be a center of excellence in sociological research and social policy.",
    mission: "To produce sociologists capable of understanding and addressing social challenges.",
    objectives: ["Study social structures and institutions", "Research social inequalities", "Analyze contemporary issues", "Promote social justice"],
    facilities: ["Sociology Lab", "Field Research Center", "Survey Lab", "Statistical Software", "Sociology Museum"],
    images: ["https://picsum.photos/seed/sociology1/1200/600", "https://picsum.photos/seed/sociology2/1200/600", "https://picsum.photos/seed/sociology3/1200/600"],
    studentCount: 145,
    placementRate: 62,
    researchPapers: 65,
    fundedProjects: 7,
    researchGrants: 30,
    faculty: [
      { name: "Dr. Meena Devi", designation: "Associate Professor & Head", email: "meena.soc@cusb.ac.in", phone: "+91-631-2223520", image: "https://picsum.photos/seed/facsoc1/400/400", specialization: "Rural Sociology", qualification: "Ph.D. (BHU), M.A. Sociology", experience: "15 years", publications: 48, researchInterests: "Rural Development, Social Stratification, Gender Studies", awards: "Sociology Excellence Award 2020" },
      { name: "Dr. Rajesh Kumar", designation: "Assistant Professor", email: "rajesh.soc@cusb.ac.in", phone: "+91-631-2223521", image: "https://picsum.photos/seed/facsoc2/400/400", specialization: "Urban Sociology", qualification: "Ph.D. (University of Delhi), M.A. Sociology", experience: "7 years", publications: 25, researchInterests: "Urban Development, Migration Studies", awards: "" }
    ]
  },
  {
    id: "statistics",
    name: "Department of Statistics",
    shortName: "Statistics",
    description: "The Department of Statistics offers programs in statistical methods, probability theory, and data science.",
    programs: ["B.Sc. (Hons) Statistics", "M.Sc. Statistics", "M.Sc. Data Science", "Ph.D. Statistics"],
    established: 2015,
    hod: "Dr. Rajesh Kumar",
    email: "statistics@cusb.ac.in",
    phone: "+91-631-2223515",
    vision: "To be a center of excellence in statistical education and research.",
    mission: "To produce statisticians equipped for data-driven decision making.",
    objectives: ["Provide comprehensive statistics education", "Promote statistical research", "Develop data analysis skills", "Train in modern statistical software"],
    facilities: ["Statistical Lab", "Data Science Lab", "Survey Research Center", "Computer Lab", "Statistical Software"],
    images: ["https://picsum.photos/seed/stat1/1200/600", "https://picsum.photos/seed/stat2/1200/600", "https://picsum.photos/seed/stat3/1200/600"],
    studentCount: 85,
    placementRate: 80,
    researchPapers: 55,
    fundedProjects: 8,
    researchGrants: 35,
    faculty: [
      { name: "Dr. Rajesh Kumar", designation: "Associate Professor & Head", email: "rajesh.stat@cusb.ac.in", phone: "+91-631-2223533", image: "https://picsum.photos/seed/facstat1/400/400", specialization: "Statistics", qualification: "Ph.D. (ISI Kolkata), M.Stat", experience: "14 years", publications: 50, researchInterests: "Statistical Inference, Probability Theory", awards: "Statistics Excellence Award 2020" },
      { name: "Dr. Poonam Devi", designation: "Assistant Professor", email: "poonam.stat@cusb.ac.in", phone: "+91-631-2223534", image: "https://picsum.photos/seed/facstat2/400/400", specialization: "Data Science", qualification: "Ph.D. (IIT Kanpur), M.Sc. Statistics", experience: "6 years", publications: 25, researchInterests: "Machine Learning, Big Data Analytics", awards: "" }
    ]
  }
];

const syllabusData = [
  { department: "bioinformatics", program: "M.Sc. Bioinformatics", semesters: [{ sem: 1, subjects: ["Biochemistry", "Molecular Biology", "Biostatistics", "Programming in Python", "Database Management"] }, { sem: 2, subjects: ["Genomics and Proteomics", "Structural Bioinformatics", "Machine Learning", "Perl Programming", "Cell Biology"] }, { sem: 3, subjects: ["Drug Discovery", "Phylogenetics", "Bioinformatics Tools", "R Programming", "Project Work"] }, { sem: 4, subjects: ["Thesis/Dissertation", "Seminar", "Viva Voce"] }] },
  { department: "geology", program: "M.Sc. Geology", semesters: [{ sem: 1, subjects: ["Mineralogy", "Petrology", "Stratigraphy", "Paleontology", "Geochemistry"] }, { sem: 2, subjects: ["Structural Geology", "Geomorphology", "Remote Sensing", "Field Geology", "Geophysics"] }, { sem: 3, subjects: ["Economic Geology", "Hydrogeology", "Environmental Geology", "Mining Geology", "Field Training"] }, { sem: 4, subjects: ["Dissertation", "Viva Voce", "Seminar"] }] },
  { department: "geography", program: "M.A. Geography", semesters: [{ sem: 1, subjects: ["Geomorphology", "Climatology", "Population Geography", "Economic Geography", "Cartography"] }, { sem: 2, subjects: ["Urban Geography", "Agricultural Geography", "Political Geography", "GIS and Remote Sensing", "Research Methods"] }, { sem: 3, subjects: ["Environmental Geography", "Regional Planning", "Hydrology", "Field Work Report", "Dissertation I"] }, { sem: 4, subjects: ["Dissertation II", "Viva Voce", "Seminar"] }] },
  { department: "life-sciences", program: "M.Sc. Life Sciences", semesters: [{ sem: 1, subjects: ["Cell Biology", "Genetics", "Biochemistry", "Ecology", "Microbiology"] }, { sem: 2, subjects: ["Molecular Biology", "Plant Physiology", "Animal Physiology", "Evolution", "Biostatistics"] }, { sem: 3, subjects: ["Biotechnology", "Environmental Science", "Immunology", "Research Methodology", "Elective"] }, { sem: 4, subjects: ["Dissertation", "Viva", "Seminar"] }] },
  { department: "biotechnology", program: "M.Sc. Biotechnology", semesters: [{ sem: 1, subjects: ["Cell Biology", "Genetics", "Biochemistry", "Microbiology", "Molecular Biology"] }, { sem: 2, subjects: ["Genetic Engineering", "Protein Technology", "Immunotechnology", "Plant Biotechnology", "Bioinformatics"] }, { sem: 3, subjects: ["Animal Biotechnology", "Industrial Biotechnology", "Environmental Biotechnology", "Nanotechnology", "Research Methodology"] }, { sem: 4, subjects: ["Thesis/Dissertation", "Viva Voce", "Seminar"] }] },
  { department: "environmental-sciences", program: "M.Sc. Environmental Science", semesters: [{ sem: 1, subjects: ["Environmental Chemistry", "Ecology", "Environmental Biology", "Geology", "Statistics"] }, { sem: 2, subjects: ["Environmental Microbiology", "Pollution Control", "Environmental Impact Assessment", "Remote Sensing", "GIS"] }, { sem: 3, subjects: ["Climate Change", "Waste Management", "Environmental Laws", "Sustainable Development", "Field Work"] }, { sem: 4, subjects: ["Dissertation", "Viva Voce", "Seminar"] }] },
  { department: "history-archaeology", program: "M.A. History", semesters: [{ sem: 1, subjects: ["Ancient India", "Medieval India", "History of Bihar", "Historiography", "Research Methods"] }, { sem: 2, subjects: ["Modern India", "World History", "Archaeological Methods", "Cultural Heritage", "Museology"] }, { sem: 3, subjects: ["Contemporary India", "History of Science", "Art and Architecture", "Dissertation I", "Elective"] }, { sem: 4, subjects: ["Dissertation II", "Viva Voce", "Seminar"] }] },
  { department: "economics", program: "M.A. Economics", semesters: [{ sem: 1, subjects: ["Microeconomics I", "Macroeconomics I", "Statistics for Economics", "Mathematical Economics", "Indian Economy"] }, { sem: 2, subjects: ["Microeconomics II", "Macroeconomics II", "Econometrics", "Public Economics", "International Economics"] }, { sem: 3, subjects: ["Development Economics", "Environmental Economics", "Financial Economics", "Research Methodology", "Elective"] }, { sem: 4, subjects: ["Dissertation", "Viva Voce", "Seminar"] }] },
  { department: "political-studies", program: "M.A. Political Science", semesters: [{ sem: 1, subjects: ["Political Theory", "Indian Constitution", "Comparative Politics", "International Relations", "Research Methods"] }, { sem: 2, subjects: ["Western Political Thought", "Indian Political Thought", "Public Administration", "Public Policy", "Elective"] }, { sem: 3, subjects: ["Contemporary Political Theory", "Human Rights", "Federalism", "Dissertation I", "Elective"] }, { sem: 4, subjects: ["Dissertation II", "Viva Voce", "Seminar"] }] },
  { department: "sociology", program: "M.A. Sociology", semesters: [{ sem: 1, subjects: ["Sociological Theory I", "Methods of Social Research", "Indian Society", "Rural Sociology", "Urban Sociology"] }, { sem: 2, subjects: ["Sociological Theory II", "Social Statistics", "Sociology of Development", "Criminology", "Elective"] }, { sem: 3, subjects: ["Contemporary Sociological Thought", "Gender Studies", "Social Anthropology", "Dissertation I", "Field Work"] }, { sem: 4, subjects: ["Dissertation II", "Viva Voce", "Seminar"] }] },
  { department: "library-science", program: "M.Lib.I.Sc.", semesters: [{ sem: 1, subjects: ["Information Sources", "Information Organization", "Library Management", "Information Technology", "Communication"] }, { sem: 2, subjects: ["Cataloguing", "Classification", "Digital Libraries", "Research Methods", "Academic Library System"] }, { sem: 3, subjects: ["Information Retrieval", "Bibliometrics", "E-Resources", "Project", "Elective"] }, { sem: 4, subjects: ["Dissertation", "Viva Voce", "Practical"] }] },
  { department: "chemistry", program: "M.Sc. Chemistry", semesters: [{ sem: 1, subjects: ["Inorganic Chemistry I", "Organic Chemistry I", "Physical Chemistry I", "Mathematics for Chemists", "Lab Course I"] }, { sem: 2, subjects: ["Inorganic Chemistry II", "Organic Chemistry II", "Physical Chemistry II", "Spectroscopy", "Lab Course II"] }, { sem: 3, subjects: ["Advanced Organic Chemistry", "Quantum Chemistry", "Instrumental Methods", "Environmental Chemistry", "Lab Course III"] }, { sem: 4, subjects: ["Dissertation", "Viva Voce", "Seminar"] }] },
  { department: "physics", program: "M.Sc. Physics", semesters: [{ sem: 1, subjects: ["Mathematical Physics I", "Classical Mechanics", "Electrodynamics", "Quantum Mechanics I", "Lab Course I"] }, { sem: 2, subjects: ["Mathematical Physics II", "Quantum Mechanics II", "Statistical Mechanics", "Solid State Physics", "Lab Course II"] }, { sem: 3, subjects: ["Nuclear Physics", "Electronics", "Elective I", "Elective II", "Lab Course III"] }, { sem: 4, subjects: ["Project/Dissertation", "Viva Voce", "Seminar"] }] },
  { department: "mathematics", program: "M.Sc. Mathematics", semesters: [{ sem: 1, subjects: ["Real Analysis", "Linear Algebra", "Abstract Algebra", "Differential Equations", "Topology"] }, { sem: 2, subjects: ["Complex Analysis", "Functional Analysis", "Measure Theory", "Number Theory", "Elective"] }, { sem: 3, subjects: ["Differential Geometry", "Mathematical Methods", "Fluid Mechanics", "Dissertation I", "Elective"] }, { sem: 4, subjects: ["Dissertation II", "Viva Voce", "Seminar"] }] },
  { department: "statistics", program: "M.Sc. Statistics", semesters: [{ sem: 1, subjects: ["Probability Theory", "Statistical Inference I", "Linear Models", "Sampling Theory", "Real Analysis"] }, { sem: 2, subjects: ["Statistical Inference II", "Stochastic Processes", "Multivariate Analysis", "Design of Experiments", "Elective"] }, { sem: 3, subjects: ["Time Series Analysis", "Bayesian Inference", "Survival Analysis", "Statistical Computing", "Dissertation I"] }, { sem: 4, subjects: ["Dissertation II", "Viva Voce", "Seminar"] }] },
  { department: "computer-science", program: "M.Sc. Computer Science", link: "https://www.cusb.ac.in/images/dept/computer_science/Syllabus/Msc_cs_syllabus.pdf", semesters: [{ sem: 1, subjects: ["Data Structures", "Algorithms", "Operating Systems", "Discrete Mathematics", "Programming Lab"] }, { sem: 2, subjects: ["Database Management", "Computer Networks", "Software Engineering", "Theory of Computation", "Web Technologies"] }, { sem: 3, subjects: ["Machine Learning", "Artificial Intelligence", "Cloud Computing", "Cyber Security", "Elective"] }, { sem: 4, subjects: ["Project/Dissertation", "Viva Voce", "Seminar"] }] },
  { department: "teacher-education", program: "M.Ed.", semesters: [{ sem: 1, subjects: ["Philosophical Foundations", "Psychological Foundations", "Sociological Foundations", "Education and Society", "Contemporary Issues"] }, { sem: 2, subjects: ["Pedagogy", "Educational Technology", "Measurement and Evaluation", "Research Methods", "ICT in Education"] }, { sem: 3, subjects: ["Curriculum Development", "Educational Management", "Inclusive Education", "Action Research", "Internship"] }, { sem: 4, subjects: ["Dissertation", "Viva Voce", "Seminar"] }] },
  { department: "physical-education", program: "M.P.Ed.", semesters: [{ sem: 1, subjects: ["Research Methods", "Physiology of Exercise", "Sports Psychology", "Sports Biomechanics", "Sports Sociology"] }, { sem: 2, subjects: ["Sports Training", "Sports Medicine", "Computer Applications", "Yoga and Naturopathy", "Health Education"] }, { sem: 3, subjects: ["Sports Technology", "Measurement and Evaluation", "Practical", "Dissertation I", "Teaching Practice"] }, { sem: 4, subjects: ["Dissertation II", "Viva Voce", "Practical"] }] },
  { department: "english", program: "M.A. English", semesters: [{ sem: 1, subjects: ["British Literature I", "American Literature", "Indian Writing in English", "Linguistics", "Critical Theory I"] }, { sem: 2, subjects: ["British Literature II", "Postcolonial Literature", "Women's Writing", "Literary Criticism", "Critical Theory II"] }, { sem: 3, subjects: ["Contemporary Literature", "World Literature", "Translation Studies", "Dissertation I", "Elective"] }, { sem: 4, subjects: ["Dissertation II", "Viva Voce", "Seminar"] }] },
  { department: "indian-languages", program: "M.A. Hindi", semesters: [{ sem: 1, subjects: ["Hindi Sahitya ka Itihas I", "Sahitya Sanrachana", "Bharatiya Kavya", "Madhyakalin Kavya", "Anuvaad"] }, { sem: 2, subjects: ["Hindi Sahitya ka Itihas II", "Pratinidhi Kavya", "Upanyas", "Natak", "Hindi Bhasha"] }, { sem: 3, subjects: ["Samakaleen Kavya", "Kathakala", "Prakriya", "Dissertation I", "Elective"] }, { sem: 4, subjects: ["Dissertation II", "Viva Voce", "Seminar"] }] },
  { department: "mass-communication", program: "M.A. Mass Communication", semesters: [{ sem: 1, subjects: ["Introduction to Mass Communication", "Journalism", "Media Ethics", "Media Laws", "Communication Theory"] }, { sem: 2, subjects: ["Broadcast Journalism", "Print Journalism", "Digital Media", "Public Relations", "Advertising"] }, { sem: 3, subjects: ["Film Studies", "Media Research", "Development Communication", "Dissertation I", "Practical"] }, { sem: 4, subjects: ["Dissertation II", "Viva Voce", "Internship"] }] },
  { department: "commerce", program: "M.Com.", semesters: [{ sem: 1, subjects: ["Managerial Economics", "Accounting for Managers", "Business Statistics", "Organizational Behavior", "Marketing Management"] }, { sem: 2, subjects: ["Financial Management", "Human Resource Management", "International Business", "Research Methodology", "Elective I"] }, { sem: 3, subjects: ["Strategic Management", "E-Commerce", "Taxation", "Dissertation I", "Elective II"] }, { sem: 4, subjects: ["Dissertation II", "Viva Voce", "Seminar"] }] },
  { department: "psychology", program: "M.A. Psychology", semesters: [{ sem: 1, subjects: ["Cognitive Psychology", "Psychology of Individual Differences", "Research Methods", "Physiological Psychology", "Statistics"] }, { sem: 2, subjects: ["Social Psychology", "Clinical Psychology", "Counseling Psychology", "Psychometrics", "Elective"] }, { sem: 3, subjects: ["Organizational Psychology", "Health Psychology", "Neuropsychology", "Dissertation I", "Practical"] }, { sem: 4, subjects: ["Dissertation II", "Viva Voce", "Internship"] }] },
  { department: "law", program: "LL.M.", semesters: [{ sem: 1, subjects: ["Constitutional Law I", "Jurisprudence I", "International Law I", "Legal Research Methods", "Law and Social Transformation"] }, { sem: 2, subjects: ["Constitutional Law II", "Jurisprudence II", "International Law II", "Human Rights Law", "Elective"] }, { sem: 3, subjects: ["Administrative Law", "Environmental Law", "Company Law", "Dissertation I", "Seminar"] }, { sem: 4, subjects: ["Dissertation II", "Viva Voce", "Teaching Practice"] }] },
  { department: "pharmacy", program: "M.Pharm.", semesters: [{ sem: 1, subjects: ["Advanced Pharmacology I", "Pharmaceutical Chemistry I", "Pharmacognosy I", "Pharmaceutics I", "Research Methodology"] }, { sem: 2, subjects: ["Advanced Pharmacology II", "Pharmaceutical Chemistry II", "Pharmacognosy II", "Pharmaceutics II", "Elective"] }, { sem: 3, subjects: ["Clinical Pharmacy", "Biopharmaceutics", "Drug Regulatory Affairs", "Dissertation I", "Seminars"] }, { sem: 4, subjects: ["Dissertation II", "Viva Voce", "Publications"] }] },
  { department: "agriculture", program: "M.Sc. Agriculture", semesters: [{ sem: 1, subjects: ["Agronomy I", "Soil Science", "Agricultural Economics", "Plant Physiology", "Statistics"] }, { sem: 2, subjects: ["Agronomy II", "Entomology", "Plant Pathology", "Horticulture", "Genetics"] }, { sem: 3, subjects: ["Crop Production", "Agroforestry", "Sustainable Agriculture", "Dissertation I", "Field Work"] }, { sem: 4, subjects: ["Dissertation II", "Viva Voce", "Seminar"] }] }
];

const newsData = [
  { title: "CUSB Launches New PhD Programs in AI and Data Science", content: "Central University of South Bihar announces new doctoral programs.", date: "22 Mar 2026", type: "Announcement", image: "https://picsum.photos/seed/news1/1200/700" },
  { title: "CUSB Ranked Among Top 50 Universities in NIRF 2026", content: "University achieves significant rank improvement.", date: "18 Mar 2026", type: "Achievement", image: "https://picsum.photos/seed/news2/1200/700" },
  { title: "International Conference on Sustainable Development at CUSB", content: "CUSB hosts international conference with participants from 15 countries.", date: "10 Mar 2026", type: "Event", image: "https://picsum.photos/seed/news3/1200/700" },
  { title: "CUSB Students Win National Innovation Challenge 2026", content: "Team wins first prize in National Innovation Challenge.", date: "5 Mar 2026", type: "Achievement", image: "https://picsum.photos/seed/news4/1200/700" },
  { title: "New Research Center for Climate Change inaugurated at CUSB", content: "Honorable Vice Chancellor inaugurates new research center.", date: "1 Mar 2026", type: "Press Release", image: "https://picsum.photos/seed/news5/1200/700" }
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
  console.log("Starting comprehensive database seeding...");
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

    for (const news of newsData) { await addDoc(collection(db, 'news'), news); }
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
