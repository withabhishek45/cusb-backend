import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  category: {
    type: String,
    enum: ["Academic", "Examination", "Fee", "Hostel", "Workshop", "Scholarship", "Event", "General"],
    default: "General"
  },
  description: String,
  date: String,
  link: String,
  isImportant: { 
    type: Boolean, 
    default: false 
  },
  isActive: {
    type: Boolean,
    default: true
  },
  expiryDate: Date
}, { timestamps: true });

noticeSchema.index({ title: 1 });
noticeSchema.index({ category: 1 });

export default mongoose.model("Notice", noticeSchema);
