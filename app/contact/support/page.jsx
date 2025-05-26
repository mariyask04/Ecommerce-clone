//contact/support/page.jsx:
"use client";
import { useState } from "react";
import { Mail, MessageCircle, Search } from "lucide-react";

const faqs = [
  { question: "How do I track my order?", answer: "Go to 'Track Order' in your account or visit /contact/tracking." },
  { question: "What is the return policy?", answer: "You can return items within 30 days of delivery. See /returns." },
  { question: "How do I update my payment method?", answer: "Visit /account/payment to update or add new cards." },
  { question: "Can I cancel or modify my order?", answer: "Contact us via chat or email before the order ships." },
];

export default function page() {
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Support Center</h1>

      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search FAQs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
        {filteredFaqs.length > 0 ? (
          <ul className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <li key={index} className="border-b pb-4">
                <h3 className="font-medium text-lg">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No FAQs matched your search.</p>
        )}
      </div>

      <div className="border-t pt-6 mt-6">
        <h2 className="text-xl font-semibold mb-3">Still need help?</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:support@example.com"
            className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            <Mail className="w-5 h-5 text-blue-600" />
            <span>Email Support</span>
          </a>
          <button className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <MessageCircle className="w-5 h-5" />
            Live Chat
          </button>
        </div>
      </div>
    </div>
  );
}
