import mongoose from "mongoose";

const syllabusSchema = new mongoose.Schema({
  department: String,
  program: String,
  link: String,
  semesters: [{
    sem: Number,
    subjects: [String]
  }]
}, { timestamps: true });

export default mongoose.model("Syllabus", syllabusSchema);
