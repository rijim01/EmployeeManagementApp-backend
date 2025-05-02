import dotenv from 'dotenv'
dotenv.config()

export default {
  port: process.env.PORT || 4000,
  dbUrl: process.env.MONGO_URL,
  // cloudName: process.env.CLOUDINARY_NAME,
  // cloudApi: process.env.CLOUDINARY_API_KEY,
  // cloudSecret: process.env.CLOUDINARY_SECRET
}