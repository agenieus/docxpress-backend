import React from 'react';
import { useState } from 'react';
import { 
  User, Search, Grid3x3, Download, FileText, Image, 
  FileSpreadsheet, Presentation, Settings, Shield,
  Smartphone, Monitor, Building2, Star, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DocXpressDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      
      {/* Main Content */}
      <header className="bg-white shadow-sm border-b fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <span className="text-xl font-bold text-[#07479D]">DocXpress</span>
              </div>
              {/*
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-[#07479D] font-medium">PDF TOOL</a>
                <a href="#" className="text-gray-700 hover:text-[#07479D] font-medium">JPG TO PDF</a>
                <a href="#" className="text-gray-700 hover:text-[#07479D] font-medium">COMPRESS PDF</a>
                <a href="#" className="text-gray-700 hover:text-[#07479D] font-medium">PROJECTS APP</a>
                <a href="#" className="text-gray-700 hover:text-[#07479D] font-medium">ALL PDF TOOLS</a>
              </nav>
              */}
            </div>

            {/* Right side - Login/User */}
            <div className="flex items-center space-x-4">
              <Grid3x3 className="h-6 w-6 text-black-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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
          {/*
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
          */}
        </div>
      </section>

      {/* PDF Tools Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Row 1 */}
            {/* Merge PDF */}
            <Link to="/mergepdf">
              <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
                <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">New</span>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-red-500 rounded"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Merge PDF</h3>
                <p className="text-sm text-gray-600">
                  Combine PDFs in the order you want with the easiest PDF merger available.
                </p>
              </div>
            </Link>

            {/* Split PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-orange-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Split PDF</h3>
              <p className="text-sm text-gray-600">
                Separate one page or a whole set for easy conversion into independent PDF files.
              </p>
            </div>

            {/* Compress PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-green-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Compress PDF</h3>
              <p className="text-sm text-gray-600">
                Reduce file size while optimizing for maximal PDF quality.
              </p>
            </div>

            {/* PDF to Word */}
            <Link to="/uploadpdf">
              <div className="bg-white rounded-lg shadow-sm border hover:border-blue-500 shadow-md transition-shadow p-6 relative">
                <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">New</span>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">PDF to Word</h3>
                <p className="text-sm text-gray-600">
                  Easily convert your PDF files into easy to edit DOC and DOCX documents.
                </p>
              </div>
            </Link>

            {/* Row 2 */}
            {/* PDF to PowerPoint */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Presentation className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">PDF to PowerPoint</h3>
              <p className="text-sm text-gray-600">
                Turn your PDF files into editable PowerPoint PPT and PPTX presentations.
              </p>
            </div>

            {/* PDF to Excel */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FileSpreadsheet className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">PDF to Excel</h3>
              <p className="text-sm text-gray-600">
                Pull data straight from PDFs into Excel spreadsheets in a few short seconds.
              </p>
            </div>

            {/* Word to PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Word to PDF</h3>
              <p className="text-sm text-gray-600">
                Make DOC and DOCX files easy to read by converting them to PDF.
              </p>
            </div>

            {/* PowerPoint to PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Presentation className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">PowerPoint to PDF</h3>
              <p className="text-sm text-gray-600">
                Turn Microsoft PowerPoint presentations into PDFs to share and publish.
              </p>
            </div>

            {/* Row 3 */}
            {/* Excel to PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FileSpreadsheet className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Excel to PDF</h3>
              <p className="text-sm text-gray-600">
                Make spreadsheets easy to read by converting Excel to PDF.
              </p>
            </div>

            {/* Edit PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-purple-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Edit PDF</h3>
              <p className="text-sm text-gray-600">
                Add text, images, shapes or freehand annotations to a PDF document.
              </p>
            </div>

            {/* PDF to JPG */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Image className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">PDF to JPG</h3>
              <p className="text-sm text-gray-600">
                Convert each PDF page into a JPG or extract all images in a PDF.
              </p>
            </div>

            {/* JPG to PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Image className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">JPG to PDF</h3>
              <p className="text-sm text-gray-600">
                Convert JPG images to PDF in seconds. Easily adjust orientation and margins.
              </p>
            </div>

            {/* Row 4 */}
            {/* Sign PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sign PDF</h3>
              <p className="text-sm text-gray-600">
                Sign PDF documents online with certificates or draw your signature.
              </p>
            </div>

            {/* Watermark PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-purple-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Watermark PDF</h3>
              <p className="text-sm text-gray-600">
                Stamp an image or text over your PDF in seconds. Choose the typography and opacity.
              </p>
            </div>

            {/* Rotate PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-pink-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Rotate PDF</h3>
              <p className="text-sm text-gray-600">
                Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!
              </p>
            </div>

            {/* HTML to PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-yellow-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">HTML to PDF</h3>
              <p className="text-sm text-gray-600">
                Convert webpages in HTML to PDF. Copy and paste the URL of the page you want and convert it.
              </p>
            </div>

            {/* Row 5 */}
            {/* Unlock PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Unlock PDF</h3>
              <p className="text-sm text-gray-600">
                Remove password security from PDFs to make them easier to work with.
              </p>
            </div>

            {/* Protect PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Protect PDF</h3>
              <p className="text-sm text-gray-600">
                Protect PDF files with a password. Encrypt PDF documents and prevent others from reading.
              </p>
            </div>

            {/* Organize PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-orange-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Organize PDF</h3>
              <p className="text-sm text-gray-600">
                Sort pages of your PDF file however you like. Delete and rotate pages or add new ones.
              </p>
            </div>

            {/* PDF to PDFA */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">PDF to PDF/A</h3>
              <p className="text-sm text-gray-600">
                Transform regular PDF files into long-term archival PDF/A documents.
              </p>
            </div>

            {/* Row 6 */}
            {/* Repair PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-green-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Repair PDF</h3>
              <p className="text-sm text-gray-600">
                Repair damaged PDF online and make it possible to work with it again.
              </p>
            </div>

            {/* Page numbers */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-pink-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Page numbers</h3>
              <p className="text-sm text-gray-600">
                Add page numbers into PDFs with a few clicks. Choose your positions, dimensions, typography.
              </p>
            </div>

            {/* Extract PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-orange-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Extract PDF</h3>
              <p className="text-sm text-gray-600">
                Get pages, text and images from PDF as separate documents for easy editing.
              </p>
            </div>

            {/* Validate PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-green-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Validate PDF</h3>
              <p className="text-sm text-gray-600">
                Easily check and confirm if your PDF file is properly formatted for the intended use.
              </p>
            </div>

            {/* Row 7 */}
            {/* Compare PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Compare PDF</h3>
              <p className="text-sm text-gray-600">
                Compare two PDF files and identify differences visually. Nothing will go unnoticed.
              </p>
            </div>

            {/* Redact PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Redact PDF</h3>
              <p className="text-sm text-gray-600">
                Remove sensitive information from PDF permanently. Black out confidential details.
              </p>
            </div>

            {/* OCR PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-pink-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">OCR PDF</h3>
              <p className="text-sm text-gray-600">
                Using Optical Character Recognition get text from images or scanned PDFs to edit.
              </p>
            </div>

            {/* Create a workflow */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 relative">
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Coming soon</span>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-purple-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Create a workflow</h3>
              <p className="text-sm text-gray-600">
                Create custom workflows for your repetitive tasks and apply them to multiple files.
              </p>
              <button className="mt-4 text-[#07479D] text-sm font-medium hover:underline">
                Create workflow →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Work your way section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Work your way</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Work offline with Desktop */}
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Monitor className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Work offline with Desktop</h3>
              <p className="text-gray-600 mb-6">
                Work with your PDF documents when not connected to the internet. Available for Windows, Mac and Linux.
              </p>
              <div className="bg-pink-50 rounded-lg p-4 mb-6">
                <div className="h-32 bg-pink-100 rounded"></div>
              </div>
              <a href="#" className="text-[#07479D] font-medium hover:underline flex items-center justify-center">
                Learn more <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            {/* On the go with Mobile */}
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">On the go with Mobile</h3>
              <p className="text-gray-600 mb-6">
                Use DocXpress mobile app to quickly edit PDFs on your phone. Scan documents, sign contracts on the go.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="h-32 bg-blue-100 rounded"></div>
              </div>
              <a href="#" className="text-[#07479D] font-medium hover:underline flex items-center justify-center">
                Learn more <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            {/* Built for business */}
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Built for business</h3>
              <p className="text-gray-600 mb-6">
                A solution scalable to your organization needs. Enhanced security and compliance. Flexible plans.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="h-32 bg-gray-100 rounded"></div>
              </div>
              <a href="#" className="text-[#07479D] font-medium hover:underline flex items-center justify-center">
                Learn more <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Premium section */}
      <section className="bg-yellow-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get more with Premium</h2>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">Convert from and to more than 25 file formats and workflows</span>
                </li>
              </ul>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold text-lg">
                Get Premium
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-red-600" />
                  </div>
                  <div className="text-gray-600">Premium Features Preview</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image editing section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-blue-50 rounded-lg p-8">
              <div className="grid grid-cols-2 gap-4 h-64">
                <div className="bg-blue-200 rounded-lg"></div>
                <div className="bg-blue-300 rounded-lg"></div>
                <div className="bg-blue-300 rounded-lg"></div>
                <div className="bg-blue-200 rounded-lg"></div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Image editing made simple with DocXpress</h2>
              <p className="text-gray-600 mb-6">
                Discover the online image editor and all the tools you need to enhance and edit pictures online. Crop, resize, filters, effects, frames and a lot more.
              </p>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold">
                Go to DocXpress
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">The PDF software trusted by millions of users</h2>
          <p className="text-gray-300 mb-12 max-w-3xl mx-auto">
            DocXpress is your number one web app for editing PDF with ease. Enjoy all the tools you need to work efficiently with your digital documents while keeping your data safe and secure.
          </p>
          
          {/* Trust badges */}
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-gray-400">500M+ users</div>
            <div className="text-gray-400">200+ countries</div>
            <div className="text-gray-400">+6PB processed</div>
          </div>
        </div>
      </section>

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
              <h3 className="text-white font-semibold mb-4">DocXpress</h3>
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
                © 2025 DocXpress.com - Your PDF Editor
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