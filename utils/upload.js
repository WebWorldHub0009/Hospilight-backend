const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'hospilight-products', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, crop: "scale" }],
  },
});

const upload = multer({ storage });

module.exports = upload;
