import express, { Request, Response } from "express";
import { AddItem, claimItemFind, getItems } from "./lnf.controller";
import { verifyUserToken } from "../middleware/verifyUserToken";

const router = express.Router();

router.post("/items/add", verifyUserToken, AddItem);
router.post("/items/claim", verifyUserToken, claimItemFind);
router.get("/items", verifyUserToken, getItems);

export default router;
