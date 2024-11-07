import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
  badgeId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  year: { type: String },
  imageUrl: { type: String, required: true },
  criteria: { type: String },
});

export const Badge = mongoose.model("Badge", badgeSchema);
