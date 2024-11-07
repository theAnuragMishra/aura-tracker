import express from "express"
import { getCourses, getAttendanceForDate, updateAttendance, getDates } from "./prof.controller";
import { verifyUserToken } from "../middleware/verifyUserToken";

const router = express.Router();

router.get("/attendance/courses", verifyUserToken, getCourses);
router.get("/attendance/dates", verifyUserToken, getDates);
router.get("/attendance/", verifyUserToken, getAttendanceForDate);
router.post("/attendance/update", verifyUserToken, updateAttendance);

export default router;
