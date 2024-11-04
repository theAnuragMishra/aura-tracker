const express = require('express');
const Coupon = require('../models/coupons.model');

const router = express.Router();

router.post('/', async (req, res) => {
    const { code, auraPointsRequired, benefit, expiryDate } = req.body;

    try {
        const existingCoupon = await Coupon.findOne({ code });
        if (existingCoupon) {
            return res.status(400).json({ message: 'Coupon code already exists' });
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
        res.status(500).json({ message: 'Error creating coupon' });
    }
});


router.put('/claim/:code', async (req, res) => {
  try {
    const coupon = await Coupon.findOneAndUpdate(
      { code: req.params.code, claimed: false },
      { claimed: true },
      { new: true }
    );

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found or already claimed' });
    }

    res.status(200).json(coupon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error claiming coupon' });
  }
});

router.get('/', async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json(coupons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching coupons' });
    }
});

module.exports = router;
