import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



const uploadOnCloudinary = async (filePath) => {
    try {
        // Check if filePath is provided
        if (!filePath) return null;
        
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.error('File does not exist:', filePath);
            return null;
        }
        
        // Upload to cloudinary
        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto'
        });
        
        // Delete local file after successful upload
        fs.unlinkSync(filePath);
        console.log('File uploaded to Cloudinary:', response.secure_url);
        return response;
        
    } catch (error) {
        // Delete local file even if upload fails
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        console.error('Cloudinary upload error:', error);
        return null;
    }
}

export { uploadOnCloudinary };