"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CartModel from "./CartModel";
import Login from "./Login";
import { useCart } from "@/context/CartContext";

const NavbarIcons = ({ setShowForgotModal }) => {
  const { getTotalQuantity, email, setEmail } = useCart();
  const totalQty = getTotalQuantity();
  const router = useRouter();
  const isLoggedIn = !!email;

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const hoverProfileIcon = useRef(false);
  const hoverProfileDropdown = useRef(false);
  const profileTimeoutRef = useRef(null);

  const hoverCartIcon = useRef(false);
  const hoverCartDropdown = useRef(false);
  const cartTimeoutRef = useRef(null);

  const openProfile = () => {
    clearTimeout(profileTimeoutRef.current);
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    profileTimeoutRef.current = setTimeout(() => {
      if (!hoverProfileIcon.current && !hoverProfileDropdown.current) {
        setIsProfileOpen(false);
      }
    }, 500);
  };

  const onProfileIconEnter = () => {
    hoverProfileIcon.current = true;
    openProfile();
  };

  const onProfileIconLeave = () => {
    hoverProfileIcon.current = false;
    closeProfile();
  };

  const onProfileDropdownEnter = () => {
    hoverProfileDropdown.current = true;
    openProfile();
  };

  const onProfileDropdownLeave = () => {
    hoverProfileDropdown.current = false;
    closeProfile();
  };

  const openCart = () => {
    clearTimeout(cartTimeoutRef.current);
    setIsCartOpen(true);
  };

  const closeCart = () => {
    cartTimeoutRef.current = setTimeout(() => {
      if (!hoverCartIcon.current && !hoverCartDropdown.current) {
        setIsCartOpen(false);
      }
    }, 500);
  };

  const onCartIconEnter = () => {
    hoverCartIcon.current = true;
    openCart();
  };

  const onCartIconLeave = () => {
    hoverCartIcon.current = false;
    closeCart();
  };

  const onCartDropdownEnter = () => {
    hoverCartDropdown.current = true;
    openCart();
  };

  const onCartDropdownLeave = () => {
    hoverCartDropdown.current = false;
    closeCart();
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("userEmail");
      setEmail("");
      await fetch('/api/logout', { method: 'POST' });
      setIsProfileOpen(false);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex items-center gap-8 relative text-base">
      <div
        className="relative"
        onMouseEnter={onProfileIconEnter}
        onMouseLeave={onProfileIconLeave}
      >
        <div className="p-1 rounded-full hover:bg-gray-100 transition-colors">
          <Image
            src="/profile.png"
            alt="Profile"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </div>

        
        {!isLoggedIn && isProfileOpen && (
          <Login
            isOpen={isProfileOpen}
            onMouseEnter={onProfileDropdownEnter}
            onMouseLeave={onProfileDropdownLeave}
            onForgotClick={() => setShowForgotModal(true)}
          />
        )}

        
        {isLoggedIn && isProfileOpen && (
          <div
            className="absolute top-12 left-1/2 -translate-x-1/2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50 space-y-3"
            onMouseEnter={onProfileDropdownEnter}
            onMouseLeave={onProfileDropdownLeave}
          >
            <div className="text-sm font-medium text-gray-900 truncate">Welcome, {email.split('@')[0]}</div>
            <div className="border-t border-gray-100 my-2"></div>
            <button
              onClick={handleLogout}
              className="block w-full text-left text-sm text-red-600 hover:bg-red-50 px-2 py-1.5 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      
      <div
        className="relative"
        onMouseEnter={onCartIconEnter}
        onMouseLeave={onCartIconLeave}
      >
        <div className="p-1 rounded-full hover:bg-gray-100 transition-colors">
          <Image
            src="/cart.png"
            alt="Cart"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </div>
        {totalQty > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--accent-color)] rounded-full text-white text-xs flex items-center justify-center">
            {totalQty}
          </div>
        )}
        {isCartOpen && (
          <CartModel
            onMouseEnter={onCartDropdownEnter}
            onMouseLeave={onCartDropdownLeave}
          />
        )}
      </div>
    </div>
  );
};

export default NavbarIcons;