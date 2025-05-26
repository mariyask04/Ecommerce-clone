//contact/payment/page.jsx:
"use client";

import { useState } from "react";
import { CreditCard, PlusCircle, Trash2, Star } from "lucide-react";

const mockCards = [
  { id: 1, brand: "Visa", last4: "4242", expiry: "12/26", isDefault: true },
  { id: 2, brand: "Mastercard", last4: "4444", expiry: "09/25", isDefault: false },
];

export default function Page() {
  const [cards, setCards] = useState(mockCards);
  const [newCard, setNewCard] = useState({ number: "", expiry: "", cvc: "" });

  const handleAddCard = () => {
    const last4 = newCard.number.slice(-4);
    setCards([
      ...cards,
      { id: Date.now(), brand: "Visa", last4, expiry: newCard.expiry, isDefault: false },
    ]);
    setNewCard({ number: "", expiry: "", cvc: "" });
  };

  const handleRemove = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleSetDefault = (id) => {
    setCards(cards.map((card) => ({
      ...card,
      isDefault: card.id === id,
    })));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Manage Payment Methods</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-5 flex flex-col gap-3 border border-gray-100"
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-lg font-semibold">{card.brand} •••• {card.last4}</p>
                <p className="text-sm text-gray-500">Expires {card.expiry}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              {card.isDefault ? (
                <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <Star className="w-4 h-4" /> Default
                </span>
              ) : (
                <button
                  onClick={() => handleSetDefault(card.id)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Set as default
                </button>
              )}
              <button
                onClick={() => handleRemove(card.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-dashed border-gray-300">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
          <PlusCircle className="w-5 h-5 text-blue-600" /> Add New Payment Method
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Card Number"
            className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            value={newCard.number}
            onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
          />
          <input
            type="text"
            placeholder="MM/YY"
            className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            value={newCard.expiry}
            onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
          />
          <input
            type="text"
            placeholder="CVC"
            className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            value={newCard.cvc}
            onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value })}
          />
        </div>
        <button
          onClick={handleAddCard}
          className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Card
        </button>
      </div>
    </div>
  );
}
