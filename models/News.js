import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: String,
  type: String,
  image: String
}, { timestamps: true });

export default mongoose.model("News", newsSchema);
