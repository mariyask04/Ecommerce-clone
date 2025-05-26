//arc/components/CartModel.jsx:
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const CartModel = ({ onMouseEnter, onMouseLeave }) => {
  const { cartItems, removeItem, getSubtotal, initialized, loading, email } = useCart();

  if (loading || !initialized) {
    return (
      <div className="absolute top-12 right-0 w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 space-y-6 z-50">
        <div className="text-center text-gray-600">Loading cart...</div>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="absolute top-12 right-0 w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 space-y-6 z-50">
        <div className="text-center text-gray-600">
          Please <span className="text-[var(--accent-color)]">sign in</span> to view your cart
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute top-12 right-0 w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 space-y-6 z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">Your cart is empty</div>
      ) : (
        <>
          <h2 className="text-xl font-playfair font-semibold text-[var(--text-color)]">
            Shopping Bag
          </h2>

          <div className="flex flex-col gap-6 max-h-96 overflow-y-auto">
            {cartItems.map((item, index) => (
              <div
                className="flex gap-4 border-b border-gray-200 pb-4"
                key={item.id || `${item.name}-${index}`}
              >
                <Image
                  src={item.image}
                  width={80}
                  height={80}
                  alt={item.name || "Cart item"}
                  className="object-cover rounded-lg"
                />
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <div className="flex justify-between text-base">
                      <h3 className="font-lora font-medium">{item.name}</h3>
                      <div className="font-semibold">₹{item.price}</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </div>
                  </div>
                  <div
                    onClick={() => removeItem(item.id)}
                    className="text-[var(--accent-color)] cursor-pointer hover:underline text-sm"
                  >
                    Remove
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 flex flex-col gap-4">
            <div className="flex justify-between text-base font-semibold">
              <span>Subtotal</span>
              <span>₹{getSubtotal()}</span>
            </div>
            <Link href="/checkout">
              <button className="bg-[var(--accent-color)] text-white py-3 px-6 rounded-lg font-medium uppercase tracking-wider hover:bg-[var(--cta-hover)] transition">
                Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModel;