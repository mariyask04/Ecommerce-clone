import { useEffect, useState } from "react";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setEmail("");
      setOtp("");
      setPassword("");
      setConfirmPassword("");
      setErrorMessage("");
    }
  }, [isOpen]);

  async function handleSendOtp() {
    setErrorMessage("");
    if (!email) {
      setErrorMessage("Email is required");
      return;
    }
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send OTP');
      setStep(2);
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  const handleVerifyOtp = () => {
    if (!otp) return setErrorMessage("OTP is required");
    setErrorMessage("");
    setStep(3);
  };

  const handleResetPassword = async () => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{7,}$/;
    if (!passwordRegex.test(password)) {
      return setErrorMessage(
        "Password must be at least 7 characters, include a letter, a number, and a special character."
      );
    }

    if (password !== confirmPassword) {
      return setErrorMessage("Passwords do not match.");
    }

    setErrorMessage("");

    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword: password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Reset failed");

      alert("Password reset successful! Please log in.");
      onClose();
    } catch (err) {
      setErrorMessage(err.message || "Something went wrong.");
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="relative bg-white border border-gray-300 shadow-2xl rounded-2xl px-8 py-10 w-96 max-w-full text-center">
          <button
            onClick={onClose}
            className="absolute top-3 left-3 w-6 h-6 bg-black text-white rounded-full text-lg cursor-pointer font-bold flex items-center justify-center hover:bg-gray-800 transition"
          >
            ×
          </button>

          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {step === 1
              ? "Forgot Your Password?"
              : step === 2
                ? "Verify OTP"
                : "Reset Password"}
          </h2>

          {errorMessage && (
            <div className="mb-4 text-red-600 text-sm bg-red-100 px-3 py-2 rounded">
              {errorMessage}
            </div>
          )}

          <div className="flex flex-col gap-4">
            {step === 1 && (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gray-800"
                />
                <button
                  onClick={handleSendOtp}
                  className="mx-auto cursor-pointer p-3 bg-gray-800 text-white rounded-lg hover:bg-black transition text-sm font-medium"
                >
                  Send OTP
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gray-800"
                />
                <button
                  onClick={handleVerifyOtp}
                  className="mx-auto cursor-pointer p-3 bg-gray-800 text-white rounded-lg hover:bg-black transition text-sm font-medium"
                >
                  Verify OTP
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gray-800"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gray-800"
                />
                <button
                  onClick={handleResetPassword}
                  className="mx-auto cursor-pointer p-3 bg-gray-800 text-white rounded-lg hover:bg-black transition text-sm font-medium"
                >
                  Reset Password
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default ForgotPasswordModal;
