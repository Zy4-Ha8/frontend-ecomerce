import React from "react";
import Navbar from "../../components/Navbar";
import LandingPage from "./LandingPage";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className=" flex items-center justify-center">
        <LandingPage />
        {/* Hero Section */}
        {/* <section className="bg-slate-900 text-white py-16 px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Style That Speaks</h1>
          <p className="text-lg mb-6">
            Discover the latest trends in fashion, tailored for you.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white font-medium">
            Shop Now
          </button>
        </section> */}

        {/* Featured Categories */}
        {/* <section className="py-12 px-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Men", "Women", "Kids", "Accessories"].map((category) => (
              <div
                key={category}
                className="bg-white shadow rounded p-4 text-center hover:ring-2 ring-blue-500 transition"
              >
                <img
                  src={`/images/${category.toLowerCase()}.jpg`}
                  alt={category}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h3 className="font-medium">{category}</h3>
              </div>
            ))}
          </div>
        </section> */}

        {/* Trending Products */}
        {/* <section className="py-12 px-6 bg-white">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Trending Now
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="border rounded shadow hover:scale-105 transition"
              >
                <img
                  src={`/images/product-${item}.jpg`}
                  alt={`Product ${item}`}
                  className="w-full h-40 object-cover rounded-t"
                />
                <div className="p-4">
                  <h3 className="font-medium text-lg">Product Name</h3>
                  <p className="text-blue-500 font-semibold">$49.99</p>
                </div>
              </div>
            ))}
          </div>
        </section> */}
      </div>
    </>
  );
};

export default HomePage;
