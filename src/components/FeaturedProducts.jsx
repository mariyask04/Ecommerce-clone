"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";

const products = [
  { id: 1, name: "Shoes", slug: "kids-shoes", description: "Best Track Shoes.", image: "/kshoes.jpg" },
  { id: 2, name: "T-Shirt", slug: "classic-black-shirt", description: "Light Material Nike Shirt.", image: "/shirt.jpg" },
  { id: 3, name: "Golden Bracelets", slug: "gold-bracelets", description: "Beautiful Golden Bracelet Accessory.", image: "/waccess.jpg" },
];


export default function FeaturedProducts() {
  const cardsRef = useRef([]);
  const [visibleOrder, setVisibleOrder] = useState(products.map((_, i) => i));
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  const startAnimation = () => {
    animationRef.current = setInterval(() => {
      const first = visibleOrder[0];
      const rest = visibleOrder.slice(1);
      const newOrder = [...rest, first];

      const topCard = cardsRef.current[first];
      if (!topCard) return;

      gsap.to(topCard, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          setVisibleOrder(newOrder);
          gsap.set(topCard, { opacity: 1, y: 0 });
        },
      });
    }, 3000);
  };

  useEffect(() => {
    startAnimation();

    const container = containerRef.current;
    const handleMouseEnter = () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
    const handleMouseLeave = () => {
      startAnimation();
    };

    container?.addEventListener("mouseenter", handleMouseEnter);
    container?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
      container?.removeEventListener("mouseenter", handleMouseEnter);
      container?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [visibleOrder]);

  return (
    <section className="flex flex-col items-center py-20 px-4 bg-[url('/linen-texture.png')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-white/80">
      <h2 className="text-3xl font-bold mb-8">Featured Products</h2>

      <div className="flex flex-col lg:flex-row items-center gap-12 w-full max-w-6xl">
        {/* Left: Text */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <h3 className="text-2xl font-semibold">Top Picks for You</h3>
          <p className="text-gray-600">
            Discover beautiful products that simplify your care — from clothing to accessories.
          </p>
          <Link href="/list">
            <button className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition">
              Shop Now
            </button>
          </Link>
        </div>

        {/* Right: Stacked Cards */}
        <div
          className="relative w-full max-w-sm h-[400px] flex-1 cursor-pointer"
          ref={containerRef}
        >
          {visibleOrder.map((orderIndex, stackIndex) => {
            const product = products[orderIndex];
            return (
              <Link href={`/${product.slug}`} key={product.id}>
                <div
                  ref={(el) => (cardsRef.current[orderIndex] = el)}
                  className="absolute top-0 left-0 w-full transition-all duration-700 ease-in-out"
                  style={{
                    zIndex: products.length - stackIndex,
                    transform: `translateY(${stackIndex * 15}px) scale(${1 - stackIndex * 0.05})`,
                  }}
                >
                  <Card className="shadow-xl bg-white rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform">
                    <CardContent className="p-6">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-40 object-contain rounded-xl mb-4"
                      />
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            );
          })}

        </div>
      </div>
    </section>
  );
}
