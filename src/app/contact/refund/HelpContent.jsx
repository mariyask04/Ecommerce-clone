"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { RotateCcw, Clock, CheckCircle } from "lucide-react";

const refundSteps = [
  { label: "Request Received", icon: Clock, status: "done" },
  { label: "Processing", icon: RotateCcw, status: "done" },
  { label: "Refund Issued", icon: CheckCircle, status: "pending" },
];

export default function RefundHelp() {
  const refundId = "RF-827341";
  const amount = "₹1,499.00";
  const method = "UPI (xxx123@ybl)";

  const barRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    const completed = refundSteps.filter((s) => s.status === "done" || s.status === "current").length;
    const progress = ((completed - 1) / (refundSteps.length - 1)) * 100;

    gsap.to(barRef.current, {
      width: `${progress}%`,
      duration: 1,
      ease: "power2.out",
    });

    gsap.fromTo(
      stepRefs.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.15,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-semibold text-pink-800">Refund Status</h2>

      <div className="bg-white rounded-xl shadow p-4 space-y-4">
        <div className="text-sm text-gray-500">
          Refund ID: <span className="font-medium text-gray-900">{refundId}</span>
        </div>
        <div className="text-sm text-gray-500">
          Amount: <span className="font-medium text-gray-900">{amount}</span>
        </div>
        <div className="text-sm text-gray-500">
          Refund Method: <span className="font-medium text-gray-900">{method}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative">
        <div className="relative h-2 bg-gray-200 rounded-full mb-10">
          <div
            ref={barRef}
            className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
            style={{ width: "0%" }}
          />
        </div>

        {/* Step icons */}
        <div className="flex justify-between relative -top-10">
          {refundSteps.map((step, index) => {
            const Icon = step.icon;
            const color =
              step.status === "done"
                ? "text-green-600"
                : step.status === "pending"
                ? "text-yellow-500"
                : "text-gray-400";

            return (
              <div
                key={index}
                ref={(el) => (stepRefs.current[index] = el)}
                className="flex flex-col items-center text-center w-24"
              >
                <div className={`w-5 h-5 ${color} mb-2`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <p className={`text-xs font-medium ${color}`}>{step.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <p className="text-yellow-800">
          Need help?{" "}
          <a href="/contact/support" className="underline font-medium">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
