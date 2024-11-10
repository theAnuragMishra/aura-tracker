"use client";

import { approveFindClaim, toggleFindClaim } from "@/lib/lnfActions";
import Image from "next/image";

export default function Item({ item, username }: any) {
  const handleClick = async (id: number) => {
    await toggleFindClaim(id, username);
  };

  const handleClick2 = async (item_id: string, approvee: string) => {
    // console.log(item_id, approvee);
    await approveFindClaim(item_id, approvee);
  };

  return (
    <li className="grid grid-cols-[1fr_1fr_2fr] p-4 border rounded border-gray-950 bg-gray-800   space-y-4">
      <div className="flex flex-col justify-center items-center">
        <Image
          src={item.imageURL}
          alt={item.itemName}
          width={100}
          height={100}
          className="object-cover rounded mb-2"
        />

        <p>Item: {item.itemName}</p>
        <p>Owner: {item.owner}</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <p className="text-xl">
          Lost on: {new Date(item.timestamp).toDateString()}
        </p>
        <p className="text-red-700 text-2xl">
          Status: {item.found ? "Found" : "Lost"}
        </p>

        {!item.found && item.owner !== username && (
          <button
            className="mt-2 w-1/2 p-2 bg-green-600 rounded hover:bg-green-500"
            onClick={() => handleClick(item._id)}
          >
            {item.findClaims.includes(username)
              ? "Revoke claim"
              : "I found it!"}
          </button>
        )}
      </div>
      <div className="flex flex-col justify-center items-center">
        {item.findClaims.map((claim: string) => {
          return item.owner === username ? (
            <button
              key={claim}
              onClick={() => {
                handleClick2(item._id, claim);
              }}
            >
              {claim}
            </button>
          ) : (
            <p key={claim}>{claim}</p>
          );
        })}
      </div>
    </li>
  );
}
