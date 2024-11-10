"use client";

import { toggleFindClaim } from "@/lib/lnfActions";
import Image from "next/image";

export default function Item({ item, username }: any) {
  const handleClick = async (id: number) => {
    await toggleFindClaim(id, username);
  };

  return (
    <li className="p-4 border rounded border-gray-950 bg-gray-800 flex flex-col items-center space-y-4">
      <Image
        src={item.imageURL}
        alt={item.itemName}
        width={100}
        height={100}
        className="object-cover rounded mb-2"
      />
      <div className="flex flex-col items-center">
        <p>Item: {item.itemName}</p>
        <p>Owner: {item.owner}</p>
        <p className="text-red-700">Status: {item.found ? "Found" : "Lost"}</p>
      </div>
      {!item.found && !item.owner === username && (
        <button
          className="mt-2 p-2 bg-green-600 rounded hover:bg-green-500"
          onClick={() => handleClick(item._id)}
        >
          {item.findClaims.includes(username) ? "Revoke claim" : "I found it!"}
        </button>
      )}
    </li>
  );
}
