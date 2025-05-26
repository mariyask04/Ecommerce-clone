"use client"

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const HorizontalSlide = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        const pin = gsap.fromTo(sectionRef.current, {
            translateX: 0
        }, {
            translateX: "-300vw",
            ease: "none",
            duration: 1,
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "2000 top",
                scrub: 0.6,
                pin: true
            }
        });

        const sections = sectionRef.current.querySelectorAll('.text-content');

        sections.forEach((el) => {
            gsap.from(el, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        return () => {
            pin.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const data = [
        {
            heading: "Our Story",
            text: "Founded in 2023, we started with a simple mission: to bring high-quality products with exceptional customer service to everyone.",
            image: "https://images.pexels.com/photos/7552326/pexels-photo-7552326.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            heading: "Who We Are",
            text: "We're a passionate team of designers, developers, and customer service professionals dedicated to creating the best shopping experience.",
            image: "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            heading: "Our Mission",
            text: "To provide sustainable, high-quality products that our customers love, while maintaining ethical business practices.",
            image: "https://images.pexels.com/photos/3755440/pexels-photo-3755440.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            heading: "What Our Customers Say",
            text: `"Absolutely love the quality and service. I keep coming back!" - Ayesha R. \n\n"Reliable, fast delivery, and such great products!" - Mark L.`,
            image: "https://images.pexels.com/photos/8939564/pexels-photo-8939564.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
    ];

    return (
        <section className='scroll-section-outer'>
            <div ref={triggerRef}>
                <div ref={sectionRef} className='scroll-section-inner'>
                    {data.map((item, index) => (
                        <div key={index} className='scroll-section relative flex items-center justify-center'>
                            <div
                                className="absolute inset-0 bg-cover bg-center backdrop-blur opacity-25"
                                style={{ backgroundImage: `url(${item.image})` }}
                            />
                            <div className="relative z-10 px-12 text-content text-center">
                                <h3 className="text-4xl font-bold mb-6">{item.heading}</h3>
                                <p className="text-lg font-semibold whitespace-pre-line">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HorizontalSlide;
