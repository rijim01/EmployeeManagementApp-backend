import multer from "multer";
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import cloudinary from "../config/cloudinary.js";


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "myUploads",
    format: async (req, file) => {
      const fileFormat = file.mimetype.split('/')[1]; // Extracts "jpeg", "png", etc.
      return fileFormat; // Return the appropriate image format dynamically
  },
   public_id: (req, file) => file.originalname.split('.')[0] + ""
  }
})
const cloudinaryFileUploader = multer({ storage: storage });
export default cloudinaryFileUploader
