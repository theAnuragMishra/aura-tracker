import { FC } from "react";

const Header: FC = () => {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
<div className="flex items-center space-x-3">
  <div className="bg-purple-600 text-white p-4 rounded-md flex items-center justify-center">
    <span>Set Challenges</span>
  </div>
  
  <div className="bg-purple-600 text-white p-4 rounded-md flex items-center justify-center">
    <span>Progress: </span>
    <span className="ml-2">1</span> {/* Current progress value */}
    <span className="ml-2">/ 100</span>
  </div>
</div>

      <button className="bg-purple-600 p-2 rounded-md">Logout  </button>
    </div>
  );
};

export default Header;
