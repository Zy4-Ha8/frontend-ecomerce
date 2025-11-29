import React from "react";
import { X, Settings } from "lucide-react";
import { Link } from "react-router-dom";

function Card({ image, name, details, onDelete, id }) {
  return (
    <div className="w-60 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      {/* Image */}
      <div className="w-full h-40 bg-gray-100">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-[#3a5b22]">{name}</h2>
        <p className="text-sm text-gray-600 mt-1">{details}</p>
      </div>

      {/* Actions */}
      <div className="flex justify-between p-4 border-t border-gray-200">
        <button
          onClick={() => onDelete(id)}
          className="flex items-center gap-1 px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 cursor-pointer"
        >
          <X size={16} /> Delete
        </button>
        <Link
          to={`/dashboard/update-user/${id}`}
          className="flex items-center gap-1 px-3 py-2 rounded-md bg-[#3a5b22] text-white hover:bg-[#2c4419] cursor-pointer"
        >
          <Settings size={16} /> Update
        </Link>
      </div>
    </div>
  );
}

export default Card;
