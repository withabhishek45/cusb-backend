import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  date: String,
  image: String,
  type: String
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
