"use client"; // This is a client component

import { useState } from "react";

export default function AddAdForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageUrl) {
      setError("Image URL is required.");
      return;
    }

    // Prepare data to send
    const adData = {
      imageUrl,
      altText,
    };

    try {
      const response = await fetch("http://localhost:5173/api/ads/ad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adData),
      });

      if (response.ok) {
        setSuccess("Ad added successfully!");
        setImageUrl(""); // Reset the form fields
        setAltText("");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to add ad.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-lg bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4">Add New Ad</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image URL */}
        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Image URL
          </label>
          <input
            id="imageUrl"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Enter the URL of the ad image"
            required
          />
        </div>

        {/* Alt Text */}
        <div>
          <label
            htmlFor="altText"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Alt Text (Optional)
          </label>
          <input
            id="altText"
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Enter alt text for the image"
          />
        </div>

        {/* Error and Success Messages */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition"
        >
          Add Ad
        </button>
      </form>
    </div>
  );
}
