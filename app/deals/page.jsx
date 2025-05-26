// pages/deals.js
"use client"
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Head from 'next/head';
import Image from 'next/image';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const page = () => {
    const dealsRef = useRef(null);
    const titleRef = useRef(null);
    const countdownRef = useRef(null);
    const cardsRef = useRef([]);

    // Initialize animations
    useEffect(() => {
        // Animation for page title
        gsap.from(titleRef.current, {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });

        // Animation for countdown
        gsap.from(countdownRef.current, {
            duration: 1,
            scale: 0.8,
            opacity: 0,
            delay: 0.3,
            ease: 'elastic.out(1, 0.5)'
        });

        // Animation for deal cards
        gsap.from(cardsRef.current, {
            duration: 0.8,
            y: 100,
            opacity: 0,
            stagger: 0.1,
            delay: 0.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: dealsRef.current,
                start: 'top 80%'
            }
        });

        // Hover animations for cards
        cardsRef.current.forEach(card => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1.03,
                ease: 'power1.out',
                paused: true,
                onComplete: () => {
                    gsap.to(card.querySelector('.deal-badge'), {
                        duration: 0.2,
                        y: -5,
                        repeat: 1,
                        yoyo: true
                    });
                }
            });

            card.addEventListener('mouseenter', () => {
                gsap.to(card, { scale: 1.03, duration: 0.3 });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, { scale: 1, duration: 0.3 });
            });
        });

        // Clean up
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    // Sample deal data
    const deals = [
        {
            id: 1,
            title: "Premium Headphones",
            discount: "50% OFF",
            originalPrice: "$199",
            dealPrice: "$99",
            image: "/pheadphones.jpg",
            timeLeft: "12:45:30",
            tag: "BESTSELLER"
        },
        {
            id: 2,
            title: "Smart Watch Pro",
            discount: "35% OFF",
            originalPrice: "$249",
            dealPrice: "$161",
            image: "/swatch.jpg",
            timeLeft: "08:30:15",
            tag: "LIMITED"
        },
        {
            id: 3,
            title: "Wireless Earbuds",
            discount: "40% OFF",
            originalPrice: "$129",
            dealPrice: "$77",
            image: "/earbuds.jpg",
            timeLeft: "15:20:45",
            tag: "NEW"
        },
        {
            id: 4,
            title: "4K Camera",
            discount: "25% OFF",
            originalPrice: "$599",
            dealPrice: "$449",
            image: "/camera.jpg",
            timeLeft: "23:10:05",
            tag: "TRENDING"
        },
        {
            id: 5,
            title: "Fitness Tracker",
            discount: "30% OFF",
            originalPrice: "$89",
            dealPrice: "$62",
            image: "/fittrack.jpg",
            timeLeft: "06:15:30",
            tag: "HOT"
        },
        {
            id: 6,
            title: "Bluetooth Speaker",
            discount: "45% OFF",
            originalPrice: "$129",
            dealPrice: "$70",
            image: "/speaker.jpg",
            timeLeft: "18:40:20",
            tag: "DEAL"
        }
    ];

    return (
        <div className="deals-page bg-gray-50 min-h-screen" ref={dealsRef}>
            <Head>
                <title>Hot Deals - ShopName</title>
                <meta name="description" content="Discover our hottest deals and limited-time offers" />
            </Head>

            <div className="container mx-auto px-4 py-12">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1
                        ref={titleRef}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                    >
                        Hot Deals & Discounts
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Limited-time offers on our most popular products. Don't miss out!
                    </p>
                </div>

                {/* Countdown Banner */}
                <div
                    ref={countdownRef}
                    className="bg-gradient-to-r from-black via-gray-600 to-gray-50 rounded-xl p-6 mb-12 text-white text-center shadow-lg"
                >
                    <h2 className="text-2xl font-bold mb-2">Flash Sale Ending In:</h2>
                    <div className="flex justify-center space-x-4">
                        <div className="bg-white text-black bg-opacity-20 rounded-lg p-3 min-w-[80px]">
                            <div className="text-3xl font-bold">12</div>
                            <div className="text-sm">Hours</div>
                        </div>
                        <div className="bg-white text-black bg-opacity-20 rounded-lg p-3 min-w-[80px]">
                            <div className="text-3xl font-bold">45</div>
                            <div className="text-sm">Minutes</div>
                        </div>
                        <div className="bg-white text-black bg-opacity-20 rounded-lg p-3 min-w-[80px]">
                            <div className="text-3xl font-bold">30</div>
                            <div className="text-sm">Seconds</div>
                        </div>
                    </div>
                </div>

                {/* Deals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10 gap-8">
                    {deals.map((deal, index) => (
                        <div
                            key={deal.id}
                            ref={el => cardsRef.current[index] = el}
                            className="deal-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 relative"
                        >
                            {deal.tag && (
                                <div className="deal-badge absolute top-4 right-4 bg-red-400 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                                    {deal.tag}
                                </div>
                            )}

                            <div className="deal-image h-48 bg-gray-200 relative overflow-hidden">
                                {/* Replace with your actual image component */}
                                <Image src={deal.image} fill alt='' className='object-contain'/>
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-red-400 text-white text-sm font-bold px-2 py-1 rounded">
                                        {deal.discount}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{deal.title}</h3>
                                <div className="flex items-center mb-4">
                                    <span className="text-2xl font-bold text-gray-900 mr-2">{deal.dealPrice}</span>
                                    <span className="text-gray-500 line-through">{deal.originalPrice}</span>
                                </div>

                                <div className="mb-4">
                                    <div className="text-sm text-gray-500 mb-1">Deal ends in: {deal.timeLeft}</div>
                                </div>

                                <button className="text-[#F35C7A] ring-1 ring-[#F35C7A] hover:bg-[#F35C7A] hover:text-white font-bold py-3 px-4 rounded-lg cursor-pointer mx-auto block">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default page;