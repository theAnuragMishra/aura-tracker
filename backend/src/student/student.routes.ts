import express from "express";
import { verifyUserToken } from "../middleware/verifyUserToken";
import {
  getStudentAttendance,
  getStudentCourses,
  getStudentModules,
} from "./student.controller";

const router = express.Router();

router.get("/courses", verifyUserToken, getStudentCourses);
router.get("/attendance", verifyUserToken, getStudentAttendance);
router.get("/modules", verifyUserToken, getStudentModules);

export default router;
