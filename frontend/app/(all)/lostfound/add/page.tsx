"use client"
import { useState } from 'react';

export default function AddItemPage() {
  const [itemName, setItemName] = useState('');
  const [owner, setOwner] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    const newItem = {
      itemName,
      owner,
      imageURL, 
    };

    await fetch('http://localhost:5173/api/items/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });

    setItemName('');
    setOwner('');
    setImageURL('');
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
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="Your Name"
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
        <button type="submit" className="w-full p-2 bg-purple-600 rounded hover:bg-purple-700">
          Add Item
        </button>
      </form>
    </div>
  );
}
