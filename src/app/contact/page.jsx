"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ContactPage() {
  const cardRefs = useRef([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const helpItems = [
  {
    img: '/package.png',
    title: 'Track Your Package',
    description: 'Real-time tracking for all your orders',
    href: '/contact/tracking#help',
  },
  {
    img: '/return.png',
    title: 'Returns & Exchanges',
    description: 'Start a return or exchange process',
    href: '/contact/return#help',
  },
  {
    img: '/refund.png',
    title: 'Refund Status',
    description: 'Check the status of your refund',
    href: '/contact/refund#help',
  },
  {
    img: '/payment.png',
    title: 'Payment Methods',
    description: 'Update your payment information',
    href: '/contact/payment#help',
  },
];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll animation
      gsap.fromTo(cardRefs.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".help-section",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      )

      // Hide text initially
      cardRefs.current.forEach((card) => {
        const text = card.querySelector('[data-text]');
        if (text) gsap.set(text, { opacity: 0, y: 20 });
      });
    });

    return () => ctx.revert(); // Cleanup
  }, []);


  const handleCardExpand = (index) => {
    const hoveredCard = cardRefs.current[index];
    const hoveredText = hoveredCard?.querySelector('[data-text]');
    const isColumn1 = index % 2 === 0;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      const cardText = card.querySelector('[data-text]');
      const isCardColumn1 = i % 2 === 0;

      gsap.killTweensOf(card);
      gsap.killTweensOf(cardText);

      if (i === index) {
        // Expand hovered card
        gsap.to(card, {
          width: 300,
          x: isColumn1 ? -120 : 0,
          duration: 0.5,
          ease: "expo.out",
        });

        if (hoveredText) {
          gsap.fromTo(hoveredText,
            { opacity: 0, x: 10, visibility: "hidden" },
            { opacity: 1, x: 0, visibility: "visible", duration: 0.4, ease: "power3.out", delay: 0.1 }
          );
        }

      } else {
        // Shift sibling cards only if hovered card is in column 1
        gsap.to(card, {
          x: isColumn1
            ? (isCardColumn1 ? -120 : 120)
            : 0,
          duration: 0.4,
          ease: "power2.out",
        });

        if (cardText) {
          gsap.to(cardText, {
            opacity: 0,
            x: 10,
            visibility: "hidden",
            duration: 0.2,
            ease: "power2.in",
          });
        }
      }
    });
  };

  const handleCardCollapse = () => {
    cardRefs.current.forEach((card) => {
      if (!card) return;
      const text = card.querySelector('[data-text]');

      gsap.killTweensOf(card);
      gsap.to(card, {
        x: 0,
        width: 95,
        duration: 0.35,
        ease: "power2.inOut",
      });

      if (text) {
        gsap.killTweensOf(text);
        gsap.to(text, {
          opacity: 0,
          x: 10,
          visibility: "hidden",
          duration: 0.25,
          ease: "power2.in",
        });
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulated submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitMessage("Thank you! We'll respond within 24 hours.")
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitMessage(''), 5000)
    }, 1500)
  }

  return (
    <div className="px-6 md:px-16 lg:px-32 pb-40 max-w-7xl mx-auto">
      {/* Help Section */}
      <section className="help-section mt-10 flex flex-col md:flex-row items-center gap-12 min-h-[calc(100vh-80px)]">
        <div className="w-3/4 text-left">
          <h1 className="text-3xl font-bold mb-4">How Can We Help You?</h1>
        </div>

        <div className="block w-px bg-gray-300 h-150 mt-10 mx-40 self-stretch"></div>

        <div className="w-1/4 grid grid-cols-2 gap-22"> {/* gap increased from 6 to 8 */}
          {helpItems.map((item, index) => (
            <div
              key={index}
              ref={el => cardRefs.current[index] = el}
              className="group relative overflow-hidden flex items-center bg-white border border-gray-200 rounded-xl transition-all duration-500 ease-in-out hover:shadow-lg"
              onMouseEnter={() => handleCardExpand(index)}
              onMouseLeave={() => handleCardCollapse(index)}
              style={{ width: '95px', height: '120px' }} // Base size
            >

              {/* Icon */}
              <div className="flex justify-center items-center h-full w-24 bg-pink-50 shrink-0">
                <Image src={item.img} width={64} height={64} alt={item.title} />
              </div>

              {/* Text content — initially hidden */}
              <div
                className="pl-4 pr-2 py-2 opacity-0 invisible"
                data-text
                style={{ whiteSpace: 'normal' }}
              >
                <Link href={item.href} className="text-sm font-semibold text-gray-800 hover:text-pink-600 transition-colors block">
                  {item.title}
                </Link>
                <p className="text-gray-600 mt-1 text-xs">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-pink-100 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">support@brand.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-pink-100 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-600">+91 1234 567 890</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-pink-100 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-gray-600">
                    123 XYZ Street<br />
                    State, City, Country<br />
                    PinCode
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-pink-50 p-6 rounded-xl">
            <h3 className="font-bold text-lg mb-3">Business Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-600">Monday - Friday</span>
                <span className="font-medium">9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Saturday</span>
                <span className="font-medium">10:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Sunday</span>
                <span className="font-medium">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-lg font-medium mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition duration-200 flex justify-center items-center ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : 'Send Message'}
            </button>

            {submitMessage && (
              <div className="p-4 bg-green-100 text-green-700 rounded-lg text-center">
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  )
}
