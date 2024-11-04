"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Rewarder = () => {
  const rewardData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Rewards Collected",
        data: [20, 15, 30, 25, 40, 35, 50, 45, 55, 60, 50, 70],
        backgroundColor: "#4CAF50",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex">
      <aside className="w-1/5 bg-gray-800 p-4 space-y-4">
        <div className="text-center">
          <h2 className="mt-2">Admin Name</h2>
          <p className="text-sm text-gray-400"></p>
        </div>
        <nav className="space-y-2 mt-2">
          <a href="/Rewarder/View" className="flex items-center text-gray-200 hover:text-white">
            <span className="material-icons mr-10"></span> View
          </a>
          <a href="/Rewarder/Coupons" className="flex items-center text-gray-200 hover:text-white">
            <span className="material-icons mr-10"></span> Create Coupons
          </a>
          <a href="#" className="flex items-center text-gray-200 hover:text-white">
            <span className="material-icons mr-10"></span> History
          </a>
        </nav>
      </aside>

      <main className="w-4/5 p-6 space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">DASHBOARD</h1>
          <button className="bg-purple-600 px-4 py-2 rounded text-white">Logout</button>
        </header>

        {/* <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded text-center">
            <p>Previous Coupons</p>
          </div>
          <div className="bg-gray-800 p-4 rounded text-center">
            <p>Coupon 1</p>
          </div>
          <div className="bg-gray-800 p-4 rounded text-center">
            <p>Coupon 2</p>
          </div>
          <div className="bg-gray-800 p-4 rounded text-center">
            <p>Coupon 3</p>
          </div>
        </div> */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded text-center">
            <p>Coupon Created</p>
            <h2 className="text-2xl font-bold">12,361</h2>
          </div>
          <div className="bg-gray-800 p-4 rounded text-center">
            <p>Coupon Claimed</p>
            <h2 className="text-2xl font-bold">431,225</h2>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-center">Rewards Collected Data</h2>
          <Bar data={rewardData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
      </main>
    </div>
  );
};

export default Rewarder;
