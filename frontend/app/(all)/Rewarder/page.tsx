// "use client";
// import React, { useState } from "react";
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";
// // import { Bar } from "react-chartjs-2";

// // ChartJS.register(
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   Title,
// //   Tooltip,
// //   Legend
// // );

// const Rewarder = () => {
//   const currentWeekCouponsCreated = [5, 10, 15, 20, 8, 12, 18];

//   const rewardData = {
//     labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//     datasets: [
//       {
//         label: "Rewards Collected",
//         data: [20, 15, 30, 25, 40, 35, 50, 45, 55, 60, 50, 70],
//         backgroundColor: "#4CAF50",
//       },
//       {
//         label: "Coupons Created This Week",
//         data: currentWeekCouponsCreated,
//         backgroundColor: "#FF9800",
//       },
//     ],
//   };

//   const [checklist, setChecklist] = useState({
//     coupon1: false,
//     coupon2: false,
//     coupon3: false,
//     coupon4: false,
//   });

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setChecklist({ ...checklist, [name]: checked });
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-4 flex">
//       <aside className="w-1/5 bg-gray-800 p-4 space-y-4">
//         <div className="text-center">
//           <h2 className="mt-2 text-xl font-bold">Admin Name</h2>
//           <p className="text-sm text-gray-400"></p>
//         </div>
//         <nav className="space-y-2 mt-2">
//           <a
//             href="/Rewarder/View"
//             className="flex items-center text-gray-200 hover:text-white"
//           >
//             <span className="material-icons mr-2"></span> View Coupons
//           </a>
//           <a
//             href="/Rewarder/Coupons"
//             className="flex items-center text-gray-200 hover:text-white"
//           >
//             <span className="material-icons mr-2"></span> Create Coupons
//           </a>
//           <a
//             href="/Rewarder/Edits"
//             className="flex items-center text-gray-200 hover:text-white"
//           >
//             <span className="material-icons mr-2"></span> Edit Coupons
//           </a>
//           <a
//             href="#"
//             className="flex items-center text-gray-200 hover:text-white"
//           >
//             <span className="material-icons mr-2"></span> History
//           </a>
//         </nav>
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold mb-2">Coupon Checklist</h3>
//           <div className="space-y-2">
//             {Object.keys(checklist).map((coupon, index) => (
//               <label key={index} className="flex items-center text-gray-200">
//                 <input
//                   type="checkbox"
//                   name={coupon}
//                   checked={checklist[coupon]}
//                   onChange={handleCheckboxChange}
//                   className="mr-2 rounded text-purple-600 focus:ring-purple-500"
//                 />
//                 <span>{`Coupon ${index + 1}`}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       </aside>

//       <main className="w-4/5 p-6 space-y-6">
//         <header className="flex justify-between items-center">
//           <h1 className="text-2xl font-semibold">DASHBOARD</h1>
//           <button className="bg-purple-600 px-4 py-2 rounded text-white">
//             Logout
//           </button>
//         </header>

//         <div className="grid grid-cols-4 gap-4">
//           <div className="bg-gray-800 p-4 rounded text-center">
//             <p>Coupon Created</p>
//             <h2 className="text-2xl font-bold">12,361</h2>
//           </div>
//           <div className="bg-gray-800 p-4 rounded text-center">
//             <p>Coupon Claimed</p>
//             <h2 className="text-2xl font-bold">431,225</h2>
//           </div>
//         </div>

//         <div className="bg-gray-800 p-6 rounded-lg">
//           <h2 className="text-lg font-semibold mb-4 text-center">
//             Rewards Collected Data
//           </h2>
//           <Bar
//             data={rewardData}
//             options={{
//               responsive: true,
//               plugins: { legend: { display: true } },
//             }}
//           />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Rewarder;
