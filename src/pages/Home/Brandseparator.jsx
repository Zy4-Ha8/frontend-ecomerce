import React from "react";

const BrandSeparator = () => {
  const brands = [
    { name: "VERSACE", style: "font-serif italic tracking-wider" },
    { name: "ZARA", style: "font-black tracking-wide" },
    { name: "GUCCI", style: "font-serif tracking-[0.25em]" },
    { name: "PRADA", style: "font-black tracking-[0.3em]" },
    { name: "Calvin Klein", style: "font-light tracking-tight" },
  ];

  return (
    <div className="w-full bg-black py-5 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Scrolling container */}
      <div className="flex animate-[scroll_20s_linear_infinite] hover:[animation-play-state:paused] ">
        {/* First set of brands */}
        <div className="flex gap-20 px-10 shrink-0">
          {brands.map((brand, index) => (
            <div
              key={`first-${index}`}
              className={`text-white text-xl md:text-2xl lg:text-3xl font-semibold whitespace-nowrap ${brand.style}`}
            >
              {brand.name}
            </div>
          ))}
        </div>

        {/* Duplicate set for seamless loop */}
        <div className="flex gap-20 px-10 shrink-0">
          {brands.map((brand, index) => (
            <div
              key={`second-${index}`}
              className={`text-white text-xl md:text-2xl lg:text-3xl font-semibold whitespace-nowrap ${brand.style}`}
            >
              {brand.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSeparator;
