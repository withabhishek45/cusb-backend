import mongoose from "mongoose";

const syllabusSchema = new mongoose.Schema({
  department: { 
    type: String, 
    required: true,
    trim: true 
  },
  program: { 
    type: String, 
    required: true,
    trim: true 
  },
  semester: { 
    type: Number, 
    required: true,
    min: 1,
    max: 10
  },
  subjects: [{
    name: { type: String, trim: true },
    code: String,
    credits: Number
  }],
  pdfUrl: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

syllabusSchema.index({ department: 1 });
syllabusSchema.index({ program: 1 });
syllabusSchema.index({ semester: 1 });

export default mongoose.model("Syllabus", syllabusSchema);
