import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  available: { type: Boolean, default: true },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
