"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CheckCircle, Clock, Truck, PackageCheck } from "lucide-react";

const mockStatusSteps = [
  { label: "Order Placed", icon: CheckCircle, status: "done" },
  { label: "Shipped", icon: Truck, status: "done" },
  { label: "Out for Delivery", icon: Clock, status: "current" },
  { label: "Delivered", icon: PackageCheck, status: "pending" },
];

export default function Page() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState(null);
  const barRef = useRef(null);
  const stepRefs = useRef([]);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderId) return;

    setTimeout(() => {
      setStatus(mockStatusSteps);
    }, 1000);
  };

  useEffect(() => {
    if (status) {
      const completed = status.filter((s) => s.status === "done" || s.status === "current").length;
      const progress = ((completed - 1) / (status.length - 1)) * 100;

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
          duration: 0.5,
          stagger: 0.2,
          ease: "power2.out",
        }
      );
    }
  }, [status]);

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Track Your Order</h1>
      <form onSubmit={handleTrack} className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 cursor-pointer"
          disabled={!orderId}
        >
          Track
        </button>
      </form>

      {status && (
        <div className="relative">
          <div className="relative h-2 bg-gray-300 rounded-full mb-10">
            <div
              ref={barRef}
              className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
              style={{ width: "0%" }}
            />
          </div>

          <div className="flex justify-between -mt-10">
            {status.map((step, index) => {
              const Icon = step.icon;
              const color =
                step.status === "done"
                  ? "text-green-600"
                  : step.status === "current"
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
      )}
    </div>
  );
}
