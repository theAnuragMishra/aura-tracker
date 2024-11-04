import express from "express";
import { messageModel } from "./message.model";

const router = express.Router();

router.get("/:room", async (req, res) => {
  try {
    const messages = await messageModel.find({ room: req.params.room });
    res.json(messages);
  } catch (error) {
    if (error instanceof Error) res.status(500).send(error.message);
  }
});

export default router;
