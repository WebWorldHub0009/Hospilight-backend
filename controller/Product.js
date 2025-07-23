const Product = require('../models/ProductModel');

const CreateProduct = async (req, res) => {
    const { category, title, description, price } = req.body;
    const image = req.file?.path; // Assuming you upload image using multer with cloudinary

    // Validation
    if (!category || !title || !description || !price || !image) {
        return res.status(400).json({ message: "All fields including image are required" });
    }

    try {
        const newProduct = await Product.create({
            category,
            title,
            description,
            price,
            image
        });

        res.status(201).json({
            message: "Product created successfully",
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const UpdateProduct = async (req, res) => {
    const { id } = req.params;
    const { category, title, description, price } = req.body;
    const image = req.file?.path;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.category = category || product.category;
        product.title = title || product.title;
        product.description = description || product.description;
        product.price = price || product.price;
        if (image) product.image = image;

        await product.save();

        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const DeleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await Product.findByIdAndDelete(id);

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


const getSingleProduct = async (req, res) => {
   try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.log("Product fetch error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getAllProducts = async (req, res) => {
    try {
        const { category } = req.query;

        const filter = category ? { category } : {};
        const products = await Product.find(filter);

        res.status(200).json({
            success: true,
            message: category
                ? `✅ Products fetched for category: ${category}`
                : "✅ All products fetched successfully",
            count: products.length,
            products,
        });
    } catch (err) {
        console.error("❌ Error in getAllProducts:", err);
        res.status(500).json({
            success: false,
            message: "❌ Server error while fetching products",
        });
    }
};



module.exports = {
    CreateProduct,
    UpdateProduct,
    DeleteProduct,
    getAllProducts,
    getSingleProduct
};
