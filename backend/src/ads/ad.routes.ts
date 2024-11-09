import express, { Router, Request, Response } from "express";
import Ad from "./ad.model";

const router = Router();

// Fetch an ad (GET request)
router.get("/ad", async (req: Request, res: Response): Promise<any> => {
  try {
    const ad = await Ad.aggregate([{ $sample: { size: 1 } }]); // Get a random ad
    if (ad.length === 0)
      return res.status(404).json({ message: "No ads available" });
    res.json(ad[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new ad (POST request)
router.post("/ad", async (req: Request, res: Response): Promise<any> => {
  try {
    const { imageUrl, altText } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    const newAd = new Ad({
      imageUrl,
      altText,
    });

    await newAd.save();
    res.status(201).json({ message: "Ad added successfully", ad: newAd });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add ad" });
  }
});

export default router;
