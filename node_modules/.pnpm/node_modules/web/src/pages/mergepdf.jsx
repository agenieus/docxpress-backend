import React from 'react'
import { useState, useRef } from 'react';
import { 
  Menu, Grid3x3, Upload, FileText, Download, 
  X, Check, AlertCircle, Settings, Cloud, 
  File, ArrowRight, Merge
} from 'lucide-react';

export default function MergePDFPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergeComplete, setMergeComplete] = useState(false);
  const [mergedFileUrl, setMergedFileUrl] = useState(null);
  const [mergedFileName, setMergedFileName] = useState('');
  const [error, setError] = useState('');
  const [filesMerged, setFilesMerged] = useState(0);
  const fileInputRef = useRef(null);

  // Use environment variable with fallback for both development and production
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
    const pdfFiles = files.filter(file => {
      const isPDF = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      return isPDF;
    });
    
    if (pdfFiles.length === 0) {
      setError('Please select PDF files only');
      return;
    }
    
    if (pdfFiles.length + uploadedFiles.length > 20) {
      setError('Maximum 20 PDF files allowed');
      return;
    }
    
    setError('');
    const newFiles = pdfFiles.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: formatFileSize(file.size),
      file: file,
      order: uploadedFiles.length + index + 1
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleMerge = async () => {
    if (uploadedFiles.length < 2) {
      setError('Please select at least 2 PDF files to merge');
      return;
    }

    setIsMerging(true);
    setError('');
    
    try {
      const formData = new FormData();
      
      // Add all PDF files to FormData
      uploadedFiles.forEach((fileObj, index) => {
        formData.append('files', fileObj.file);
      });

      const response = await fetch(`${API_BASE_URL}/api/merge-pdf`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Merge failed');
      }

      if (result.success) {
        setMergedFileUrl(`${API_BASE_URL}${result.download_url}`);
        setMergedFileName(result.original_name);
        setFilesMerged(result.files_merged);
        setMergeComplete(true);
      } else {
        throw new Error('Merge failed');
      }
      
    } catch (error) {
      console.error('Merge error:', error);
      setError(`Merge failed: ${error.message}`);
    } finally {
      setIsMerging(false);
    }
  };

  const handleDownload = () => {
    if (mergedFileUrl) {
      const a = document.createElement('a');
      a.href = mergedFileUrl;
      a.download = mergedFileName;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const removeFile = (id) => { 
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
    setMergeComplete(false);
    setMergedFileUrl(null);
    setError('');
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const reorderFile = (index, direction) => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === uploadedFiles.length - 1)) {
      return;
    }
    
    const newFiles = [...uploadedFiles];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap the files
    [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
    
    // Update order numbers
    newFiles.forEach((file, idx) => {
      file.order = idx + 1;
    });
    
    setUploadedFiles(newFiles);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button className="lg:hidden mr-4 text-gray-600 hover:text-gray-900">
                <Menu className="h-6 w-6" />
              </button>
              
              <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-900">DocXpress</span>
              </div>
            </div>

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
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Merge className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Merge PDF Files
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Combine multiple PDF documents into one unified file
          </p>
          <p className="text-gray-500">
            Drag and drop your PDFs to arrange the merge order
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
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8 text-blue-500" />
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Select PDF files to merge
              </h3>
              
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                or drop PDF files here (2-20 files)
              </p>
              
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
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
                Select at least 2 PDF files. Maximum 20 files.
              </p>
            </div>
          ) : (
            /* File List Area with Drag & Drop Ordering */
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Files to Merge ({uploadedFiles.length})
                </h3>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">Drag to reorder</span>
                  <button
                    onClick={handleFileInputClick}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Add more files
                  </button>
                </div>
              </div>
              
              {/* File List with Order Controls */}
              <div className="space-y-3 mb-6">
                {uploadedFiles.map((file, index) => (
                  <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4 flex-1">
                      {/* Order Number */}
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {file.order}
                      </div>
                      
                      {/* File Icon and Info */}
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <File className="w-5 h-5 text-red-500" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">{file.size}</p>
                      </div>
                    </div>
                    
                    {/* Order Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => reorderFile(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => reorderFile(index, 'down')}
                        disabled={index === uploadedFiles.length - 1}
                        className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                        title="Remove file"
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

        {/* Merge Button Section */}
        {uploadedFiles.length >= 2 && !mergeComplete && (
          <div className="text-center mb-8">
            <button
              onClick={handleMerge}
              disabled={isMerging}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center mx-auto"
            >
              {isMerging ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Merging {uploadedFiles.length} PDFs...
                </>
              ) : (
                <>
                  <Merge className="w-5 h-5 mr-2" />
                  Merge {uploadedFiles.length} PDF Files
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Download Section */}
        {mergeComplete && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Merge Complete!
            </h3>
            <p className="text-gray-600 mb-6">
              Successfully merged {filesMerged} PDF files into one document.
            </p>
            <button 
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center mx-auto"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Merged PDF
            </button>
          </div>
        )}

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Merge className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Easy Reordering</h4>
            <p className="text-sm text-gray-600">
              Drag and drop files to set the perfect merge order for your documents.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">High Quality</h4>
            <p className="text-sm text-gray-600">
              Maintains original quality and formatting of all your PDF documents.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Cloud className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Secure Processing</h4>
            <p className="text-sm text-gray-600">
              Your files are processed securely and deleted immediately after merging.
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Secure PDF Merging</h4>
              <p className="text-blue-800 text-sm">
                All uploaded PDF files are automatically deleted immediately after merging. 
                We use secure local processing to ensure your documents remain private.
              </p>
            </div>
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