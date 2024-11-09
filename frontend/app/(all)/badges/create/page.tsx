"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBadge() {
  const router = useRouter();
  const [badgeData, setBadgeData] = useState({
    badgeId: "",
    title: "",
    year: "",
    imageUrl: "",
    criteria: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBadgeData({
      ...badgeData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5173/api/badges/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(badgeData),
    });
    console.log(response);

    if (response.ok) {
      alert("Badge created successfully!");
      setBadgeData({
        badgeId: "",
        title: "",
        year: "",
        imageUrl: "",
        criteria: "",
      });
    } else {
      alert("Failed to create badge.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <button
          onClick={() => router.back()}
          className="absolute  bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-00 transition duration-200"
        >
          Back
        </button>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create a New Badge
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="badgeId" className="block text-gray-700">
              Badge ID:
            </label>
            <input
              type="text"
              id="badgeId"
              name="badgeId"
              value={badgeData.badgeId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md  text-black"
              required
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-gray-700">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={badgeData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md  text-black"
              required
            />
          </div>

          <div>
            <label htmlFor="year" className="block text-gray-700">
              Year:
            </label>
            <input
              type="text"
              id="year"
              name="year"
              value={badgeData.year}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md  text-black"
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-gray-700">
              Image URL:
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={badgeData.imageUrl}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md  text-black"
              required
            />
          </div>

          <div>
            <label htmlFor="criteria" className="block text-gray-700">
              Criteria:
            </label>
            <textarea
              id="criteria"
              name="criteria"
              value={badgeData.criteria}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md  text-black"
              rows="4"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-md"
            >
              Create Badge
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
