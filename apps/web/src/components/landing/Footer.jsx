// components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#07479D] text-white py-10 px-6 md:px-20 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold">DocXpress</h3>
          <p className="mt-2 text-gray-200">
            Simplifying documents for millions of users worldwide.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <ul className="mt-4 space-y-2">
            <li><a href="#tools" className="hover:underline">Tools</a></li>
            <li><a href="#features" className="hover:underline">Features</a></li>
            <li><a href="#pricing" className="hover:underline">Pricing</a></li>
            <li><a href="#why" className="hover:underline">Why Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Follow Us</h4>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-yellow-400">🌐</a>
            <a href="#" className="hover:text-yellow-400">📘</a>
            <a href="#" className="hover:text-yellow-400">🐦</a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} DocXpress Clone. All rights reserved.
      </div>
    </footer>
  );
}
