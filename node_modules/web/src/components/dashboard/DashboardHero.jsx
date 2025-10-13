import { useState } from "react";
import React from 'react';
import { Link } from "react-router-dom";




export default function DashboardHero() {
    return(

        <div className="min-h-screen bg-white">

      <section className="bg-gray-50 py-12 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Every tool you need to work with PDFs in one place
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From PDF and Office to image, we've got the tools to excel. Merge, 
            split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search PDF tools..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07479D] focus:border-transparent"
            />
          </div>

          {/* Filter Tabs */}
          <div className="mt-6 flex justify-center">
            <div className="flex bg-white rounded-lg shadow-sm border p-1">
              <button className="bg-[#07479D] text-white px-6 py-2 rounded font-medium">All</button>
              <button className="text-gray-600 hover:text-[#07479D] px-6 py-2 font-medium">Word to PDF</button>
              <button className="text-gray-600 hover:text-[#07479D] px-6 py-2 font-medium">Organize PDF</button>
              <button className="text-gray-600 hover:text-[#07479D] px-6 py-2 font-medium">Optimize PDF</button>
              <button className="text-gray-600 hover:text-[#07479D] px-6 py-2 font-medium">Convert PDF</button>
              <button className="text-gray-600 hover:text-[#07479D] px-6 py-2 font-medium">Edit PDF</button>
              <button className="text-gray-600 hover:text-[#07479D] px-6 py-2 font-medium">PDF Security</button>
            </div>
          </div>
        </div>
      </section>
      
        </div>
    );
}