"use client";
import { addItem } from "@/lib/lnfActions";
import { useState } from "react";

export default function AddItemPage() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!itemName) return;
    const newItem = {
      itemName,
      description,
      imageURL,
    };

    await addItem(newItem);
  };

  return (
    <div className="bg-gray-900 text-white p-8">
      <h1 className="text-2xl mb-4">Report Lost Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Item Name"
          className="w-full p-2 rounded bg-slate-200 border border-gray-900 text-black"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your item"
          className="w-full p-2 rounded bg-slate-200 border border-gray-900 text-black"
          required
        />
        <input
          type="url"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          placeholder="Image URL"
          className="w-full p-2 rounded bg-slate-200 border border-gray-900 text-black"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-purple-600 rounded hover:bg-purple-700"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
