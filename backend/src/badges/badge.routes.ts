import express, { Request, Response } from "express";
import { createBadge, getBadges } from "./badge.controller";

const router = express.Router();

router.post("/create", (req: Request, res: Response) => createBadge(req, res));  
router.get("/", (req: Request, res: Response) => getBadges(req, res));            

export default router;
