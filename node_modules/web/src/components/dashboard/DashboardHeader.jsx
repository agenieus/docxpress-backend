import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";




export default function DashboardNavbar() {
    return(
      <nav className="bg-white shadow-sm border-b fixed w-full z-10">

        <div className="min-h-screen bg-white">

      <header className="bg-white shadow-sm border-b fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <span className="text-xl font-bold text-[#07479D]">DocXpress</span>
              </div>
              
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-[#07479D] font-medium">PDF TOOL</a>
                <a href="#" className="text-gray-700 hover:text-[#07479D] font-medium">JPG TO PDF</a>
                <a href="#" className="text-gray-700 hover:text-[#07479D] font-medium">COMPRESS PDF</a>
                <a href="#" className="text-gray-700 hover:text-[#07479D] font-medium">PROJECTS APP</a>
                <a href="#" className="text-gray-700 hover:text-[#07479D] font-medium">ALL PDF TOOLS</a>
              </nav>
            </div>

            {/* Right side - Login/User */}
            <div className="flex items-center space-x-4">
              {/* 
              {!isLoggedIn ? (
                
                <>
                  <button className="text-gray-700 hover:text-[#07479D]">Login</button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium">
                    Sign Up
                  </button>
                </>
              
              ) : (
                <div className="flex items-center space-x-2">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
              )}
              */}
              <Grid3x3 className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
      </header>
        </div>
      </nav>
    );
}