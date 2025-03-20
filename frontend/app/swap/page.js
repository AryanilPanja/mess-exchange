"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "../../components/navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SwapPage() {
  // State for the swap deal form
  const [swapDate, setSwapDate] = useState(new Date());
  const [offeredMess, setOfferedMess] = useState("");
  const [wantedMess, setWantedMess] = useState("");
  const [mealType, setMealType] = useState("");
  const [message, setMessage] = useState("");

  // State for displaying swap deals
  const [swapDeals, setSwapDeals] = useState([]);

  // Fetch existing swap deals from the API
  const fetchSwapDeals = useCallback(async () => {
    try {
      const res = await fetch("/api/market/swap");
      if (res.ok) {
        const data = await res.json();
        setSwapDeals(data);
      } else {
        console.error("Failed to fetch swap deals");
      }
    } catch (error) {
      console.error("Error fetching swap deals:", error);
    }
  }, []);

  useEffect(() => {
    fetchSwapDeals();
  }, [fetchSwapDeals]);

  // Handle form submission for creating a new swap deal
  const handleCreateSwap = async (e) => {
    e.preventDefault();
    const payload = {
      swapDate: swapDate.toISOString(), // send date as ISO string
      offeredMess,
      wantedMess,
      mealType,
    };

    try {
      const res = await fetch("/api/market/swap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setMessage("Swap deal created successfully!");
        // Clear form fields
        setOfferedMess("");
        setWantedMess("");
        setMealType("");
        setSwapDate(new Date());
        fetchSwapDeals();
      } else {
        setMessage("Error creating swap deal");
      }
    } catch (error) {
      console.error("Error creating swap deal:", error);
      setMessage("Error creating swap deal");
    }
  };

  // Handle accepting a swap deal
  const handleAcceptSwap = async (id) => {
    try {
      const res = await fetch(`/api/market/swap/accept?id=${id}`, {
        method: "POST",
      });
      if (res.ok) {
        const responseText = await res.text();
        alert("Swap deal accepted: " + responseText);
        fetchSwapDeals();
      } else {
        alert("Error accepting swap deal");
      }
    } catch (error) {
      console.error("Error accepting swap deal:", error);
      alert("Error accepting swap deal");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          Swap Deals
        </h1>

        {/* Form for creating a new swap deal */}
        <form
          onSubmit={handleCreateSwap}
          className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Create a Swap Deal
          </h2>

          {/* Swap Date Picker */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
              Swap Date
            </label>
            <DatePicker
              selected={swapDate}
              onChange={(date) => setSwapDate(date)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          {/* Offered Mess Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
              Mess Offering
            </label>
            <select
              value={offeredMess}
              onChange={(e) => setOfferedMess(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Offered Mess</option>
              <option value="Mess A">Mess A</option>
              <option value="Mess B">Mess B</option>
              <option value="Mess C">Mess C</option>
              <option value="Mess D">Mess D</option>
            </select>
          </div>

          {/* Wanted Mess Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
              Mess Wanted
            </label>
            <select
              value={wantedMess}
              onChange={(e) => setWantedMess(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Wanted Mess</option>
              <option value="Mess A">Mess A</option>
              <option value="Mess B">Mess B</option>
              <option value="Mess C">Mess C</option>
              <option value="Mess D">Mess D</option>
            </select>
          </div>

          {/* Meal Type Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
              Meal Type
            </label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Meal</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Create Swap Deal
          </button>
        </form>

        {message && (
          <p className="mb-6 text-center text-lg text-green-600 dark:text-green-400">
            {message}
          </p>
        )}

        {/* Display Existing Swap Deals */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Available Swap Deals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {swapDeals.map((deal) => (
              <div key={deal.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <p className="text-gray-700 dark:text-gray-200 mb-2">
                  <span className="font-bold">Date:</span>{" "}
                  {new Date(deal.swapDate).toLocaleDateString()}
                </p>
                <p className="text-gray-700 dark:text-gray-200 mb-2">
                  <span className="font-bold">Offered Mess:</span> {deal.offeredMess}
                </p>
                <p className="text-gray-700 dark:text-gray-200 mb-2">
                  <span className="font-bold">Wanted Mess:</span> {deal.wantedMess}
                </p>
                <p className="text-gray-700 dark:text-gray-200 mb-2">
                  <span className="font-bold">Meal:</span> {deal.mealType}
                </p>
                <button
                  onClick={() => handleAcceptSwap(deal.id)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Accept Swap Deal
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
