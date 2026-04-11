import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  shortName: String,
  description: String,
  programs: [String],
  established: Number,
  hod: String,
  email: String,
  phone: String,
  vision: String,
  mission: String,
  objectives: [String],
  facilities: [String],
  images: [String],
  studentCount: Number,
  placementRate: Number,
  researchPapers: Number,
  fundedProjects: Number,
  researchGrants: Number,
  faculty: [{
    name: String,
    designation: String,
    email: String,
    phone: String,
    image: String,
    specialization: String,
    qualification: String,
    experience: String,
    publications: Number,
    researchInterests: String,
    awards: String
  }]
}, { timestamps: true });

export default mongoose.model("Department", departmentSchema);
