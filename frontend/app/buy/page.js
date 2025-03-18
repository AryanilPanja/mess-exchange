"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "../../components/navbar";

export default function BuyPage() {
  // State for the dropdowns and offers
  const [selectedMess, setSelectedMess] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");
  const [selectedSort, setSelectedSort] = useState("asc");
  const [offers, setOffers] = useState([]);

  // Function to fetch offers based on selected criteria
  const fetchOffers = useCallback(async () => {
    const params = new URLSearchParams();
    if (selectedMess) params.append("mess", selectedMess);
    if (selectedMeal) params.append("meal", selectedMeal);
    if (selectedSort) params.append("sort", selectedSort);

    try {
      const res = await fetch("/api/market/buy?" + params.toString());
      if (res.ok) {
        const data = await res.json();
        setOffers(data);
      } else {
        console.error("Failed to fetch offers");
      }
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  }, [selectedMess, selectedMeal, selectedSort]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchOffers();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          Buy Meals
        </h1>
        {/* Search Form */}
        <form onSubmit={handleSearch} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            {/* Mess Name Dropdown */}
            <select
              value={selectedMess}
              onChange={(e) => setSelectedMess(e.target.value)}
              className="w-full sm:w-1/3 border border-gray-300 dark:border-gray-700 rounded-lg p-3 mb-4 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Mess</option>
              <option value="Mess A">Mess A</option>
              <option value="Mess B">Mess B</option>
              <option value="Mess C">Mess C</option>
              <option value="Mess D">Mess D</option>
            </select>
            {/* Meal Dropdown */}
            <select
              value={selectedMeal}
              onChange={(e) => setSelectedMeal(e.target.value)}
              className="w-full sm:w-1/3 border border-gray-300 dark:border-gray-700 rounded-lg p-3 mb-4 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Meal</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
            {/* Price Sort Dropdown */}
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="w-full sm:w-1/3 border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="asc">Lowest to Highest</option>
              <option value="desc">Highest to Lowest</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Search Offers
          </button>
        </form>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {offer.meal}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-bold">Mess:</span> {offer.mess}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-bold">Price:</span> ${offer.price}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-bold">Contact:</span> {offer.mobile}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
