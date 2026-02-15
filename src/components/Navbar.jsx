import {
  ChevronDown,
  Search,
  ShoppingCart,
  Menu,
  User,
  X,
  Home,
  Tag,
  Sparkles,
  Crown,
} from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = ({ userInfo }) => {
  const inputRef = useRef(null);
  const mobileInputRef = useRef(null);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const WidthState = useSelector((state) => state.pageWidth);

  const handleIconClick = () => {
    inputRef.current?.focus();
  };

  const handleMobileSearch = () => {
    setIsMobileSearchOpen(true);
    setTimeout(() => mobileInputRef.current?.focus(), 100);
  };

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  // Close side menu when clicking outside
  useEffect(() => {
    if (isSideMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isSideMenuOpen]);

  const menuItems = [
    { icon: Home, label: "Shop", path: "/shop", hasDropdown: true },
    { icon: Tag, label: "On Sales", path: "/sales" },
    { icon: Sparkles, label: "New Arrivals", path: "/new-arrivals" },
    { icon: Crown, label: "Brands", path: "/brands" },
  ];

  return (
    <>
      <header className="text-black shadow-md sticky top-0 z-40 bg-white">
        {/* Sign up discount */}
        {!userInfo && (
          <div className="bg-black text-white text-center p-2 text-xs sm:text-sm">
            <h1>
              Sign Up and get 20% off to your first order.{" "}
              <span className="underline decoration-white cursor-pointer">
                Sign Up Now
              </span>
            </h1>
          </div>
        )}
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex gap-3 justify-center items-center">
            <Menu
              className="sm:hidden cursor-pointer hover:text-primary transition"
              onClick={toggleSideMenu}
              size={20}
            />
            <Link to="/" className="text-xl font-extrabold tracking-wide">
              Inanna's Vault
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden sm:flex gap-6 text-sm font-medium">
            <span className="hover:text-primary transition flex items-center cursor-pointer">
              Shop <ChevronDown size={15} />
            </span>
            <Link to="/sales" className="hover:text-primary transition">
              On Sales
            </Link>
            <Link to="/new-arrivals" className="hover:text-primary transition">
              New Arrivals
            </Link>
            <Link to="/brands" className="hover:text-primary transition">
              Brands
            </Link>
          </nav>

          {/* Desktop Search */}
          <div className="hidden lg:flex bg-gray-100 rounded-lg justify-center items-center p-2 gap-2">
            <Search
              className="text-gray-400 cursor-pointer"
              size={20}
              onClick={handleIconClick}
            />
            <input
              ref={inputRef}
              className="bg-transparent outline-none text-sm w-80"
              placeholder="Search For Products..."
            />
          </div>

          {/* Action Icons */}
          <div className="flex items-center justify-center gap-3 font-bold">
            <Search
              className="hover:text-primary lg:hidden cursor-pointer transition"
              size={WidthState.isMoblie ? 20 : 22}
              onClick={handleMobileSearch}
            />
            <Link to="/login" className="hover:text-primary cursor-pointer transition">
              <User size={WidthState.isMoblie ? 20 : 22} />
            </Link>
            <Link to="/cart" className="hover:text-primary cursor-pointer transition relative">
              <ShoppingCart size={WidthState.isMoblie ? 20 : 22} />
              {/* Optional: Cart badge */}
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Side Menu Overlay */}
      {isSideMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-50 z-40 sm:hidden"
          onClick={toggleSideMenu}
        />
      )}

      {/* Side Menu */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out sm:hidden ${
          isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h2 className="text-xl font-bold">Menu</h2>
            <X
              className="cursor-pointer hover:text-red-500 transition"
              onClick={toggleSideMenu}
              size={24}
            />
          </div>

          {/* User Info */}
          {!userInfo && (
            <div className="p-4 bg-gray-50 border-b">
              <p className="text-sm text-gray-600 mb-2">
                Sign in to unlock exclusive offers!
              </p>
              <Link
                to="/login"
                className="text-sm font-semibold text-primary underline"
                onClick={toggleSideMenu}
              >
                Sign In / Sign Up
              </Link>
            </div>
          )}

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition group"
                    onClick={toggleSideMenu}
                  >
                    <item.icon
                      size={20}
                      className="text-gray-600 group-hover:text-primary transition"
                    />
                    <span className="font-medium text-gray-800 group-hover:text-primary transition">
                      {item.label}
                    </span>
                    {item.hasDropdown && (
                      <ChevronDown
                        size={16}
                        className="ml-auto text-gray-400"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <p className="text-xs text-gray-500 text-center">
              © 2024 Inanna's Vault
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Search Modal */}
      {isMobileSearchOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 bg-opacity-50 z-50 lg:hidden"
            onClick={closeMobileSearch}
          />
          <div className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 p-4 lg:hidden animate-slide-down">
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center bg-gray-100 rounded-lg p-3 gap-2">
                <Search className="text-gray-400" size={20} />
                <input
                  ref={mobileInputRef}
                  className="flex-1 bg-transparent outline-none text-sm"
                  placeholder="Search For Products..."
                />
              </div>
              <button
                onClick={closeMobileSearch}
                className="text-gray-600 hover:text-red-500 font-medium transition"
              >
                Cancel
              </button>
            </div>
            {/* Optional: Recent searches or suggestions */}
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {["Dresses", "Shoes", "Bags", "Accessories"].map((term) => (
                  <span
                    key={term}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm cursor-pointer hover:bg-gray-200 transition"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;  