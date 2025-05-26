'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const ProductSection = ({ title, products, backgroundImage, categoryValue, product }) => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100vh] flex justify-between items-center px-10 py-20"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-white max-w-[40%]">
        <h2 className="text-5xl font-bold mb-4 text-blue-950">{title}</h2>
        <p className="mb-6 text-2xl font-semibold text-black">Explore our exclusive collection. Find the perfect products tailored just for you.</p>
        <Link href={`/categories?cat=${categoryValue}`} className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
          Explore More
        </Link>
      </div>

      <div className="relative w-[50%] flex items-center">
        <button
          onClick={scrollLeft}
          className="absolute left-0 z-10 bg-white p-3 rounded-full hover:bg-white/70 transition"
        >
          <FaArrowLeft />
        </button>
        <div ref={scrollRef} className="flex overflow-x-auto overflow-y-hidden gap-6 px-10 scroll-smooth scrollbar-hidden" >
          {products.map((product) => (
            <Link
              href={`/${product.slug}`}
              key={product.id}
              className="min-w-[40%] bg-white text-black rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={product.image}
                alt=""
                width={250}
                height={300}
                className="w-full h-60 object-contain"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-600">{product.category}</p>
              </div>
            </Link>

          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 z-10 bg-white p-3 rounded-full hover:bg-white/70 transition"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default ProductSection;
