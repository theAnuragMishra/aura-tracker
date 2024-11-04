import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  auraPointsRequired: {
    type: Number,
    required: true,
  },
  benefit: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  claimed: {
    type: Boolean,
    default: false,
  },
});

export const Coupon = mongoose.model("Coupon", couponSchema);
