"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { categories } from "@/data/categories";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CategorySlider() {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    gsap.fromTo(
      scrollRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      }
    );
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Text Section */}
        <div className="md:w-1/3">
          <h2 className="text-4xl font-playfair font-semibold text-[var(--text-color)] mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Explore curated collections from different categories. Whether
            you're after essentials or seasonal specials, find what fits your style.
          </p>
        </div>

        {/* Right Section with Arrows and Carousel */}
        <div className="md:w-2/3 flex flex-col">
          {/* Arrow Buttons aligned top right */}
          <div className="flex justify-end gap-2 mb-4">
            <button
              aria-label="Scroll left"
              onClick={() => scroll("left")}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              aria-label="Scroll right"
              onClick={() => scroll("right")}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Category Cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
          >
            {categories.map((category) => (
              <Link
                href={`/categories?cat=${category.value}`}
                key={category.id}
                className="group relative w-[40%] md:w-[42%] lg:w-[38%] shrink-0 rounded-xl overflow-hidden shadow-md"
              >
                <div className="relative w-full h-[360px] bg-gray-100">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 80vw, 280px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/40">
                    <h3 className="text-xl font-playfair text-white uppercase tracking-wider">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
