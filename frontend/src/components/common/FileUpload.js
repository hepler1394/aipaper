import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FileUpload.css';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList);
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Please select at least one file to upload');
      return;
    }

    setUploading(true);
    setError('');
    
    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + 5;
        });
      }, 300);

      // In a real application, you would use FormData to upload files to your backend
      // For example:
      // const formData = new FormData();
      // files.forEach(file => formData.append('files', file));
      // const response = await axios.post('/api/upload/files', formData);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(interval);
      setUploadProgress(100);
      
      // Simulate successful upload
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
        setFiles([]);
        // Navigate to grading interface or show success message
        navigate('/grade');
      }, 500);
      
    } catch (error) {
      setError('Failed to upload files. Please try again.');
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'zip':
        return '🗜️';
      default:
        return '📄';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="file-upload-container">
      <h2>Upload Papers for Grading</h2>
      
      <div 
        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleChange}
          multiple
          style={{ display: 'none' }}
        />
        <div className="upload-icon">📤</div>
        <p>Drag and drop files here, or click to select files</p>
        <p className="upload-hint">Supported formats: PDF, DOC, DOCX, XLS, XLSX, ZIP</p>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {files.length > 0 && (
        <div className="selected-files">
          <h3>Selected Files ({files.length})</h3>
          <ul className="file-list">
            {files.map((file, index) => (
              <li key={index} className="file-item">
                <div className="file-icon">{getFileIcon(file.name)}</div>
                <div className="file-details">
                  <div className="file-name">{file.name}</div>
                  <div className="file-size">{formatFileSize(file.size)}</div>
                </div>
                <button 
                  className="remove-file-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  disabled={uploading}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {uploading && (
        <div className="upload-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <div className="progress-text">{uploadProgress}% Uploaded</div>
        </div>
      )}
      
      <div className="upload-actions">
        <button 
          className="btn btn-secondary"
          onClick={() => {
            setFiles([]);
            setError('');
          }}
          disabled={uploading || files.length === 0}
        >
          Clear All
        </button>
        <button 
          className="btn btn-primary"
          onClick={handleUpload}
          disabled={uploading || files.length === 0}
        >
          {uploading ? 'Uploading...' : 'Upload Files'}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
