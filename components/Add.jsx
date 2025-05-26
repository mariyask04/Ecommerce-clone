// Add.jsx
"use client"

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { toast } from 'react-hot-toast';

export default function Add({product}) {
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const stock = product?.stock || 4;
    
    const handleQuantity = (type) => {
        if(type === "decrease" && quantity > 1){
            setQuantity((prev) => prev - 1);
        }
        if(type === "increase" && quantity < stock){
            setQuantity((prev) => prev + 1);
        }
    };

    const handleAddToCart = () => {
        addItem(product, quantity);
        toast.success(`${quantity} ${product.title} added to cart!`, {
            position: 'bottom-right',
            icon: '🛒',
        });
    };

    return (
        <div className='flex flex-col gap-4'>
            <h4 className='font-medium text-lg'>Choose Quantity</h4>
            <div className='flex justify-between'>
                <div className='flex items-center gap-4'>
                    <div className='bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32'>
                        <button 
                            className='cursor-pointer text-2xl disabled:opacity-30' 
                            onClick={() => handleQuantity("decrease")}
                            disabled={quantity <= 1}
                        >
                            -
                        </button>
                        <span className='text-xl'>{quantity}</span>
                        <button 
                            className='cursor-pointer text-2xl disabled:opacity-30' 
                            onClick={() => handleQuantity("increase")}
                            disabled={quantity >= stock}
                        >
                            +
                        </button>
                    </div>
                    <div className='text-sm'>
                        Only <span className='text-orange-500'>{stock} items</span> left!
                        {quantity > stock / 2 && (
                            <span className='text-red-500 ml-2'>Selling fast!</span>
                        )}
                    </div>
                </div>
                <button 
                    className='w-36 text-lg rounded-3xl py-2 px-4 ring-1 ring-[#F35C7A] text-[#F35C7A] hover:text-white hover:bg-[#F35C7A] transition-colors disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-0' 
                    onClick={handleAddToCart}
                    disabled={stock === 0}
                >
                    {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    )
}