import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  owner: { type: String, required: true },
  lost: { type: Boolean, default: true },
  found: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
  imageURL: { type: String, required: true }, 
});

export const Item= mongoose.model('Item', itemSchema);
