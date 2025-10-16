import React from 'react'
import { useState, useRef } from 'react';
import { 
  Menu, Grid3x3, Upload, FileText, Download, 
  X, Check, AlertCircle, Heart, Settings,
  Cloud, File, ArrowRight
} from 'lucide-react';

export default function DocXpressPDFTOWORDUploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);
  const [convertedFileUrl, setConvertedFileUrl] = useState(null);
  const [convertedFileName, setConvertedFileName] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Python backend URL - change if different
  /*const API_BASE_URL = 'http://localhost:5000'; 'http://docxpress.co'*/
  
 
  /*const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';*/
  
// For Vite projects
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length === 0) {
      setError('Please select PDF files only');
      return;
    }
    
    setError('');
    setUploadedFiles(pdfFiles.map((file, index) => ({
      id: index,
      name: file.name,
      size: formatFileSize(file.size),
      file: file
    })));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleConvert = async () => {
    if (uploadedFiles.length === 0) {
      setError('Please select a PDF file first');
      return;
    }

    setIsConverting(true);
    setError('');
    
    try {
      const pdfFile = uploadedFiles[0].file;
      const formData = new FormData();
      formData.append('file', pdfFile);

      const response = await fetch(`${API_BASE_URL}/api/convert`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Conversion failed');
      }

      if (result.success) {
        setConvertedFileUrl(`${API_BASE_URL}${result.download_url}`);
        setConvertedFileName(result.original_name || result.filename);
        setConversionComplete(true);
      } else {
        throw new Error('Conversion failed');
      }
      
    } catch (error) {
      console.error('Conversion error:', error);
      setError(`Conversion failed: ${error.message}`);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (convertedFileUrl) {
      const a = document.createElement('a');
      a.href = convertedFileUrl;
      a.download = convertedFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const removeFile = (id) => { 
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
    setConversionComplete(false);
    setConvertedFileUrl(null);
    setError('');
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu and Logo */}
            <div className="flex items-center">
              <button className="lg:hidden mr-4 text-gray-600 hover:text-gray-900">
                <Menu className="h-6 w-6" />
              </button>
              
              {/* Logo */}
              <div className="flex items-center">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900">I</span>
                  <div className="w-6 h-6 bg-red-500 rounded-sm mx-1 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white fill-current" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">DocXpress</span>
                </div>
              </div>
            </div>

            {/* Right side menu */}
            <div className="flex items-center space-x-4">
              <Grid3x3 className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-900" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            PDF to WORD Converter
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Convert your PDF to WORD documents with incredible accuracy.
          </p>
          <p className="text-gray-500">
            Powered by <span className="text-red-500 font-medium">Python pdf2docx</span>.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-200 mb-8">
          {uploadedFiles.length === 0 ? (
            /* Initial Upload Area */
            <div
              className={`p-12 text-center transition-colors cursor-pointer ${
                isDragging ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleFileInputClick}
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8 text-red-500" />
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Select PDF files
              </h3>
              
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                or drop PDF files here
              </p>
              
              <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
                SELECT PDF FILES
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf"
                onChange={(e) => handleFiles(Array.from(e.target.files))}
                className="hidden"
              />
              
              <p className="text-sm text-gray-500 mt-4">
                Free users are limited to 20 pages per file.
              </p>
            </div>
          ) : (
            /* File List Area */
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Selected Files ({uploadedFiles.length})
                </h3>
                <button
                  onClick={handleFileInputClick}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Add more files
                </button>
              </div>
              
              {/* File List */}
              <div className="space-y-3 mb-6">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <File className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">{file.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {conversionComplete && (
                        <div className="flex items-center text-green-600">
                          <Check className="w-4 h-4 mr-1" />
                          <span className="text-sm">Converted</span>
                        </div>
                      )}
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf"
                onChange={(e) => handleFiles(Array.from(e.target.files))}
                className="hidden"
              />
            </div>
          )}
        </div>

        {/* Convert Button Section */}
        {uploadedFiles.length > 0 && !conversionComplete && (
          <div className="text-center mb-8">
            <button
              onClick={handleConvert}
              disabled={isConverting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center mx-auto"
            >
              {isConverting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Converting...
                </>
              ) : (
                <>
                  Convert to WORD
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Download Section */}
        {conversionComplete && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Conversion Complete!
            </h3>
            <p className="text-gray-600 mb-6">
              Your PDF file has been successfully converted to WORD document.
            </p>
            <button 
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center mx-auto"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Word Document
            </button>
          </div>
        )}

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Cloud className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Local Processing</h4>
            <p className="text-sm text-gray-600">
              Your files are processed locally on our server, ensuring privacy and security.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">High Accuracy</h4>
            <p className="text-sm text-gray-600">
              Powered by Python pdf2docx for excellent conversion accuracy.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Format Preserved</h4>
            <p className="text-sm text-gray-600">
              Maintains formatting, images, and layout from your original PDF.
            </p>
          </div>
        </div>

        {/* Security Notice Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Your files are secure</h4>
              <p className="text-blue-800 text-sm">
                All uploaded and processed files are automatically deleted immediately after conversion. 
                We use local processing to ensure your files remain private and secure.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Tools Section */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Other PDF Tools</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors">
              PDF to Excel
            </a>
            <a href="#" className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors">
              PDF to PowerPoint
            </a>
            <a href="#" className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors">
              Merge PDF
            </a>
            <a href="#" className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors">
              Split PDF
            </a>
            <a href="#" className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors">
              Compress PDF
            </a>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-4 md:mb-0">
              © DocXpress 2025 ® • Your PDF Editor
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}