"use client"

import { useState } from "react";
import Image from "next/image";

export default function ProductImages({images = []}){
  const [index, setIndex] = useState(0);
  
  if (!images.length) return (
    <div className="h-[500px] flex items-center justify-center bg-gray-100 rounded-md">
      <p className="text-gray-500">No images available</p>
    </div>
  );

  return (
    <div className=''>
      <div className='h-[500px] relative group'>
        <Image 
          src={images[index]} 
          alt={images[index] || 'Product image'} 
          fill 
          sizes='50vw' 
          className='object-contain rounded-md'
          priority
        />
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              &lt;
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              &gt;
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className='flex justify-between gap-4 mt-4'>
          {images.map((url, i) => (
            <div 
              className={`w-1/4 h-32 relative rounded-md overflow-hidden border-2 ${i === index ? 'border-[#F35C7A]' : 'border-transparent'}`} 
              key={i} 
              onClick={() => setIndex(i)}
            >
              <Image 
                src={url} 
                alt={`Thumbnail ${i + 1}`} 
                fill 
                sizes='30vw' 
                className='object-contain'
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}