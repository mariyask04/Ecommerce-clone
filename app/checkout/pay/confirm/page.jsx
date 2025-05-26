"use client"

import React from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

const page = () => {
    const { cartItems, getSubtotal } = useCart();

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 4);

    return (
        <div className="max-w-4xl mx-auto p-8 text-center">
            <h1 className="text-4xl font-bold text-green-600 mb-4">✅ Order Confirmed!</h1>
            <p className="text-lg text-gray-600 mb-10">Thank you for your purchase. Your payment was successful.</p>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-left">
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 border-b py-4">
                        <Image
                            src={item.images[0]}
                            alt={item.title}
                            width={70}
                            height={70}
                            className="object-cover rounded"
                        />
                        <div className="flex-1">
                            <h3 className="text-lg font-medium">{item.title}</h3>
                            <p className="text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">${item.price * item.quantity}</p>
                    </div>
                ))}

                <div className="flex justify-between text-xl font-bold mt-6">
                    <span>Total Paid:</span>
                    <span>${getSubtotal()}</span>
                </div>

                <div className="mt-6 text-lg text-gray-700">
                    📦 Estimated Delivery by <span className="font-semibold">{estimatedDelivery.toDateString()}</span>
                </div>
            </div>

            <Link href="/" className="inline-block mt-10">
                <button className="bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition">
                    Back to Home
                </button>
            </Link>
        </div>
    );
};

export default page;
