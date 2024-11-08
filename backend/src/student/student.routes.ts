import express from "express";
import { verifyUserToken } from "../middleware/verifyUserToken";
import {
  evaluate,
  getModuleDetails,
  getStudentAttendance,
  getStudentCourses,
  getStudentModules,
} from "./student.controller";

const router = express.Router();

router.get("/courses", verifyUserToken, getStudentCourses);
router.get("/attendance", verifyUserToken, getStudentAttendance);
router.get("/modules", verifyUserToken, getStudentModules);
router.get("/module", verifyUserToken, getModuleDetails);
router.post("/evaluate", verifyUserToken, evaluate);

export default router;
