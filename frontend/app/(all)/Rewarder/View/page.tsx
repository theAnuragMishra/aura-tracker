"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const View = () => {
  const router = useRouter();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const { data: fetchedCoupons } = await axios.get('http://localhost:5173/api/rewards');
        setCoupons(fetchedCoupons);
      } catch (err) {
        setError("Failed to fetch coupons");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  // const handleEdit = async (id) => {
  //   try {
  //     await axios.put(`http://localhost:5173/api/rewards/edit/${id}`, {/* data here */});
  //     alert("Coupon updated successfully");
  //   } catch (error) {
  //     console.error("Error updating coupon:", error);
  //     alert("Failed to update coupon. Please try again.");
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5173/api/rewards/delete/${id}`);
      alert("Coupon deleted successfully");
      setCoupons(coupons.filter(coupon => coupon._id !== id));
    } catch (error) {
      console.error("Error deleting coupon:", error);
      alert("Failed to delete coupon. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 relative">
      <button
        onClick={() => router.back()}
        className="absolute top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-200"
      >
        Back
      </button>

      <header className="mb-5 text-center mt-3">
        <h1 className="text-2xl font-semibold">All Created Coupons</h1>
      </header>

      <div className="grid grid-cols-3 gap-4">
        {coupons.map((coupon) => (
          <div key={coupon._id} className="bg-gray-800 p-4 rounded text-center">
            <p className="text-lg">{coupon.code}</p>
            <p>Points Required: {coupon.auraPointsRequired}</p>
            <p>Benefit: {coupon.benefit}</p>
            <p>Expiry Date: {new Date(coupon.expiryDate).toLocaleDateString()}</p>
            <div className="mt-3 flex justify-center gap-2">
              {/* <button
                onClick={() => handleEdit(coupon._id)}
                className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition duration-200"
              >
                Edit
              </button> */}
              <button
                onClick={() => handleDelete(coupon._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default View;
