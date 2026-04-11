import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  students: { type: Number, default: 0, min: 0 },
  staff: { type: Number, default: 0, min: 0 },
  courses: { type: Number, default: 0, min: 0 },
  projects: { type: Number, default: 0, min: 0 },
  publications: { type: Number, default: 0, min: 0 },
  collaborations: { type: Number, default: 0, min: 0 }
}, { timestamps: true });

export default mongoose.model("Stats", statsSchema);
