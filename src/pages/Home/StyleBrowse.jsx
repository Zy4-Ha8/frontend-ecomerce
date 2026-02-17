import React from "react";

const StyleBrowse = () => {
  const styles = [
    {
      id: "casual",
      title: "Casual",
      image:
        "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&auto=format&fit=crop",
    },
    {
      id: "formal",
      title: "Formal",
      image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop",
    },
    {
      id: "party",
      title: "Party",
      image:
        "https://images.unsplash.com/photo-1766113484113-9546faecf137?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "gym",
      title: "Gym",
      image:
        "https://images.unsplash.com/photo-1499290572571-a48c08140a19?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto bg-gray-100 rounded-[40px] px-12 py-16 shadow-sm w-full">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-black text-black text-center mb-12 uppercase tracking-tight">
        BROWSE BY DRESS STYLE
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {styles.map((style) => (
          <div
            key={style.id}
            className={`relative rounded-3xl overflow-hidden cursor-pointer ${style.id === "formal" || style.id === "party" ? "col-span-2" : ""}  h-72 bg-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group`}
          >
            {/* Background Image */}
            <img
              src={style.image}
              alt={style.title}
              className="w-full h-full object-cover absolute top-0 left-0 transition-transform duration-300 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>

            {/* Style Title */}
            <div className="absolute top-6 left-6 z-10">
              <h2
                className="text-3xl font-bold text-black"
                style={{ textShadow: "0 2px 8px rgba(255, 255, 255, 0.9)" }}
              >
                {style.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleBrowse;
