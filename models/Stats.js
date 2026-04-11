import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  students: Number,
  staff: Number,
  courses: Number,
  projects: Number,
  publications: Number,
  collaborations: Number
}, { timestamps: true });

export default mongoose.model("Stats", statsSchema);
