"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

const shippingOptions = [
    { label: 'Standard (3–5 days)', cost: 0 },
    { label: 'Express (1–2 days)', cost: 10 },
    { label: 'Overnight (next day)', cost: 20 },
];

const page = () => {
    const { cartItems, getSubtotal } = useCart();
    const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);

    const total = getSubtotal() + selectedShipping.cost;

    return (
        <div className="max-w-5xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>

            {cartItems.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="md:col-span-2 space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 border-b pb-4">
                                    <Image
                                        src={item.images[0]}
                                        alt=""
                                        width={100}
                                        height={100}
                                        className="object-cover rounded"
                                    />
                                    <div className="flex flex-col justify-between w-full">
                                        <div className="flex justify-between">
                                            <h2 className="text-xl font-semibold">{item.title}</h2>
                                            <p className="text-lg font-medium">${item.price * item.quantity}</p>
                                        </div>
                                        <p className="text-gray-500">Unit Price: ${item.price}</p>
                                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gray-100 p-6 rounded-lg shadow-md h-fit">
                            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

                            <div className="flex justify-between mb-2 text-lg">
                                <span>Subtotal:</span>
                                <span>${getSubtotal()}</span>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-lg font-medium">Shipping:</label>
                                <select
                                    value={selectedShipping.label}
                                    onChange={(e) => {
                                        const selected = shippingOptions.find(
                                            (option) => option.label === e.target.value
                                        );
                                        setSelectedShipping(selected);
                                    }}
                                    className="w-full p-2 border rounded"
                                >
                                    {shippingOptions.map((option) => (
                                        <option key={option.label} value={option.label}>
                                            {option.label} {option.cost > 0 ? `($${option.cost})` : '(Free)'}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <hr className="my-4" />

                            <div className="flex justify-between text-xl font-bold">
                                <span>Total:</span>
                                <span>${total}</span>
                            </div>

                            <Link href="/checkout/pay">
                                <button className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition">
                                    Confirm and Pay
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white border p-6 rounded-lg shadow-md mt-10">
                        <h3 className="text-2xl font-semibold mb-4">Shipping Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Full Name" className="border p-2 rounded" />
                            <input type="text" placeholder="Phone Number" className="border p-2 rounded" />
                            <input type="email" placeholder="Email Address" className="border p-2 rounded" />
                            <input type="text" placeholder="Address" className="border p-2 rounded col-span-1 md:col-span-2" />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default page;
