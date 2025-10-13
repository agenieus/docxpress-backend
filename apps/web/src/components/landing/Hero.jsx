// components/Hero.jsx
import React from "react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-[#07479D] to-blue-600 text-white py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left Text */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            We make <span className="text-yellow-300">PDF</span> easy
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-100">
            All the tools you need to be more productive and work smarter with documents.
          </p>
          <div className="mt-8 flex gap-4">
            <button className="bg-yellow-400 text-[#07479D] px-6 py-3 rounded-xl font-semibold shadow hover:bg-yellow-500 transition">
              Start free
            </button>
            <button className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#07479D] transition">
              Explore all tools
            </button>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="flex-1 flex justify-center">
          <img
            src="../../assets/hero_images.png"
            alt="PDF Illustration"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
