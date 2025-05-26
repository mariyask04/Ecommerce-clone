// CustomizeProduct.jsx
"use client"

import React, { useState } from "react";

export default function CustomizeProduct(){
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(1); // Default to Medium

  const colors = [
    { id: 0, name: "Burgundy", value: "bg-pink-950", available: true },
    { id: 1, name: "Amber", value: "bg-amber-500", available: true },
    { id: 2, name: "Black", value: "bg-slate-950", available: false },
  ];

  const sizes = [
    { id: 0, name: "Small", value: "Small", available: true },
    { id: 1, name: "Medium", value: "Medium", available: true },
    { id: 2, name: "Large", value: "Large", available: false },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium text-lg">Choose a color</h4>
      <ul className="flex items-center gap-3">
        {colors.map((color) => (
          <li
            key={color.id}
            className={`w-10 h-10 rounded-full ring-1 ring-gray-300 relative ${color.value} ${
              color.available ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            onClick={() => color.available && setSelectedColor(color.id)}
            title={color.name}
          >
            {selectedColor === color.id && color.available && (
              <div className="absolute w-12 h-12 ring-2 ring-[#F35C7A] rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            )}
            {!color.available && (
              <div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            )}
          </li>
        ))}
      </ul>
      <h4 className="font-medium text-lg">Choose a size</h4>
      <ul className="flex items-center gap-3">
        {sizes.map((size) => (
          <li
            key={size.id}
            className={`ring-1 rounded-md px-4 py-1 text-lg ${
              size.available
                ? selectedSize === size.id
                  ? "ring-[#F35C7A] text-white bg-[#F35C7A] cursor-pointer"
                  : "ring-[#F35C7A] text-[#F35C7A] cursor-pointer hover:bg-pink-50"
                : "ring-pink-200 text-white bg-pink-200 cursor-not-allowed"
            }`}
            onClick={() => size.available && setSelectedSize(size.id)}
          >
            {size.name}
          </li>
        ))}
      </ul>
    </div>
  );
};