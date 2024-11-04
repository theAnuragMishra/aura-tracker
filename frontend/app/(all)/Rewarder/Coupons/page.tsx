"use client";
import React, { useState } from 'react';
import axios from 'axios';

const Coupons = () => {
  const [coupon, setCoupon] = useState({
    code: '',
    auraPointsRequired: '',
    benefit: '',
    expiryDate: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setCoupon({ ...coupon, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
        console.log(coupon);
        const response = await axios.post('http://localhost:5173/coupons', coupon);
        console.log(response);
        alert(`Coupon created: ${response.data.code}`);
        setCoupon({
            code: '',
            auraPointsRequired: '',
            benefit: '',
            expiryDate: '',
        });
    } catch (error) {
        console.error('Error creating coupon:', error);
        alert('Error creating coupon. Please try again.');
    }
};

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Create Coupon</h2>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block mb-1">Coupon Code</label>
            <input
              type="text"
              name="code"
              value={coupon.code}
              onChange={handleChange}
              className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Aura Points Required</label>
            <input
              type="number"
              name="auraPointsRequired"
              value={coupon.auraPointsRequired}
              onChange={handleChange}
              className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Benefit</label>
            <input
              type="text"
              name="benefit"
              value={coupon.benefit}
              onChange={handleChange}
              className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={coupon.expiryDate}
              onChange={handleChange}
              className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-200"
          >
            Create Coupon
          </button>
        </div>
      </form>
    </div>
  );
};

export default Coupons;
