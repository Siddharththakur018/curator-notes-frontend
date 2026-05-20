import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between items-center px-6 py-4 border-b border-[#E2E2E3]">
        <div className="text-4xl font-bold text-[#3B6EF2]">Curator</div>
        <div>
          <div className="flex justify-around items-center gap-4 border border-[#E2E2E3] cursor-pointer rounded-md px-4 py-2 bg-[#EFF0FF]">
            <FaMagnifyingGlass className="text-gray-400"/>
            <input type="text" placeholder="Search Knowledge..." className="outline-none"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
