"use client";

import { FaMessage } from "react-icons/fa6";

export default function StartChat({
  handleClick,
}: {
  handleClick: () => void;
}) {
  return (
    <div>
      <button
        onClick={handleClick}
        className="flex items-center justify-center gap-2 border-2 rounded-lg px-3 py-1"
      >
        Talk <FaMessage />
      </button>
    </div>
  );
}
