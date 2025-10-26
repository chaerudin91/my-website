'use client';

import React, { useState } from 'react';
import { ChevronRight, Download, Upload, FileText, Image, File, X, Plus, ExternalLink, Eye, Edit, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const ExportProcess = () => {
  const [activeStep, setActiveStep] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, name: 'Product Catalog', type: 'PDF', size: '2.4 MB', uploadDate: '2025-01-15' },
    { id: 2, name: 'Company Profile', type: 'PDF', size: '1.8 MB', uploadDate: '2025-01-10' },
    { id: 3, name: 'Price List 2025', type: 'XLSX', size: '456 KB', uploadDate: '2025-01-20' },
    { id: 4, name: 'Certification Documents', type: 'ZIP', size: '5.2 MB', uploadDate: '2025-01-05' }
  ]);
  const [newFileName, setNewFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const processSteps = [
    { 
      step: '1', 
      title: 'Market Research', 
      status: 'Completed', 
      color: '#4ade80',
      icon: <CheckCircle className="w-5 h-5" />,
      description: 'Identified target markets and analyzed competition',
      completedDate: '2025-01-10'
    },
    { 
      step: '2', 
      title: 'Product Registration', 
      status: 'Completed', 
      color: '#4ade80',
      icon: <CheckCircle className="w-5 h-5" />,
      description: 'Products registered with export authorities',
      completedDate: '2025-01-15'
    },
    { 
      step: '3', 
      title: 'Documentation Preparation', 
      status: 'In Progress', 
      color: '#ffa629',
      icon: <Clock className="w-5 h-5" />,
      description: 'Preparing export documents and certificates',
      progress: 65
    },
    { 
      step: '4', 
      title: 'Buyer Connection', 
      status: 'Pending', 
      color: '#d1d5db',
      icon: <AlertCircle className="w-5 h-5" />,
      description: 'Awaiting buyer confirmation and contract signing'
    },
    { 
      step: '5', 
      title: 'Shipping & Logistics', 
      status: 'Pending', 
      color: '#d1d5db',
      icon: <AlertCircle className="w-5 h-5" />,
      description: 'Logistics planning and shipping arrangements'
    }
  ];

  const mediaChannels = [
    { 
      platform: 'LinkedIn Business', 
      metric: 'Followers',
      value: '2,345', 
      status: 'Active',
      growth: '+12%',
      link: 'https://linkedin.com'
    },
    { 
      platform: 'Trade Portal', 
      metric: 'Visitors',
      value: '1,876', 
      status: 'Active',
      growth: '+8%',
      link: '#'
    },
    { 
      platform: 'B2B Marketplace', 
      metric: 'Listings',
      value: '12', 
      status: 'Active',
      growth: '+3',
      link: '#'
    },
    { 
      platform: 'Export Directory', 
      metric: 'Views',
      value: '5,432', 
      status: 'Active',
      growth: '+18%',
      link: '#'
    }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setNewFileName(file.name);
    }
  };

  const handleSubmitUpload = () => {
    if (selectedFile && newFileName) {
      const newFile = {
        id: uploadedFiles.length + 1,
        name: newFileName,
        type: selectedFile.name.split('.').pop().toUpperCase(),
        size: (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB',
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setUploadedFiles([...uploadedFiles, newFile]);
      setUploadModalOpen(false);
      setSelectedFile(null);
      setNewFileName('');
      alert('File uploaded successfully!');
    } else {
      alert('Please select a file first!');
    }
  };

  const handleDeleteFile = (id) => {
    if (confirm('Are you sure you want to delete this file?')) {
      setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
      alert('File deleted successfully!');
    }
  };

  const handleDownloadFile = (fileName) => {
    alert(`Downloading ${fileName}...`);
    // In real application, this would trigger actual download
  };

  const getFileIcon = (type) => {
    switch(type.toUpperCase()) {
      case 'PDF':
        return <FileText className="w-5 h-5" style={{ color: '#bc1823' }} />;
      case 'XLSX':
      case 'XLS':
        return <File className="w-5 h-5" style={{ color: '#10b981' }} />;
      case 'ZIP':
        return <File className="w-5 h-5" style={{ color: '#6366f1' }} />;
      case 'PNG':
      case 'JPG':
      case 'JPEG':
        return <Image className="w-5 h-5" style={{ color: '#f59e0b' }} />;
      default:
        return <File className="w-5 h-5" style={{ color: '#6b7280' }} />;
    }
  };

  return (
    <div>
      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold" style={{ color: '#000' }}>Upload New Material</h3>
              <button onClick={() => setUploadModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#000' }}>
                  Select File
                </label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                  accept=".pdf,.xlsx,.xls,.zip,.png,.jpg,.jpeg,.docx"
                />
                {selectedFile && (
                  <p className="text-sm mt-2" style={{ color: '#000' }}>
                    Selected: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#000' }}>
                  File Name
                </label>
                <input
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="Enter file name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                />
              </div>

              <button
                onClick={handleSubmitUpload}
                className="w-full px-6 py-3 rounded-lg text-white font-semibold"
                style={{ backgroundColor: '#bc1823' }}
              >
                Upload File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#000' }}>
            Export Process & Promotion
          </h1>
          <p style={{ color: '#000' }}>Track your export journey and manage promotional materials</p>
        </div>
      </div>
      
      {/* Export Journey */}
      <div className="bg-white rounded-xl p-6 shadow-lg mb-6 border-2" style={{ borderColor: '#f0f0f0' }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: '#bc1823' }}>Your Export Journey</h2>
          <div className="text-sm" style={{ color: '#000' }}>
            <span className="font-semibold">Progress: </span>
            <span>40% Complete</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="h-3 rounded-full" style={{ backgroundColor: '#bc1823', width: '40%' }}></div>
          </div>
        </div>

        <div className="space-y-3">
          {processSteps.map((item, index) => (
            <div 
              key={index} 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                activeStep === index ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setActiveStep(activeStep === index ? null : index)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style={{ backgroundColor: item.color }}>
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold" style={{ color: '#000' }}>{item.title}</h3>
                    <div style={{ color: item.color }}>
                      {item.icon}
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: '#000' }}>
                    {item.status}
                    {item.completedDate && ` • Completed on ${item.completedDate}`}
                  </p>
                  {item.progress && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ backgroundColor: item.color, width: `${item.progress}%` }}></div>
                      </div>
                      <p className="text-xs mt-1" style={{ color: '#000' }}>{item.progress}% complete</p>
                    </div>
                  )}
                </div>
                <ChevronRight className={`w-6 h-6 text-gray-400 transition-transform ${activeStep === index ? 'rotate-90' : ''}`} />
              </div>
              
              {activeStep === index && (
                <div className="mt-4 pl-16 pt-3 border-t-2 border-gray-200">
                  <p className="text-sm" style={{ color: '#000' }}>{item.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Promotional Materials */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-2" style={{ borderColor: '#f0f0f0' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold" style={{ color: '#bc1823' }}>Promotional Materials</h2>
            <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: '#fef3e4', color: '#000' }}>
              {uploadedFiles.length} Files
            </span>
          </div>

          <div className="space-y-3 mb-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="group p-4 border-2 border-gray-200 rounded-lg hover:border-red-600 transition-all">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate" style={{ color: '#000' }}>{file.name}</p>
                    <p className="text-sm" style={{ color: '#000' }}>
                      {file.type} • {file.size} • Uploaded {file.uploadDate}
                    </p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleDownloadFile(file.name)}
                      className="p-2 rounded-lg hover:bg-gray-100"
                      title="Download"
                    >
                      <Download className="w-4 h-4" style={{ color: '#000' }} />
                    </button>
                    <button 
                      onClick={() => alert(`Viewing ${file.name}`)}
                      className="p-2 rounded-lg hover:bg-gray-100"
                      title="View"
                    >
                      <Eye className="w-4 h-4" style={{ color: '#000' }} />
                    </button>
                    <button 
                      onClick={() => handleDeleteFile(file.id)}
                      className="p-2 rounded-lg hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" style={{ color: '#bc1823' }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setUploadModalOpen(true)}
            className="w-full py-3 rounded-lg border-2 border-dashed font-semibold transition-all hover:bg-red-50 flex items-center justify-center gap-2" 
            style={{ borderColor: '#bc1823', color: '#bc1823' }}
          >
            <Plus className="w-5 h-5" />
            Upload New Material
          </button>
        </div>

        {/* Media Channels */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-2" style={{ borderColor: '#f0f0f0' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold" style={{ color: '#bc1823' }}>Media Channels</h2>
            <span className="text-sm px-3 py-1 rounded-full bg-green-100" style={{ color: '#000' }}>
              All Active
            </span>
          </div>

          <div className="space-y-3">
            {mediaChannels.map((channel, index) => (
              <div key={index} className="p-4 border-2 border-gray-200 rounded-lg hover:border-red-600 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold flex items-center gap-2" style={{ color: '#000' }}>
                      {channel.platform}
                      <a 
                        href={channel.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ExternalLink className="w-4 h-4" style={{ color: '#bc1823' }} />
                      </a>
                    </h3>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      {channel.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold" style={{ color: '#bc1823' }}>
                      {channel.value}
                    </p>
                    <p className="text-sm" style={{ color: '#000' }}>
                      {channel.metric}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-600">
                      {channel.growth}
                    </p>
                    <p className="text-xs" style={{ color: '#000' }}>This month</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            className="w-full mt-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2" 
            style={{ backgroundColor: '#bc1823', color: 'white' }}
            onClick={() => alert('Add new media channel')}
          >
            <Plus className="w-5 h-5" />
            Add New Channel
          </button>
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="mt-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border-2" style={{ borderColor: '#bc1823' }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: '#bc1823' }}>Export Performance Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold" style={{ color: '#bc1823' }}>15</p>
            <p className="text-sm" style={{ color: '#000' }}>Total Exports</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold" style={{ color: '#bc1823' }}>8</p>
            <p className="text-sm" style={{ color: '#000' }}>Active Countries</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold" style={{ color: '#bc1823' }}>$245K</p>
            <p className="text-sm" style={{ color: '#000' }}>Total Value</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold" style={{ color: '#bc1823' }}>94%</p>
            <p className="text-sm" style={{ color: '#000' }}>Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportProcess;