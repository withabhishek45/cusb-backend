import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  content: String,
  image: String,
  date: String,
  type: { 
    type: String, 
    enum: ["Announcement", "Achievement", "Event", "General"],
    default: "General" 
  },
  author: String,
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

newsSchema.index({ title: 1 });
newsSchema.index({ type: 1 });

export default mongoose.model("News", newsSchema);
