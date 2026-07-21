import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    vendorName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please add a product name'],
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
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
      required: [true, 'Please add a unit (e.g., kg, ton, bag, plant, packet, litre)'],
    },
    stock: {
      type: Number,
      required: [true, 'Please add stock amount'],
    },
    district: {
      type: String,
      required: [true, 'Please add a district'],
      enum: ['Theni', 'Idukki'],
    },
    town: {
      type: String,
      required: [true, 'Please add a town'],
    },
    images: [
      {
        type: String,
      },
    ],
    organic: {
      type: Boolean,
      default: false,
    },
    harvestSeason: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    deliveryRadius: {
      type: Number,
      default: 100,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
