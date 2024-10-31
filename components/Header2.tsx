import { FC } from "react";

const Header: FC = () => {
  return (
    <div className="bg-[#1b1c30] text-white p-4 flex justify-end items-center">
      <button className="bg-purple-600 p-2 rounded-md mr-5 px-4">Back</button>

      <button className="bg-purple-600 p-2 rounded-md px-4">Logout</button>
    </div>
  );
};

export default Header;
