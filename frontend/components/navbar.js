"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // On component mount, check if user has a saved theme preference.
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex space-x-6">
          <Link href="/" legacyBehavior>
            <a className="text-gray-700 dark:text-gray-200 hover:text-blue-500 font-semibold">
              Home
            </a>
          </Link>
          <Link href="/buy" legacyBehavior>
            <a className="text-gray-700 dark:text-gray-200 hover:text-blue-500 font-semibold">
              Buy
            </a>
          </Link>
          <Link href="/sell" legacyBehavior>
            <a className="text-gray-700 dark:text-gray-200 hover:text-blue-500 font-semibold">
              Sell
            </a>
          </Link>
          <Link href="/swap" legacyBehavior>
            <a className="text-gray-700 dark:text-gray-200 hover:text-blue-500 font-semibold">
              Swap
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
