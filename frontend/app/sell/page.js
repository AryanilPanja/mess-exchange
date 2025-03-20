"use client";

import { useState } from "react";
import Navbar from "../../components/navbar";

export default function SellPage() {
  const [selectedMess, setSelectedMess] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");
  const [price, setPrice] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      mess: selectedMess,
      meal: selectedMeal,
      price,
      mobile,
    };

    try {
      const res = await fetch("/api/market/sell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.text();
        setMessage("Offer posted successfully!");
        // Clear form fields after successful submission
        setSelectedMess("");
        setSelectedMeal("");
        setPrice("");
        setMobile("");
      } else {
        setMessage("Error posting offer");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error posting offer");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
          Sell Your Meal
        </h1>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          {/* Mess Name Dropdown */}
          <div className="mb-6">
            <label htmlFor="mess" className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
              Mess Name
            </label>
            <select
              id="mess"
              value={selectedMess}
              onChange={(e) => setSelectedMess(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Mess</option>
              <option value="Mess A">Mess A</option>
              <option value="Mess B">Mess B</option>
              <option value="Mess C">Mess C</option>
              <option value="Mess D">Mess D</option>
            </select>
          </div>

          {/* Meal Type Dropdown */}
          <div className="mb-6">
            <label htmlFor="meal" className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
              Meal Type
            </label>
            <select
              id="meal"
              value={selectedMeal}
              onChange={(e) => setSelectedMeal(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Meal</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>

          {/* Price Input */}
          <div className="mb-6">
            <label htmlFor="price" className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
              Price ($)
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Mobile Number Input */}
          <div className="mb-6">
            <label htmlFor="mobile" className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
              Contact Mobile
            </label>
            <input
              id="mobile"
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter mobile number"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-blue-600 transition-colors"
          >
            Post Offer
          </button>
          {message && (
            <p className="mt-4 text-center text-lg text-green-600 dark:text-green-400">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
