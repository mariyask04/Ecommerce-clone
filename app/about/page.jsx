import React from 'react';
import HorizontalSlide from '@/components/HorizontalSlide';
import Image from 'next/image';

export default function page() {
  return (
    <>
      <HorizontalSlide />
      <div className="bg-gray-100 rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Follow us on social media to stay updated on new arrivals, special offers,
          and behind-the-scenes content.
        </p>
        <div className="flex justify-center mt-10 gap-6">
          {['facebook', 'instagram', 'twitter', 'pinterest'].map((social) => (
            <button
              key={social}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
            >
              <Image
                src={`/${social}.png`}
                alt={social}
                width={20}
                height={20}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
