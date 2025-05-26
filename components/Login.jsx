//src/components/Login.jsx:
import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const Login = ({ isOpen, onMouseEnter, onMouseLeave, onFocus, onBlur, onForgotClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setCartItems } = useCart();

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("userEmail", email);

      if (data.user?.cartItems) {
        setCartItems(data.user.cartItems);
      }

      window.location.reload();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="absolute top-12 left-1/2 -translate-x-1/2 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 
      space-y-6 z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          onFocus={onFocus}
          onBlur={onBlur}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg text-base outline-none focus:border-[var(--accent-color)]"
        />
        <input
          type="password"
          placeholder="Enter your password"
          onFocus={onFocus}
          onBlur={onBlur}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg text-base outline-none focus:border-[var(--accent-color)]"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-black cursor-pointer transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <button
          onClick={onForgotClick}
          className="hover:text-[var(--accent-color)] hover:underline"
        >
          Forgot password?
        </button>
        <Link
          href="/register"
          className="hover:text-[var(--accent-color)] hover:underline"
        >
          Create account
        </Link>
      </div>
    </div>
  );
};

export default Login;