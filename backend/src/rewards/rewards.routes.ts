import express from "express";
import { Coupon } from "./coupons.model";

const router = express.Router();

router.post("/", async (req: any, res: any) => {
  const { code, auraPointsRequired, benefit, expiryDate } = req.body;

  try {
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

    const newCoupon = new Coupon({
      code,
      auraPointsRequired,
      benefit,
      expiryDate,
    });
    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating coupon" });
  }
});

router.put("/claim/:code", async (req: any, res: any) => {
  try {
    const coupon = await Coupon.findOneAndUpdate(
      { code: req.params.code, claimed: false },
      { claimed: true },
      { new: true }
    );

    if (!coupon) {
      return res
        .status(404)
        .json({ message: "Coupon not found or already claimed" });
    }

    res.status(200).json(coupon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error claiming coupon" });
  }
});

router.get("/", async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching coupons" });
  }
});

router.put("/edit/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedCoupon = await Coupon.findOneAndUpdate(
      { _id: id },
      updatedData,
      { new: true }
    );

    if (!updatedCoupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    res.json({ message: "Coupon updated successfully", coupon: updatedCoupon });
  } catch (error) {
    console.error("Error updating coupon:", error);

    if (error) {
      return res.status(400).json({ error: "Invalid coupon ID" });
    }

    res.status(500).json({ error: "Failed to update coupon" });
  }
});

router.delete("/delete/:id", async (req: any, res: any) => {
  try {
    const deletedCoupon = await Coupon.findOneAndDelete({ _id: req.params });

    if (!deletedCoupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }
    res.json({ message: "Coupon deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete coupon" });
  }
});

export default router;
