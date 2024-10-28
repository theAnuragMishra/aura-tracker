import { FC } from "react";
import Link from "next/link";

const Sidebar: FC = () => {
  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4 flex flex-col">
      <div className="flex items-center space-x-2 mb-10">
        <div className="bg-purple-600 p-2 rounded-full">
          <span className="text-lg font-bold">VT</span>
        </div>
        <span className="text-xl font-semibold">Vaishnavi Tiwari</span>
      </div>
      <nav className="flex-1 space-y-2">
        <Link href="/" className="flex items-center space-x-3 p-2 bg-gray-400  text-gray-900 hover:bg-gray-300 rounded-md">
          <span>Events</span>
        </Link>
        <Link href="/chat" className="flex items-center space-x-3 p-2 bg-gray-400 text-gray-900 hover:bg-gray-300 rounded-md">
          <span>Chat</span>
        </Link>
        <Link href="/students" className="flex items-center space-x-3 p-2 bg-gray-400 text-gray-900 hover:bg-gray-300 rounded-md">
          <span>Set Goals</span>
        </Link>
        <Link href="/teachers" className="flex items-center space-x-3 p-2 bg-gray-400 text-gray-900 hover:bg-gray-300 rounded-md">
          <span>Assignments Dues</span>
        </Link>
      </nav>
      <div className="space-y-2">
        <Link href="/finance" className="flex items-center space-x-3 p-2 bg-gray-400 text-gray-900 hover:bg-gray-300 rounded-md">
          <span>Add Projects</span>
        </Link>
        <Link href="/food" className="flex items-center space-x-3 p-2 bg-gray-400 text-gray-900 hover:bg-gray-300 rounded-md">
          <span>Attendance</span>
        </Link>
        <Link href="/settings" className="flex items-center space-x-3 p-2 bg-gray-400 text-gray-900 hover:bg-gray-300 rounded-md">
          <span>Help and Support</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
