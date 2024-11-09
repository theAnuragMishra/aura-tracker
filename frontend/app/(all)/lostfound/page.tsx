"use client"
import { useEffect, useState } from 'react';

export default function LostItemsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5173/api/items')
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const markAsFound = async (id) => {
    await fetch(`/api/items/found/${id}`, { method: 'POST' });
    setItems((prevItems) => prevItems.map(item => item.id === id ? { ...item, found: true } : item));
  };

  return (
<div className="bg-gray-900 text-white p-8">
  <h1 className="text-2xl mb-4">Lost Items</h1>
  {items.length === 0 ? (
    <p className="text-gray-400">No items listed</p>
  ) : (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <li
          key={item.id}
          className="p-4 border rounded border-gray-950 bg-gray-800 flex flex-col items-center space-y-4"
        >
          <img
            src={item.imageURL}
            alt={item.itemName}
            className="w-32 h-32 object-cover rounded mb-2"
          />
          <div className="flex flex-col items-center">
            <p>Item: {item.itemName}</p>
            <p>Owner: {item.owner}</p>
            <p className="text-red-700">Status: {item.found ? 'Found' : 'Lost'}</p>
          </div>
          {!item.found && (
            <button
              className="mt-2 p-2 bg-green-600 rounded hover:bg-green-500"
              onClick={() => markAsFound(item.id)}
            >
              I Found It
            </button>
          )}
        </li>
      ))}
    </ul>
  )}
</div>

  );
}
