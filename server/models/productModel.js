import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add a product name'],
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: ['Spices', 'Plantation', 'Fruits', 'Vegetables'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    unit: {
      type: String,
      required: [true, 'Please add a unit (e.g., kg, ton)'],
    },
    stock: {
      type: Number,
      required: [true, 'Please add stock amount'],
    },
    location: {
      type: String,
      required: [true, 'Please add source location'],
      enum: ['Theni', 'Idukki'],
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
