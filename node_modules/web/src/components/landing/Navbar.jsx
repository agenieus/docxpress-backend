// components/Navbar.jsx
import React, { useState } from "react";
import { Menu, X, EllipsisVertical } from "lucide-react"; // using lucide-react icons
import { Link } from "react-router-dom";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isKebabOpen, setIsKebabOpen] = useState(false);

  const navLinks = [
    { name: "Tools", href: "#tools" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Why Us", href: "#why" },
  ];

  const products = [
    { id: 1, name: "DocXpress Word", logo: "📄" },
    { id: 2, name: "DocXpress Sheets", logo: "📊" },
    { id: 3, name: "DocXpress Slides", logo: "📑" },
    { id: 4, name: "DocXpress Cloud", logo: "☁️" },
  ];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <h1 href="#" className="text-2xl font-bold text-[#07479D]">DocXpress</h1>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-[#07479D]"
            >
              {link.name}
            </a>
          ))}

          {/* Kebab Menu Desktop */}
          <div className="relative">
            <button
              onClick={() => setIsKebabOpen(!isKebabOpen)}
              className="p-2 rounded hover:bg-gray-100"
            >
              <EllipsisVertical className="w-6 h-6 text-gray-700" />
            </button>
            {isKebabOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg p-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">
                  Other Products
                </h3>
                <ul className="space-y-2">
                  {products.map((product) => (
                    <li
                      key={product.id}
                      className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
                    >
                      <span className="text-xl">{product.logo}</span>
                      <span className="text-gray-700">{product.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Desktop CTA */}
        
        <div className="flex items-center space-x-4">
          {/* */}
          <Link to="/dashboard" className="sm:block text-gray-700 py-4 align-right hover:text-[#07479D]">Login</Link>

          <Link to="/userboard">
            <button className="sm:block bg-[#07479D] text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
              Sign Up
            </button>
          </Link>
        </div>
        
        {/* Mobile Hamburger */}
        
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-md">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-gray-700 hover:text-[#07479D]"
              >
                {link.name}
              </a>
            ))}

            {/* Kebab in Mobile Menu */}
            <div>
              <button
                onClick={() => setIsKebabOpen(!isKebabOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-[#07479D]"
              >
                <EllipsisVertical className="w-6 h-6" />
                <span>Other Products</span>
              </button>
              {isKebabOpen && (
                <ul className="mt-3 space-y-2 border-t pt-3">
                  {products.map((product) => (
                    <li
                      key={product.id}
                      className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
                    >
                      <span className="text-xl">{product.logo}</span>
                      <span className="text-gray-700">{product.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            
          </div>
        </div>
      )}
    </nav>
  );
}
