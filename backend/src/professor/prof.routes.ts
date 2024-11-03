import express from "express"
import { getAttendanceDates, getAttendanceForDate, updateAttendance } from "./prof.controller";
import { verifyUserToken } from "../middleware/verifyUserToken";

const router = express.Router();

router.get("/attendance/dates", verifyUserToken, getAttendanceDates);
router.get("/attendance/", verifyUserToken, getAttendanceForDate);
router.post("/attendance/update", verifyUserToken, updateAttendance);

export default router;
