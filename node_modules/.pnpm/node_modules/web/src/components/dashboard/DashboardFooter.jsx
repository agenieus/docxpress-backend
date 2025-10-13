import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";




export default function DashboardFooter() {
    return(

        <div className="min-h-screen bg-white">

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Product */}
            <div>
              <h3 className="text-white font-semibold mb-4">PRODUCT</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Desktop</a></li>
                <li><a href="#" className="hover:text-white">Mobile</a></li>
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold mb-4">RESOURCES</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">How-To Guides</a></li>
                <li><a href="#" className="hover:text-white">Business</a></li>
                <li><a href="#" className="hover:text-white">Developers</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-white font-semibold mb-4">SOLUTIONS</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Business</a></li>
                <li><a href="#" className="hover:text-white">Education</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-4">LEGAL</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy policy</a></li>
                <li><a href="#" className="hover:text-white">Cookies policy</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-4">COMPANY</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Our story</a></li>
                <li><a href="#" className="hover:text-white">Media kit</a></li>
                <li><a href="#" className="hover:text-white">Contact us</a></li>
              </ul>
              
              {/* App Store badges */}
              <div className="mt-6 space-y-2">
                <div className="bg-black rounded-lg p-2 w-32">
                  <div className="text-xs text-center text-white">Download on App Store</div>
                </div>
                <div className="bg-black rounded-lg p-2 w-32">
                  <div className="text-xs text-center text-white">Get it on Google Play</div>
                </div>
                <div className="bg-black rounded-lg p-2 w-32">
                  <div className="text-xs text-center text-white">Microsoft Store</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom footer */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-400">
                © 2024 iLovePDF.com - Your PDF Editor
              </div>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <div className="w-5 h-5 bg-gray-600 rounded"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <div className="w-5 h-5 bg-gray-600 rounded"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <div className="w-5 h-5 bg-gray-600 rounded"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">YouTube</span>
                  <div className="w-5 h-5 bg-gray-600 rounded"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <div className="w-5 h-5 bg-gray-600 rounded"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
        </div>
    );
}