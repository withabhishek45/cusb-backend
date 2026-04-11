import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true 
  },
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  shortName: { 
    type: String, 
    trim: true 
  },
  description: { 
    type: String, 
    trim: true 
  },
  programs: [String],
  established: Number,
  hod: { 
    type: String, 
    trim: true 
  },
  email: {
    type: String,
    trim: true
  },
  phone: String,
  vision: String,
  mission: String,
  objectives: [String],
  facilities: [String],
  images: [String],
  studentCount: { type: Number, default: 0 },
  placementRate: { type: Number, default: 0 },
  researchPapers: { type: Number, default: 0 },
  fundedProjects: { type: Number, default: 0 },
  researchGrants: { type: Number, default: 0 },
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
  }],
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

departmentSchema.index({ name: 1 });

export default mongoose.model("Department", departmentSchema);
