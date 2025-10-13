// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import Tools from "./components/landing/Tools";
import Features from "./components/landing/Features";
import Pricing from "./components/landing/Pricing";
import WhyChooseUs from "./components/landing/WhyChooseUs";
import Footer from "./components/landing/Footer";
import Dashboard from "./pages/admin_dashboard";
import DocXpressDashboard from "./pages/userboard";
import DocXpressPDFTOWORDUploadPage from "./pages/uploadPdf";

export default function App() {
  return (
    
    <div className="bg-#D3D3D3 text-gray-900 font-sans">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <Tools />
              <Features />
              <Pricing />
              <WhyChooseUs />
              <Footer />
            </>
          } />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userboard" element={<DocXpressDashboard />} />
          <Route path="/uploadpdf" element={<DocXpressPDFTOWORDUploadPage />} />
      </Routes>

        
    </BrowserRouter>
    </div>
    
  );
}