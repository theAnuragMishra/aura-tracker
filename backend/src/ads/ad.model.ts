import mongoose from "mongoose";

const adSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    required: false,
  },
});

const Ad = mongoose.model("Ad", adSchema);

export default Ad;
