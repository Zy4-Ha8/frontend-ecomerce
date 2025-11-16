import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-wide text-blue-400">
          StyleHub
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/products" className="hover:text-blue-300 transition">
            Shop
          </Link>
          <Link to="/about" className="hover:text-blue-300 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-300 transition">
            Contact
          </Link>
        </nav>

        {/* Icons */}
        {/* <div className="flex items-center gap-4"> */}
        {/* <Link to="/cart" className="relative">
            <FiShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-xs rounded-full px-1">
              2
            </span>
          </Link> */}
        {/* <Link to="/account">
            <FiUser size={20} />
          </Link> */}
        {/* </div> */}

        <div className="flex gap-2 font-bold">
          <Link to={"login"} className="hover:text-blue-300 cursor-pointer">
            login
          </Link>
          <Link to={"registion"} className="hover:text-blue-300 cursor-pointer">
            registion
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
