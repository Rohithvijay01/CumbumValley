import Product from '../models/productModel.js';
import AppError from '../utils/appError.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const { category, location } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (location) filter.location = location;

    const products = await Product.find(filter).populate('farmer', 'name email');
    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('farmer', 'name email');
    if (product) {
      res.json({ success: true, data: product });
    } else {
      next(new AppError('Product not found', 404));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Farmer
export const createProduct = async (req, res, next) => {
  try {
    const { name, category, description, price, unit, stock, location, images } = req.body;

    const product = await Product.create({
      farmer: req.user._id,
      name,
      category,
      description,
      price,
      unit,
      stock,
      location,
      images: images || [],
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Farmer
export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    // Ensure the farmer owns the product
    if (product.farmer.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return next(new AppError('User not authorized to update this product', 403));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Farmer
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    if (product.farmer.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return next(new AppError('User not authorized to delete this product', 403));
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
