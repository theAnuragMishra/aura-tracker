import express, { Request, Response } from "express";
import {
  AddItem,
  approveItemFind,
  claimItemFind,
  getItems,
} from "./lnf.controller";
import { verifyUserToken } from "../middleware/verifyUserToken";

const router = express.Router();

router.post("/items/add", verifyUserToken, AddItem);
router.post("/items/claim", verifyUserToken, claimItemFind);
router.get("/items", verifyUserToken, getItems);
router.post("/items/approve", verifyUserToken, approveItemFind);

export default router;
