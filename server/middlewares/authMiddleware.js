import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      return next(new AppError('Not authorized, token failed', 401));
    }
  }

  if (!token) {
    return next(new AppError('Not authorized, no token', 401));
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    
    // Normalize roles (Vendor & Farmer are synonymous; Customer & Buyer are synonymous)
    const allowedRoles = new Set(roles);

    // Role Inheritance Logic:
    // Vendor (and Farmer) inherit Customer/Buyer permissions
    // Admin inherits all permissions
    if (userRole === 'Admin') {
      return next();
    }

    if ((userRole === 'Vendor' || userRole === 'Farmer') && (allowedRoles.has('Customer') || allowedRoles.has('Buyer') || allowedRoles.has('Vendor') || allowedRoles.has('Farmer'))) {
      return next();
    }

    if ((userRole === 'Customer' || userRole === 'Buyer') && (allowedRoles.has('Customer') || allowedRoles.has('Buyer'))) {
      return next();
    }

    if (allowedRoles.has(userRole)) {
      return next();
    }

    return next(
      new AppError(`User role '${userRole}' is not authorized to perform this action`, 403)
    );
  };
};
