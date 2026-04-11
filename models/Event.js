import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  subtitle: String,
  description: String,
  date: { 
    type: String, 
    required: true 
  },
  location: String,
  image: String,
  type: { 
    type: String, 
    enum: ["recent", "upcoming"], 
    default: "upcoming" 
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

eventSchema.index({ title: 1 });
eventSchema.index({ type: 1 });

export default mongoose.model("Event", eventSchema);
