// app/components/HeroSection.tsx
'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/button'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/women.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/50 z-10"></div>

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-4xl md:text-6xl font-bold mb-6"
        >
          Discover Comfy Clothes that your body loves
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/list">
            <Button variant="default" size="lg" className="text-lg px-6 cursor-pointer">
              Shop Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
