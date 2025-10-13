import React, { useState } from "react";
import { Menu, X, EllipsisVertical } from "lucide-react"; // using lucide-react icons
import { Link } from "react-router-dom";

export default function NavbarDashboard() { 

    return (
        <header className="flex justify-between fixed top-0 left-0 w-full items-center px-6 py-4 bg-white shadow">
        <div className="flex items-center space-x-2">
          <span className="text-red-600 font-bold text-2xl">DocXpress</span>
        </div>
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#" className="hover:text-red-500">Merge PDF</a>
          <a href="#" className="hover:text-red-500">Split PDF</a>
          <a href="#" className="hover:text-red-500">Compress PDF</a>
          <a href="#" className="hover:text-red-500">Convert PDF</a>
          <a href="#" className="hover:text-red-500">All Tools</a>
        </nav>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-sm font-medium border rounded hover:bg-gray-100">Login</button>
          <button className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded hover:bg-red-700">Sign up</button>
        </div>
      </header>

    );



}