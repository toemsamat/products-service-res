import Product from "../models/Product.js";
import Category from "../models/Category.js";

// 🟢 Create Category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const exist = await Category.findOne({ name });
    if (exist)
      return res.status(400).json({ message: "Category already exists" });

    const category = await Category.create({ name, description });
    res.status(201).json({ message: "Category created", category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 Get All Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 Create Product
// export const createProduct = async (req, res) => {
//   try {
//     const { name, description, price, image, category } = req.body;
//     const existCat = await Category.findById(category);
//     if (!existCat) return res.status(404).json({ message: "Category not found" });

//     const product = await Product.create({ name, description, price, image, category });
//     res.status(201).json({ message: "Product created", product });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// 🟢 Create Product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, available } = req.body;

    // ពិនិត្យថា category មាននៅក្នុង DB
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // បង្កើត product ថ្មី
    const newProduct = new Product({
      name,
      description,
      price,
      image,
      category,
      available,
    });

    // save product
    const savedProduct = await newProduct.save();

    // ✅ populate category before sending response
    const populatedProduct = await Product.findById(savedProduct._id).populate(
      "category",
      "name"
    );

    res.status(201).json({
      message: "Product created",
      product: populatedProduct,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 Get Single Product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name"
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 Update Product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
