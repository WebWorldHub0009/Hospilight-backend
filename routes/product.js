const express = require('express');
const router = express.Router();
const { CreateProduct, UpdateProduct, DeleteProduct, getAllProducts, getSingleProduct } = require('../controller/Product');
const verifyToken = require('../middleware/AuthMiddleware');
const upload = require('../utils/upload');

// ✅ Create Product with Image Upload
router.post('/create', verifyToken, upload.single('image'), CreateProduct);

// ✅ Update Product (Optional Image Upload)
router.put('/update/:id', verifyToken, upload.single('image'), UpdateProduct);

// ✅ Delete Product
router.delete('/delete/:id', verifyToken, DeleteProduct);

// ✅ Get All Products
router.get('/getAll', getAllProducts);

router.get('/get/:id', getSingleProduct);

module.exports = router;
