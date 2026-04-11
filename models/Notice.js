import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  category: String,
  link: String
}, { timestamps: true });

export default mongoose.model("Notice", noticeSchema);
