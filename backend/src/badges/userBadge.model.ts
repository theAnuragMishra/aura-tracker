import mongoose from "mongoose";

const userBadgeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  assignedBadges: [
    {
      badgeId: { type: String, required: true },
      assignedDate: { type: Date, default: Date.now },
    }
  ],
});

module.exports = mongoose.model("UserBadge", userBadgeSchema);
