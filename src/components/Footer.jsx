"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reset",
        },
      }
    );
  }, []);

  return (
    <div
      ref={footerRef}
      className="py-16 px-6 bg-[var(--secondary-bg)] text-sm text-[var(--text-color)]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">

        {/* NAME */}
        <div className="flex flex-col gap-6 col-span-2 md:col-span-1 lg:col-span-1">
          <Link href="/">
            <div className="text-2xl font-playfair font-semibold tracking-wide">
              NAME
            </div>
          </Link>
          <p className="text-gray-600">
            Discover premium products with timeless style and quality.
          </p>
          <span className="font-medium">support@name.com</span>
          <span className="font-medium">+91 1234 567 890</span>
          <div className="flex gap-4">
            <Image src="/facebook.png" alt="Facebook" width={20} height={20} />
            <Image src="/instagram.png" alt="Instagram" width={20} height={20} />
            <Image src="/youtube.png" alt="YouTube" width={20} height={20} />
            <Image src="/x.png" alt="X" width={20} height={20} />
          </div>
        </div>

        {/* COMPANY */}
        <div className="flex flex-col gap-6">
          <h1 className="font-playfair font-semibold text-lg">Company</h1>
          <div className="flex flex-col gap-4">
            <Link href="/about" className="hover:text-[var(--accent-color)]">About Us</Link>
            <Link href="/blog" className="hover:text-[var(--accent-color)]">Blog</Link>
            <Link href="/contact" className="hover:text-[var(--accent-color)]">Contact Us</Link>
          </div>
        </div>

        {/* SHOP */}
        <div className="flex flex-col gap-6">
          <h1 className="font-playfair font-semibold text-lg">Shop</h1>
          <div className="flex flex-col gap-4">
            <Link href="/men" className="hover:text-[var(--accent-color)]">Men</Link>
            <Link href="/women" className="hover:text-[var(--accent-color)]">Women</Link>
            <Link href="/list" className="hover:text-[var(--accent-color)]">All Products</Link>
          </div>
        </div>

        {/* SUBSCRIBE */}
        <div className="flex flex-col gap-6 col-span-2 md:col-span-3 lg:col-span-1">
          <h1 className="font-playfair font-semibold text-lg">Subscribe</h1>
          <p className="text-gray-600">
            Stay updated with the latest trends and promotions.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email address"
              className="p-3 w-3/4 bg-white border border-gray-300 focus:outline-none"
            />
            <button className="w-1/4 bg-[var(--accent-color)] text-white font-medium uppercase tracking-wider">
              Join
            </button>
          </div>
          <span className="font-medium">Secure Payments</span>
          <div className="flex gap-4">
            <Image src="/paypal.png" alt="PayPal" width={40} height={24} />
            <Image src="/mastercard.png" alt="Mastercard" width={40} height={24} />
            <Image src="/visa.png" alt="Visa" width={40} height={24} />
          </div>
        </div>

      </div>

      <div className="mt-12 pt-6 border-t border-gray-300 max-w-7xl mx-auto flex flex-col md:flex-row justify-between text-sm">
        <div>© 2025 Name Shop. All rights reserved.</div>
        <div className="flex flex-row gap-6 mt-4 md:mt-0">
          <div>
            <span className="text-gray-500 mr-2">Language:</span>
            <span className="font-medium">India | English</span>
          </div>
          <div>
            <span className="text-gray-500 mr-2">Currency:</span>
            <span className="font-medium">₹ INR</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Footer;