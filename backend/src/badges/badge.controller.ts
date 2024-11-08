import { Request, Response } from "express";
import { Badge } from "./badge.model";

export const createBadge = async (req: Request, res: Response): Promise<void> => {
  try {
    const { badgeId, title, year, imageUrl, criteria } = req.body;
    const newBadge = new Badge({ badgeId, title, year, imageUrl, criteria });
    await newBadge.save();
    res.status(201).json(newBadge);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getBadges = async (req: Request, res: Response): Promise<void> => {
  try {
    const badges = await Badge.find();
    res.status(200).json(badges);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
