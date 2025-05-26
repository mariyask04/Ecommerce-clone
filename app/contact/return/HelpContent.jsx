"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { PackageOpen, RotateCcw, CheckCircle, Truck } from "lucide-react";

const returnSteps = [
  { label: "Return Requested", icon: RotateCcw, status: "done" },
  { label: "Item Picked Up", icon: Truck, status: "done" },
  { label: "Item Inspected", icon: PackageOpen, status: "pending" },
  { label: "Return Approved", icon: CheckCircle, status: "pending" },
];

export default function Page() {
  const [returnId] = useState("RTN-912834");
  const [product] = useState("Wireless Bluetooth Headphones");
  const [reason] = useState("Received wrong color");
  const [method] = useState("Pickup by Courier");

  const barRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    const completed = returnSteps.filter((s) => s.status === "done" || s.status === "current").length;
    const progress = ((completed - 1) / (returnSteps.length - 1)) * 100;

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
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-semibold">Return Details</h1>

      <div className="bg-white rounded-xl shadow p-4 space-y-2">
        <div className="text-sm text-gray-500">
          Return ID: <span className="font-medium text-gray-900">{returnId}</span>
        </div>
        <div className="text-sm text-gray-500">
          Product: <span className="font-medium text-gray-900">{product}</span>
        </div>
        <div className="text-sm text-gray-500">
          Reason: <span className="font-medium text-gray-900">{reason}</span>
        </div>
        <div className="text-sm text-gray-500">
          Return Method: <span className="font-medium text-gray-900">{method}</span>
        </div>
      </div>

      <div className="relative">
        <div className="relative h-2 bg-gray-200 rounded-full mb-10">
          <div
            ref={barRef}
            className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
            style={{ width: "0%" }}
          />
        </div>

        <div className="flex justify-between relative -top-10">
          {returnSteps.map((step, index) => {
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
                className="flex flex-col items-center text-center w-20"
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

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-blue-800">
          Need help with your return?{" "}
          <a href="/contact/support" className="underline font-medium">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
