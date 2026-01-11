import { v2 as cloudinary } from 'cloudinary';
import { deleteFile } from './cleanupTemp.js';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Always use HTTPS URLs
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      console.error('No file path provided to uploadOnCloudinary');
      return null;
    }

    if (!fs.existsSync(filePath)) {
      console.error(`File not found for upload: ${filePath}`);
      return null;
    }

    console.log(`Starting Cloudinary upload for: ${filePath}`);
    const fileStats = fs.statSync(filePath);
    console.log(`File size: ${(fileStats.size / 1024 / 1024).toFixed(2)}MB`);
    
    const uploadOptions = {
      resource_type: 'auto',
      secure: true,
      timeout: 600000, // 10 minutes
      chunk_size: 6000000, // 6MB chunks for large files
    };
    
    // Use chunked upload for files larger than 100MB
    if (fileStats.size > 100 * 1024 * 1024) {
      uploadOptions.upload_preset = undefined; // Remove if set
      console.log('Using chunked upload for large file');
    }
    
    const response = await cloudinary.uploader.upload(filePath, uploadOptions);

    // Force HTTPS URL
    if (response.secure_url) {
      response.url = response.secure_url;
    }

    console.log('Cloudinary upload successful:', response.public_id);
    // Always delete temp file after successful upload
    deleteFile(filePath);
    return response;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    // Always try to clean up temp file even on error
    deleteFile(filePath);
    throw error; // Re-throw to let controller handle it
  }
};

const deleteFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return null;
    // Extract public_id from Cloudinary URL
    const publicId = imageUrl.split('/').pop().split('.')[0];

    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (error) {
    // Silently fail - deletion errors shouldn't break the app
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
