// src/app/register/page.jsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiAlertCircle, FiMail, FiLock, FiRefreshCw } from "react-icons/fi";
import Link from "next/link";

const Page = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const router = useRouter();

  const isPasswordStrong = (password) => {
    const minLength = password.length >= 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    return minLength && hasSpecialChar && hasNumber && hasUpperCase;
  };

  const requestOTP = async () => {
    setError("");
    if (!email) {
      setError("Email is required to send OTP");
      return;
    }

    setIsSendingOtp(true);
    try {
      const response = await fetch(`/api/send-otp?email=${encodeURIComponent(email)}`);

      if (!response.ok) {
        const errorText = await response.text();
        // Handle HTML error responses
        if (errorText.startsWith('<!DOCTYPE html>')) {
          throw new Error('Server error occurred');
        }
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.message || "Failed to send OTP");
        } catch (e) {
          throw new Error(errorText || "Failed to send OTP");
        }
      }

      const data = await response.json();
      setOtpSent(true);
    } catch (error) {
      console.error("OTP sending error:", error);
      setError(error.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation
    if (!email || !pass || !confirmPass) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    if (pass !== confirmPass) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!isPasswordStrong(pass)) {
      setError("Password must be at least 8 characters, include a number, special character, and uppercase letter");
      setIsLoading(false);
      return;
    }

    if (!otpSent || !otp) {
      setError("Please verify your email with OTP first");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: pass, otp }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (errorText.startsWith('<!DOCTYPE html>')) {
          throw new Error('Server error occurred');
        }
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      setRegistrationSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Left side with background image */}
      <div className="w-1/2 relative group bg-cover bg-center" style={{ backgroundImage: "url('/bg.png')" }}>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="absolute inset-0 bg-white opacity-70"></div>
          <div className="relative z-10 flex flex-col items-center justify-center gap-8 w-full h-full pb-10">
            <p className="text-2xl font-semibold text-center">Continue Shopping Without Creating an Account.</p>
            <Link href="/list">
              <button className="bg-gray-800 hover:bg-black cursor-pointer text-white font-semibold py-2 px-4 rounded-full shadow-lg">
                Explore Products
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right side with registration form */}
      <div className="w-1/2 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
          {registrationSuccess ? (
            <div className="text-center py-8">
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
              <p className="text-gray-600">You will be redirected shortly...</p>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 text-center">Create Account</h2>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={otpSent}
                    required
                    className="w-full p-3 pl-10 border border-gray-300 rounded-md"
                  />
                </div>
                {!otpSent && (
                  <button
                    type="button"
                    onClick={requestOTP}
                    disabled={isSendingOtp}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    {isSendingOtp ? (
                      <>
                        <FiRefreshCw className="animate-spin mr-1" />
                        Sending...
                      </>
                    ) : (
                      "Send verification code"
                    )}
                  </button>
                )}
              </div>

              {otpSent && (
                <div className="animate-fade-in">
                  <label className="block mb-1 font-medium text-gray-700">Verification Code</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit code"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  <p className="text-sm text-gray-500 mt-1">Check your email for the verification code</p>
                </div>
              )}

              <div>
                <label className="block mb-1 font-medium text-gray-700">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    required
                    className="w-full p-3 pl-10 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Re-enter Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    required
                    className="w-full p-3 pl-10 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {error && (
                <p className="flex items-center gap-2 text-red-600 text-sm">
                  <FiAlertCircle />
                  {error}
                </p>
              )}

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading || !otpSent}
                  className={`bg-gray-800 hover:bg-black text-white font-semibold py-3 px-6 rounded-full ${
                    isLoading || !otpSent ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  {isLoading ? 'Verifying...' : 'Sign Up'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;