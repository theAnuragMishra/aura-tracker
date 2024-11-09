import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  owner: { type: String, required: true },
  description: { type: String },
  found: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
  imageURL: { type: String, required: true },
  findClaims: [{ type: String }],
});

export const Item = mongoose.model("Item", itemSchema);
