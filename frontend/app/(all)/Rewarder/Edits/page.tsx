"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const View = () => {
  const router = useRouter();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null); 
  const [editData, setEditData] = useState({
    code: "",
    auraPointsRequired: "",
    benefit: "",
    expiryDate: ""
  });

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

  const handleEditClick = (coupon) => {
    setEditId(coupon._id); 
    setEditData({
      code: coupon.code,
      auraPointsRequired: coupon.auraPointsRequired,
      benefit: coupon.benefit,
      expiryDate: new Date(coupon.expiryDate).toISOString().split("T")[0] 
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5173/api/rewards/edit/${editId}`, editData);
      alert("Coupon updated successfully");
      
      setCoupons(coupons.map(coupon => 
        coupon._id === editId ? { ...coupon, ...editData } : coupon
      ));

      setEditId(null); 
    } catch (error) {
      console.error("Error updating coupon:", error);
      alert("Failed to update coupon. Please try again.");
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
            {editId === coupon._id ? (
              <div>
                <input
                  type="text"
                  name="code"
                  value={editData.code}
                  onChange={handleInputChange}
                  placeholder="Code"
                  className="mb-2 p-2 rounded bg-gray-700 text-white"
                />
                <input
                  type="number"
                  name="auraPointsRequired"
                  value={editData.auraPointsRequired}
                  onChange={handleInputChange}
                  placeholder="Points Required"
                  className="mb-2 p-2 rounded bg-gray-700 text-white"
                />
                <input
                  type="text"
                  name="benefit"
                  value={editData.benefit}
                  onChange={handleInputChange}
                  placeholder="Benefit"
                  className="mb-2 p-2 rounded bg-gray-700 text-white"
                />
                <input
                  type="date"
                  name="expiryDate"
                  value={editData.expiryDate}
                  onChange={handleInputChange}
                  className="mb-2 p-2 rounded bg-gray-700 text-white"
                />
                <button
                  onClick={handleUpdate}
                  className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition duration-200 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditId(null)} 
                  className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-600 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <p className="text-lg">{coupon.code}</p>
                <p>Points Required: {coupon.auraPointsRequired}</p>
                <p>Benefit: {coupon.benefit}</p>
                <p>Expiry Date: {new Date(coupon.expiryDate).toLocaleDateString()}</p>
                <div className="mt-3 flex justify-center gap-2">
                  <button
                    onClick={() => handleEditClick(coupon)}
                    className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition duration-200"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default View;
