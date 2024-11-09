import express, { Request, Response } from "express";
import { createItem,  getItems } from "./lnf.controller";

const router = express.Router();

router.post("/add", (req: Request, res: Response) => createItem(req, res));  
router.get("/", (req: Request, res: Response) => getItems(req, res));            

export default router;
