"use client"

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

const ProductListClient = ({ products }) => {
    const { addItem } = useCart();

    return (
        <div className='mt-12 mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {products.map(product => (
                <Link href={`/${product.slug}`} key={product.id} className='flex flex-col gap-4 group'>
                    <div className='relative w-full aspect-square'>
                        <Image 
                            src={product.images[0]} 
                            alt='' 
                            fill 
                            className='absolute object-contain rounded-md z-10 group-hover:opacity-0 transition-opacity duration-500' 
                        />
                        <Image 
                            src={product.images[1]} 
                            alt='' 
                            fill 
                            className='absolute object-contain rounded-md' 
                        />
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-xl font-medium'>{product.title}</span>
                        <span className='text-xl font-semibold'>${product.price}</span>
                    </div>
                    <div className='text-lg text-gray-500'>Popular Item</div>
                    <button 
                        className='rounded-2xl ring-1 w-max ring-[#F35C7A] text-[#F35C7A] py-2 px-4 text-md hover:bg-[#F35C7A] hover:text-white transition-colors'
                        onClick={(e) => {
                            e.preventDefault();
                            addItem(product, 1);
                        }}
                    >
                        Add to Cart
                    </button>
                </Link>
            ))}
        </div>
    );
}

export default ProductListClient;