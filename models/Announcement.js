import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  subtitle: String,
  message: String,
  date: String,
  priority: { 
    type: String, 
    enum: ["low", "medium", "high"], 
    default: "medium" 
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

announcementSchema.index({ priority: 1 });
announcementSchema.index({ title: 1 });

export default mongoose.model("Announcement", announcementSchema);
