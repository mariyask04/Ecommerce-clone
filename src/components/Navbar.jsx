"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import NavbarIcons from "./NavbarIcons";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { categories } from "@/data/categories";

const Navbar = ({ showForgotModal, setShowForgotModal }) => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const searchRef = useRef(null);
  const iconsRef = useRef(null);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    gsap.fromTo(
      [logoRef.current, ...linksRef.current.children, searchRef.current, iconsRef.current],
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.3,
        ease: "back.out(1.7)",
      }
    );
  }, []);

  const handleMouseEnter = () => setDropdownOpen(true);
  const handleMouseLeave = () => setDropdownOpen(false);

  return (
    <div
      className={`fixed w-full h-16 px-6 transition-all duration-300 z-50 ${isScrolled ? "bg-white shadow-sm" : "bg-white"}`}
      ref={navRef}
    >
      <div className="flex flex-wrap items-center h-full max-w-7xl justify-between mx-auto gap-y-4 py-4 gap-12">

        {/* Logo */}
        <div className="items-center" ref={logoRef}>
          <Link href="/" className="flex gap-5 items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="hover:scale-105 transition-transform"
            />
            <div className="text-2xl font-playfair font-semibold tracking-wide text-[var(--text-color)]">
              NAME
            </div>
          </Link>
        </div>

        {/* Nav Links - visible only on lg screens */}
        <div
          className="hidden lg:flex relative items-center gap-8 text-base font-medium"
          ref={linksRef}
        >
          <Link
            className={`hover:text-[var(--accent-color)] transition-colors ${pathname === "/list" ? "text-[var(--accent-color)]" : ""}`}
            href="/list"
          >
            Shop
          </Link>

          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={`hover:text-[var(--accent-color)] cursor-pointer transition-colors ${pathname === "/categories" ? "text-[var(--accent-color)]" : ""}`}
            >
              Categories
            </div>

            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute left-0 mt-5 bg-white border border-gray-200 shadow-lg rounded-lg p-6 w-64 z-40 transition-opacity duration-300"
              >
                <ul className="space-y-4">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={`/categories?cat=${cat.value}`}
                        className="block text-lg text-gray-700 font-medium hover:text-[var(--accent-color)] transition-colors"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Link
            className={`hover:text-[var(--accent-color)] transition-colors ${pathname === "/deals" ? "text-[var(--accent-color)]" : ""}`}
            href="/deals"
          >
            Deals
          </Link>

          <Link
            className={`hover:text-[var(--accent-color)] transition-colors ${pathname === "/about" ? "text-[var(--accent-color)]" : ""}`}
            href="/about"
          >
            About
          </Link>
        </div>

        {/* Search + Icons + Burger */}
        <div className="flex items-center gap-4 ml-auto">

          {/* SearchBar: inline on md+, stacked below on sm */}
          <div className="hidden md:block" ref={searchRef}>
            <SearchBar />
          </div>

          {/* Icons */}
          <div ref={iconsRef}>
            <NavbarIcons
              showForgotModal={showForgotModal}
              setShowForgotModal={setShowForgotModal}
            />
          </div>

          {/* Burger menu for <lg screens */}
          <button
            className="block lg:hidden text-2xl"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>

        {/* SearchBar for small screens */}
        {/* SearchBar for small screens */}
        <div
          className="block md:hidden fixed top-16 left-0 right-0 bg-white px-4 py-3 shadow-sm z-40"
          ref={searchRef}
        >
          <div className="max-w-7xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Dropdown menu (burger) for mobile/medium */}
      {dropdownOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="flex flex-col p-4 gap-4 text-base font-medium">
            <Link href="/list" onClick={() => setDropdownOpen(false)}>Shop</Link>
            <Link href="/categories" onClick={() => setDropdownOpen(false)}>Categories</Link>
            <Link href="/deals" onClick={() => setDropdownOpen(false)}>Deals</Link>
            <Link href="/about" onClick={() => setDropdownOpen(false)}>About</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;