"use client"

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

const page = () => {
    const { cartItems, getSubtotal } = useCart();
    const [paymentMethod, setPaymentMethod] = useState("credit-card");
    const [isProcessing, setIsProcessing] = useState(false);

    const totalAmount = getSubtotal();

    const handlePayment = () => {
        setIsProcessing(true);

        setTimeout(() => {
            setIsProcessing(false);
            window.location.href = "/checkout/pay/confirm";
        }, 2000);
    };

    return (
        <div className="max-w-5xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-6 text-center">Payment Information</h1>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-10">
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
                    <span>Total:</span>
                    <span>${totalAmount}</span>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>

                <div className="space-y-4">
                    <div>
                        <input
                            type="radio"
                            id="credit-card"
                            name="payment-method"
                            value="credit-card"
                            checked={paymentMethod === "credit-card"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mr-2"
                        />
                        <label htmlFor="credit-card" className="text-lg">Credit Card</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="paypal"
                            name="payment-method"
                            value="paypal"
                            checked={paymentMethod === "paypal"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mr-2"
                        />
                        <label htmlFor="paypal" className="text-lg">PayPal</label>
                    </div>
                </div>

                {paymentMethod === "credit-card" && (
                    <div className="mt-6 space-y-4">
                        <input
                            type="text"
                            placeholder="Card Number"
                            className="border p-2 rounded w-full"
                        />
                        <input
                            type="text"
                            placeholder="Expiration Date"
                            className="border p-2 rounded w-full"
                        />
                        <input
                            type="text"
                            placeholder="CVV"
                            className="border p-2 rounded w-full"
                        />
                    </div>
                )}

                {paymentMethod === "paypal" && (
                    <div className="mt-6">
                        <button className="px-4 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 mx-auto block transition">
                            Pay with PayPal
                        </button>
                    </div>
                )}

                <button
                    className="px-4 mt-6 bg-green-600 text-white py-3 mx-auto block rounded hover:bg-green-700 transition"
                    onClick={handlePayment}
                    disabled={isProcessing}
                >
                    {isProcessing ? "Processing..." : "Confirm Payment"}
                </button>
            </div>
        </div>
    );
};

export default page;
