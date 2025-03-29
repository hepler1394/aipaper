const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { v4: uuidv4 } = require('uuid');

// File upload directory
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Helper to get file extension
const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase();
};

// Helper to check if file type is supported
const isSupportedFileType = (fileExt) => {
  const supportedTypes = ['pdf', 'doc', 'docx', 'txt', 'rtf', 'xlsx', 'xls', 'csv', 'zip'];
  return supportedTypes.includes(fileExt);
};

// Helper to extract text from PDF
const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
};

// Helper to extract text from DOCX
const extractTextFromDOCX = async (filePath) => {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (error) {
    console.error('Error extracting text from DOCX:', error);
    throw new Error('Failed to extract text from DOCX');
  }
};

// Helper to extract text from TXT
const extractTextFromTXT = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error('Error extracting text from TXT:', error);
    throw new Error('Failed to extract text from TXT');
  }
};

// Helper to extract content based on file type
const extractFileContent = async (filePath, fileExt) => {
  switch (fileExt) {
    case 'pdf':
      return await extractTextFromPDF(filePath);
    case 'docx':
    case 'doc':
      return await extractTextFromDOCX(filePath);
    case 'txt':
    case 'rtf':
      return extractTextFromTXT(filePath);
    default:
      throw new Error(`Extraction not supported for ${fileExt} files`);
  }
};

// Upload a single file
exports.uploadFile = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const file = req.files.file;
    const fileExt = getFileExtension(file.name);

    // Check if file type is supported
    if (!isSupportedFileType(fileExt)) {
      return res.status(400).json({ 
        success: false, 
        message: `File type .${fileExt} is not supported` 
      });
    }

    // Generate unique filename
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    // Move file to upload directory
    await file.mv(filePath);

    // Create file metadata
    const fileData = {
      id: uuidv4(),
      originalName: file.name,
      fileName: fileName,
      filePath: filePath,
      fileType: fileExt,
      fileSize: file.size,
      uploadDate: new Date(),
      status: 'uploaded'
    };

    // Extract content if it's a text-based file
    if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(fileExt)) {
      try {
        const content = await extractFileContent(filePath, fileExt);
        fileData.extractedText = content;
        fileData.status = 'processed';
      } catch (error) {
        console.error('Error extracting content:', error);
        fileData.status = 'processing_failed';
        fileData.error = error.message;
      }
    }

    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      file: fileData
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to upload file',
      error: error.message
    });
  }
};

// Upload multiple files
exports.uploadMultipleFiles = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    const uploadedFiles = [];
    const files = Array.isArray(req.files.files) ? req.files.files : [req.files.files];

    for (const file of files) {
      const fileExt = getFileExtension(file.name);

      // Check if file type is supported
      if (!isSupportedFileType(fileExt)) {
        uploadedFiles.push({
          originalName: file.name,
          success: false,
          message: `File type .${fileExt} is not supported`
        });
        continue;
      }

      // Generate unique filename
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = path.join(UPLOAD_DIR, fileName);

      // Move file to upload directory
      await file.mv(filePath);

      // Create file metadata
      const fileData = {
        id: uuidv4(),
        originalName: file.name,
        fileName: fileName,
        filePath: filePath,
        fileType: fileExt,
        fileSize: file.size,
        uploadDate: new Date(),
        status: 'uploaded',
        success: true
      };

      // Extract content if it's a text-based file
      if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(fileExt)) {
        try {
          const content = await extractFileContent(filePath, fileExt);
          fileData.extractedText = content;
          fileData.status = 'processed';
        } catch (error) {
          console.error('Error extracting content:', error);
          fileData.status = 'processing_failed';
          fileData.error = error.message;
        }
      }

      uploadedFiles.push(fileData);
    }

    return res.status(200).json({
      success: true,
      message: 'Files uploaded successfully',
      files: uploadedFiles
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to upload files',
      error: error.message
    });
  }
};

// Upload and extract zip file
exports.uploadAndExtractZip = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const zipFile = req.files.file;
    const fileExt = getFileExtension(zipFile.name);

    // Check if file is a zip
    if (fileExt !== 'zip') {
      return res.status(400).json({ 
        success: false, 
        message: 'Uploaded file is not a ZIP archive' 
      });
    }

    // Generate unique batch ID for this zip extraction
    const batchId = uuidv4();
    
    // Create batch directory
    const batchDir = path.join(UPLOAD_DIR, batchId);
    fs.mkdirSync(batchDir, { recursive: true });

    // Save zip file temporarily
    const zipPath = path.join(batchDir, `${uuidv4()}.zip`);
    await zipFile.mv(zipPath);

    // Extract zip file
    const zip = new AdmZip(zipPath);
    const zipEntries = zip.getEntries();
    
    const extractedFiles = [];

    // Process each file in the zip
    for (const entry of zipEntries) {
      if (entry.isDirectory) continue;

      const entryName = entry.entryName;
      const fileName = path.basename(entryName);
      const fileExt = getFileExtension(fileName);

      // Skip unsupported file types
      if (!isSupportedFileType(fileExt)) {
        extractedFiles.push({
          originalName: fileName,
          success: false,
          message: `File type .${fileExt} is not supported`
        });
        continue;
      }

      // Generate unique filename
      const uniqueFileName = `${uuidv4()}.${fileExt}`;
      const filePath = path.join(batchDir, uniqueFileName);

      // Extract file
      zip.extractEntryTo(entryName, batchDir, false, true, false, uniqueFileName);

      // Create file metadata
      const fileData = {
        id: uuidv4(),
        batchId: batchId,
        originalName: fileName,
        fileName: uniqueFileName,
        filePath: filePath,
        fileType: fileExt,
        fileSize: entry.header.size,
        uploadDate: new Date(),
        status: 'extracted',
        success: true
      };

      // Extract content if it's a text-based file
      if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(fileExt)) {
        try {
          const content = await extractFileContent(filePath, fileExt);
          fileData.extractedText = content;
          fileData.status = 'processed';
        } catch (error) {
          console.error('Error extracting content:', error);
          fileData.status = 'processing_failed';
          fileData.error = error.message;
        }
      }

      extractedFiles.push(fileData);
    }

    // Delete the temporary zip file
    fs.unlinkSync(zipPath);

    return res.status(200).json({
      success: true,
      message: 'ZIP file extracted successfully',
      batchId: batchId,
      files: extractedFiles
    });
  } catch (error) {
    console.error('Error processing ZIP file:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process ZIP file',
      error: error.message
    });
  }
};

// Get file content
exports.getFileContent = async (req, res) => {
  try {
    const { fileId } = req.params;
    
    // In a real application, you would fetch the file info from a database
    // For this example, we'll assume the fileId is the filename
    const filePath = path.join(UPLOAD_DIR, fileId);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    const fileExt = getFileExtension(fileId);

    // Extract content based on file type
    if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(fileExt)) {
      try {
        const content = await extractFileContent(filePath, fileExt);
        return res.status(200).json({
          success: true,
          content: content
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: 'Failed to extract file content',
          error: error.message
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: `Content extraction not supported for ${fileExt} files`
      });
    }
  } catch (error) {
    console.error('Error getting file content:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get file content',
      error: error.message
    });
  }
};

// Delete file
exports.deleteFile = (req, res) => {
  try {
    const { fileId } = req.params;
    
    // In a real application, you would fetch the file info from a database
    // For this example, we'll assume the fileId is the filename
    const filePath = path.join(UPLOAD_DIR, fileId);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Delete the file
    fs.unlinkSync(filePath);

    return res.status(200).json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete file',
      error: error.message
    });
  }
};
