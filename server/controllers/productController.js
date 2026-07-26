import Product from '../models/productModel.js';
import AppError from '../utils/appError.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const { 
      category, 
      district, 
      town, 
      organic, 
      harvestSeason, 
      vendorName, 
      isAvailable, 
      rating,
      minPrice,
      maxPrice,
      keyword,
      sort,
      page = 1,
      limit = 12
    } = req.query;

    const filter = {};

    // Search by keyword (name or description)
    if (keyword) {
      filter.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ];
    }

    // Exact matches
    if (category) filter.category = category;
    if (district) filter.district = district;
    if (town) filter.town = town;
    if (organic !== undefined) filter.organic = organic === 'true';
    if (harvestSeason) filter.harvestSeason = harvestSeason;
    if (vendorName) filter.vendorName = { $regex: vendorName, $options: 'i' };
    if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';
    
    // Numeric filters
    if (rating) filter.rating = { $gte: Number(rating) };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Sorting
    let sortOptions = { createdAt: -1 }; // Default: Newest
    if (sort === 'price_asc') sortOptions = { price: 1 };
    else if (sort === 'price_desc') sortOptions = { price: -1 };
    else if (sort === 'rating_desc') sortOptions = { rating: -1 };

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .populate('farmer', 'name email')
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      count: products.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
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
    const { name, category, description, price, unit, stock, district, town, organic, harvestSeason, images } = req.body;

    const product = await Product.create({
      farmer: req.user._id,
      vendorName: req.user.name || 'Local Farmer',
      name,
      category,
      description,
      price: Number(price),
      unit,
      stock: Number(stock),
      district: district || 'Idukki',
      town: town || 'Nedumkandam',
      organic: Boolean(organic),
      harvestSeason,
      images: images && images.length > 0 ? images : ['/images/products/green-cardamom.jpg'],
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
