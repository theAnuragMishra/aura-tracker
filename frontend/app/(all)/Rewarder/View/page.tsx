"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const View = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response=await fetch('http://localhost:5173/api/rewards');
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const fetchedCoupons = await response.json();
        setCoupons(fetchedCoupons);

      } catch (err) {
        //setError("Failed to fetch coupons");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <header className="mb-5  text-center mt-3 ">
        <h1 className="text-2xl font-semibold">All Created Coupons</h1>
      </header>

      <div className="grid grid-cols-3 gap-4">
        {coupons.map((coupon, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded text-center">
            <p className="text-lg ">{coupon.code}</p>
            <p>Points Required: {coupon.auraPointsRequired}</p>
            <p>Benefit: {coupon.benefit}</p>
            <p>Expiry Date:  {new Date(coupon.expiryDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default View;
