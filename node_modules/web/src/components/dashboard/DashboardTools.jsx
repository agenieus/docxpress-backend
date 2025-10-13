import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";





export default function DashboardTools() {
    return(

        <div className="min-h-screen bg-white">

      
      {/* PDF Tools Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Row 1 */}
            {/* Merge PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-red-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Merge PDF</h3>
              <p className="text-sm text-gray-600">
                Combine PDFs in the order you want with the easiest PDF merger available.
              </p>
            </div>

            {/* Split PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-orange-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Split PDF</h3>
              <p className="text-sm text-gray-600">
                Separate one page or a whole set for easy conversion into independent PDF files.
              </p>
            </div>

            {/* Compress PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
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
            <div className="bg-white rounded-lg shadow-sm border hover:border-blue-500 shadow-md transition-shadow p-6">
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
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Presentation className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">PDF to PowerPoint</h3>
              <p className="text-sm text-gray-600">
                Turn your PDF files into editable PowerPoint PPT and PPTX presentations.
              </p>
            </div>

            {/* PDF to Excel */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FileSpreadsheet className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">PDF to Excel</h3>
              <p className="text-sm text-gray-600">
                Pull data straight from PDFs into Excel spreadsheets in a few short seconds.
              </p>
            </div>

            {/* Word to PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Word to PDF</h3>
              <p className="text-sm text-gray-600">
                Make DOC and DOCX files easy to read by converting them to PDF.
              </p>
            </div>

            {/* PowerPoint to PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
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
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
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
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">New</span>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-purple-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Edit PDF</h3>
              <p className="text-sm text-gray-600">
                Add text, images, shapes or freehand annotations to a PDF document.
              </p>
            </div>

            {/* PDF to JPG */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Image className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">PDF to JPG</h3>
              <p className="text-sm text-gray-600">
                Convert each PDF page into a JPG or extract all images in a PDF.
              </p>
            </div>

            {/* JPG to PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
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
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sign PDF</h3>
              <p className="text-sm text-gray-600">
                Sign PDF documents online with certificates or draw your signature.
              </p>
            </div>

            {/* Watermark PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-purple-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Watermark PDF</h3>
              <p className="text-sm text-gray-600">
                Stamp an image or text over your PDF in seconds. Choose the typography and opacity.
              </p>
            </div>

            {/* Rotate PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-pink-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Rotate PDF</h3>
              <p className="text-sm text-gray-600">
                Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!
              </p>
            </div>

            {/* HTML to PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
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
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Unlock PDF</h3>
              <p className="text-sm text-gray-600">
                Remove password security from PDFs to make them easier to work with.
              </p>
            </div>

            {/* Protect PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Protect PDF</h3>
              <p className="text-sm text-gray-600">
                Protect PDF files with a password. Encrypt PDF documents and prevent others from reading.
              </p>
            </div>

            {/* Organize PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-orange-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Organize PDF</h3>
              <p className="text-sm text-gray-600">
                Sort pages of your PDF file however you like. Delete and rotate pages or add new ones.
              </p>
            </div>

            {/* PDF to PDFA */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
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
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-green-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Repair PDF</h3>
              <p className="text-sm text-gray-600">
                Repair damaged PDF online and make it possible to work with it again.
              </p>
            </div>

            {/* Page numbers */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-pink-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Page numbers</h3>
              <p className="text-sm text-gray-600">
                Add page numbers into PDFs with a few clicks. Choose your positions, dimensions, typography.
              </p>
            </div>

            {/* Extract PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-orange-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Extract PDF</h3>
              <p className="text-sm text-gray-600">
                Get pages, text and images from PDF as separate documents for easy editing.
              </p>
            </div>

            {/* Validate PDF */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
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
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
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
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">New</span>
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
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">New</span>
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
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">New</span>
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

      
        </div>
    );
}