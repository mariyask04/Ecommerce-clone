"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

const slides = [
  {
    id: 1,
    title: "Spring 2025 Collection",
    description: "Discover Timeless Elegance",
    img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1600",
    url: "/list",
    bg: "bg-[var(--primary-bg)]",
    buttonText: "SHOP NOW",
    buttonColor: "bg-[var(--accent-color)] hover:bg-[var(--cta-hover)]",
  },
  {
    id: 2,
    title: "Winter Classics",
    description: "Warmth Meets Style",
    img: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=1600",
    url: "/list",
    bg: "bg-[var(--primary-bg)]",
    buttonText: "EXPLORE COLLECTION",
    buttonColor: "bg-[var(--accent-color)] hover:bg-[var(--cta-hover)]",
  },
  {
    id: 3,
    title: "Summer Essentials",
    description: "Effortless Sophistication",
    img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1600",
    url: "/list",
    bg: "bg-[var(--primary-bg)]",
    buttonText: "SHOP SUMMER",
    buttonColor: "bg-[var(--accent-color)] hover:bg-[var(--cta-hover)]",
  },
];

const SlideShow = () => {
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef(null);
  const contentRefs = useRef([]);
  const imageRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      contentRefs.current[current].children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      imageRefs.current[current],
      { scale: 1.05 },
      {
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      }
    );
  }, [current]);

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden relative z-10">
      <div
        ref={sliderRef}
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide, index) => (
          <div
            className={`${slide.bg} w-screen h-full flex flex-row items-center justify-center`}
            key={slide.id}
          >
            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className="w-1/2 flex flex-col items-start justify-center gap-6 px-16 text-left"
            >
              <h2 className="text-2xl font-lora tracking-wide text-[var(--text-color)]">
                {slide.description}
              </h2>
              <h1 className="text-5xl font-playfair font-semibold leading-tight text-[var(--text-color)]">
                {slide.title}
              </h1>
              <Link href={slide.url}>
                <button
                  className={`${slide.buttonColor} rounded-none text-white py-3 px-8 text-base font-medium uppercase tracking-wider transition-all hover:scale-105 shadow-sm`}
                >
                  {slide.buttonText}
                </button>
              </Link>
            </div>
            <div
              ref={(el) => (imageRefs.current[index] = el)}
              className="w-1/2 h-full relative overflow-hidden"
            >
              <Image
                src={slide.img}
                alt={slide.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-3 transform -translate-x-1/2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index ? "bg-[var(--accent-color)]" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideShow;