import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-[#1a132e] to-[#0c033e] p-5  flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="text-white text-xs leading-tight px-10">
          <div className="font-bold text-3xl">branch<span className="text-yellow-400">X</span></div>
          <div className="text-[12px]">Redefining Xperience</div>
        </div>
      </div>

      <div className="px-10">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-md">
          Connect for Business
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
