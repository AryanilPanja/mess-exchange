"use client";
import Link from 'next/link';


export default function Home() {
  const handleLogin = () => {
    window.location.href = '/auth/login';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-300 to-red-400 font-sans p-4">
      <div className="bg-white bg-opacity-95 p-10 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Meal Exchange</h1>
        <p className="text-lg text-gray-600 mb-8">
          Experience hassle-free meal buying, selling, and swapping with secure CAS authentication.
        </p>
        <button 
          onClick={handleLogin} 
          className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Login via CAS
        </button>
        <nav className="mt-8 flex justify-center space-x-4">
          <Link
            href="/buy" 
            className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors"
          >
            Buy
          </Link>
          <Link
            href="/sell" 
            className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors"
          >
            Sell
          </Link>
          <Link
            href="/swap" 
            className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors"
          >
            Swap
          </Link>
        </nav>
      </div>
    </div>
  );
}
