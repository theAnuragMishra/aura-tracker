import express from "express";
import { sendReminder } from "./events.controller";

const router = express.Router();

router.post("/sendReminder", sendReminder);

export default router;
