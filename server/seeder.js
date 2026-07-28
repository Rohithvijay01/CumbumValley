import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import User from './models/userModel.js';
import AuctionLot from './models/auctionModel.js';
import Bid from './models/bidModel.js';
import connectDB from './config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const getImagePath = (name, category) => {
  let baseName = name;
  if (name.includes(' (Fresh Batch)')) {
    baseName = name.replace(' (Fresh Batch)', '');
  }
  const filename = baseName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '.jpg';
  const imgPath = path.join(__dirname, '../client/public/images/products', filename);
  if (fs.existsSync(imgPath)) {
    return `/images/products/${filename}`;
  }

  // Check prefix stripped names (e.g. "Organic Pepper" -> "black-pepper.jpg", "Organic Cardamom" -> "green-cardamom.jpg")
  const cleanName = baseName.replace(/^(organic|premium|fresh|certified)\s+/i, '');
  const altFilename = cleanName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '.jpg';
  const altImgPath = path.join(__dirname, '../client/public/images/products', altFilename);
  if (fs.existsSync(altImgPath)) {
    return `/images/products/${altFilename}`;
  }

  // Category fallback real photo mapping
  const categoryPhotoMap = {
    'Spices': '/images/products/green-cardamom.jpg',
    'Plantation Crops': '/images/products/coffee-beans.jpg',
    'Fruits': '/images/products/cumbum-grapes.jpg',
    'Vegetables': '/images/products/tomato.jpg',
    'Seeds': '/images/products/vegetable-seed-kits.jpg',
    'Fertilizers': '/images/products/organic-fertilizer.jpg',
    'Plant Saplings': '/images/products/mango-saplings.jpg',
    'Agricultural Inputs': '/images/products/drip-irrigation-kit.jpg',
    'Organic Products': '/images/products/organic-honey.jpg'
  };

  return categoryPhotoMap[category] || '/images/products/green-cardamom.jpg';
};


connectDB();

const vendors = [
  { name: 'Green Valley Farms', email: 'greenvalley@example.com', password: 'password123', role: 'Farmer', isVerified: true },
  { name: 'Cumbum Spice Traders', email: 'cumbumspice@example.com', password: 'password123', role: 'Farmer', isVerified: true },
  { name: 'Kumily Pepper Estate', email: 'kumilypepper@example.com', password: 'password123', role: 'Farmer', isVerified: true },
  { name: 'Western Ghats Organics', email: 'westernghats@example.com', password: 'password123', role: 'Farmer', isVerified: true },
  { name: 'Theni Agro Mart', email: 'theniagro@example.com', password: 'password123', role: 'Farmer', isVerified: true },
  { name: 'Cardamom Hills Farm', email: 'cardamomhills@example.com', password: 'password123', role: 'Farmer', isVerified: true },
  { name: 'High Range Plantations', email: 'highrange@example.com', password: 'password123', role: 'Farmer', isVerified: true },
  { name: 'Kerala Spice Garden', email: 'keralaspice@example.com', password: 'password123', role: 'Farmer', isVerified: true },
  { name: 'Bodi Fresh Farms', email: 'bodifresh@example.com', password: 'password123', role: 'Farmer', isVerified: true }
];

const theniTowns = ['Theni', 'Cumbum', 'Chinnamanur', 'Bodinayakanur', 'Periyakulam', 'Uthamapalayam', 'Andipatti'];
const idukkiTowns = ['Kumily', 'Thekkady', 'Kattappana', 'Nedumkandam', 'Udumbanchola', 'Peerumedu', 'Vandiperiyar', 'Munnar'];

const productTemplates = [
  // Spices
  { name: 'Green Cardamom', category: 'Spices', district: 'Idukki', organic: true, unit: 'kg', basePrice: 2000, desc: 'Premium hand-picked green cardamom from the high altitudes of Idukki.' },
  { name: 'Premium Cardamom', category: 'Spices', district: 'Idukki', organic: false, unit: 'kg', basePrice: 2200, desc: 'Export quality cardamom, 8mm bold size.' },
  { name: 'Bodinayakanur Cardamom Trading Batch', category: 'Spices', district: 'Theni', organic: false, unit: 'kg', basePrice: 1900, desc: 'Wholesale batch of cardamom from the Cardamom Capital of India.' },
  { name: 'Black Pepper', category: 'Spices', district: 'Idukki', organic: true, unit: 'kg', basePrice: 600, desc: 'Sun-dried high-grade black pepper directly from farms.' },
  { name: 'White Pepper', category: 'Spices', district: 'Idukki', organic: false, unit: 'kg', basePrice: 750, desc: 'Processed premium white pepper.' },
  { name: 'Green Pepper', category: 'Spices', district: 'Idukki', organic: true, unit: 'kg', basePrice: 300, desc: 'Freshly harvested green pepper corns.' },
  { name: 'Clove', category: 'Spices', district: 'Idukki', organic: true, unit: 'kg', basePrice: 850, desc: 'Highly aromatic cloves with rich oil content.' },
  { name: 'Cinnamon', category: 'Spices', district: 'Idukki', organic: true, unit: 'kg', basePrice: 400, desc: 'Sweet and woody natural cinnamon rolls.' },
  { name: 'Nutmeg', category: 'Spices', district: 'Idukki', organic: false, unit: 'kg', basePrice: 500, desc: 'High-quality nutmeg sourced from old plantations.' },
  { name: 'Mace', category: 'Spices', district: 'Idukki', organic: false, unit: 'kg', basePrice: 1200, desc: 'Pure dried mace flowers (Javitri).' },
  { name: 'Turmeric', category: 'Spices', district: 'Idukki', organic: true, unit: 'kg', basePrice: 150, desc: 'High curcumin content turmeric roots.' },
  { name: 'Ginger', category: 'Spices', district: 'Idukki', organic: true, unit: 'kg', basePrice: 120, desc: 'Fresh ginger roots harvested locally.' },
  
  // Plantation Crops
  { name: 'Tea Leaves', category: 'Plantation Crops', district: 'Idukki', organic: false, unit: 'kg', basePrice: 350, desc: 'Fresh tea leaves from the Munnar region.' },
  { name: 'Coffee Beans', category: 'Plantation Crops', district: 'Idukki', organic: false, unit: 'kg', basePrice: 400, desc: 'Unroasted green coffee beans.' },
  { name: 'Arabica Coffee Beans', category: 'Plantation Crops', district: 'Idukki', organic: true, unit: 'kg', basePrice: 500, desc: 'Premium Arabica beans sourced from high elevations.' },
  { name: 'Robusta Coffee Beans', category: 'Plantation Crops', district: 'Idukki', organic: false, unit: 'kg', basePrice: 380, desc: 'Strong Robusta coffee beans directly from plantations.' },

  // Fruits
  { name: 'Cumbum Grapes', category: 'Fruits', district: 'Theni', organic: false, unit: 'kg', basePrice: 80, desc: 'Famous sweet black grapes from Cumbum Valley (GI Tagged).' },
  { name: 'Banana', category: 'Fruits', district: 'Theni', organic: true, unit: 'kg', basePrice: 40, desc: 'Fresh raw plantains and ripe bananas from local groves.' },
  { name: 'Mango', category: 'Fruits', district: 'Theni', organic: false, unit: 'kg', basePrice: 60, desc: 'Seasonal fresh mangoes from Periyakulam.' },
  { name: 'Guava', category: 'Fruits', district: 'Theni', organic: true, unit: 'kg', basePrice: 50, desc: 'Farm fresh sweet guavas.' },
  { name: 'Papaya', category: 'Fruits', district: 'Theni', organic: true, unit: 'kg', basePrice: 30, desc: 'Locally grown organic papaya.' },
  { name: 'Pomegranate', category: 'Fruits', district: 'Theni', organic: false, unit: 'kg', basePrice: 120, desc: 'Red juicy pomegranates from Theni orchards.' },
  { name: 'Jackfruit', category: 'Fruits', district: 'Idukki', organic: true, unit: 'kg', basePrice: 40, desc: 'Large ripe jackfruit from the hills.' },
  { name: 'Orange', category: 'Fruits', district: 'Theni', organic: false, unit: 'kg', basePrice: 90, desc: 'Fresh sweet oranges from Kodaikanal foothills.' },

  // Vegetables
  { name: 'Tomato', category: 'Vegetables', district: 'Theni', organic: false, unit: 'kg', basePrice: 20, desc: 'Farm fresh red tomatoes.' },
  { name: 'Onion', category: 'Vegetables', district: 'Theni', organic: false, unit: 'kg', basePrice: 35, desc: 'Small and big onions from local markets.' },
  { name: 'Garlic', category: 'Vegetables', district: 'Theni', organic: true, unit: 'kg', basePrice: 150, desc: 'Strong flavored country garlic.' },
  { name: 'Chilli', category: 'Vegetables', district: 'Theni', organic: false, unit: 'kg', basePrice: 40, desc: 'Spicy green chillies freshly harvested.' },
  { name: 'Brinjal', category: 'Vegetables', district: 'Theni', organic: true, unit: 'kg', basePrice: 30, desc: 'Purple tender brinjals.' },
  { name: 'Beans', category: 'Vegetables', district: 'Theni', organic: false, unit: 'kg', basePrice: 50, desc: 'Fresh crunchy green beans.' },
  { name: 'Cabbage', category: 'Vegetables', district: 'Theni', organic: false, unit: 'kg', basePrice: 25, desc: 'Large fresh cabbages.' },
  { name: 'Carrot', category: 'Vegetables', district: 'Theni', organic: false, unit: 'kg', basePrice: 40, desc: 'Ooty variety carrots grown locally.' },
  { name: 'Beetroot', category: 'Vegetables', district: 'Theni', organic: true, unit: 'kg', basePrice: 35, desc: 'Fresh dark red beetroots.' },
  { name: 'Potato', category: 'Vegetables', district: 'Theni', organic: false, unit: 'kg', basePrice: 30, desc: 'Freshly dug potatoes.' },
  { name: 'Drumstick', category: 'Vegetables', district: 'Theni', organic: true, unit: 'kg', basePrice: 40, desc: 'Long green drumsticks, famous from Andipatti.' },
  { name: 'Curry Leaves', category: 'Vegetables', district: 'Theni', organic: true, unit: 'kg', basePrice: 25, desc: 'Aromatic fresh curry leaves.' },

  // Seeds & Saplings
  { name: 'Tomato Seeds', category: 'Seeds', district: 'Theni', organic: false, unit: 'packet', basePrice: 50, desc: 'High yield tomato seeds.' },
  { name: 'Chilli Seeds', category: 'Seeds', district: 'Theni', organic: false, unit: 'packet', basePrice: 60, desc: 'Spicy variety chilli seeds.' },
  { name: 'Pepper Seeds', category: 'Seeds', district: 'Idukki', organic: true, unit: 'packet', basePrice: 100, desc: 'High yielding black pepper seeds.' },
  { name: 'Cardamom Seeds', category: 'Seeds', district: 'Idukki', organic: true, unit: 'packet', basePrice: 200, desc: 'Premium Njallani variety cardamom seeds.' },
  { name: 'Vegetable Seed Kits', category: 'Seeds', district: 'Theni', organic: true, unit: 'packet', basePrice: 150, desc: 'Assorted seeds for home gardens.' },
  { name: 'Fruit Saplings', category: 'Plant Saplings', district: 'Theni', organic: true, unit: 'plant', basePrice: 80, desc: 'Healthy grafted fruit saplings.' },
  { name: 'Cardamom Plants', category: 'Plant Saplings', district: 'Idukki', organic: true, unit: 'plant', basePrice: 50, desc: 'Tissue culture cardamom plants.' },
  { name: 'Pepper Vines', category: 'Plant Saplings', district: 'Idukki', organic: true, unit: 'plant', basePrice: 40, desc: 'Rooted pepper vines ready for planting.' },
  { name: 'Coconut Saplings', category: 'Plant Saplings', district: 'Theni', organic: true, unit: 'plant', basePrice: 120, desc: 'Dwarf and tall hybrid coconut saplings.' },
  { name: 'Mango Saplings', category: 'Plant Saplings', district: 'Theni', organic: true, unit: 'plant', basePrice: 100, desc: 'Alphonso and Banganapalli saplings.' },
  { name: 'Banana Plants', category: 'Plant Saplings', district: 'Theni', organic: true, unit: 'plant', basePrice: 30, desc: 'Tissue culture banana plants.' },
  { name: 'Coffee Saplings', category: 'Plant Saplings', district: 'Idukki', organic: true, unit: 'plant', basePrice: 60, desc: 'Healthy Arabica coffee saplings.' },

  // Fertilizers & Agricultural Inputs
  { name: 'Urea', category: 'Fertilizers', district: 'Theni', organic: false, unit: 'bag', basePrice: 300, desc: '45kg bag of agricultural grade Urea.' },
  { name: 'DAP', category: 'Fertilizers', district: 'Theni', organic: false, unit: 'bag', basePrice: 1200, desc: 'Di-ammonium Phosphate fertilizer.' },
  { name: 'NPK', category: 'Fertilizers', district: 'Theni', organic: false, unit: 'bag', basePrice: 1400, desc: 'Complex NPK fertilizer for crops.' },
  { name: 'Potash', category: 'Fertilizers', district: 'Theni', organic: false, unit: 'bag', basePrice: 900, desc: 'Muriate of Potash.' },
  { name: 'Organic Fertilizer', category: 'Fertilizers', district: 'Idukki', organic: true, unit: 'bag', basePrice: 400, desc: 'All natural organic mix for spices.' },
  { name: 'Vermicompost', category: 'Fertilizers', district: 'Theni', organic: true, unit: 'bag', basePrice: 350, desc: 'High quality earthworm compost.' },
  { name: 'Cow Manure', category: 'Fertilizers', district: 'Theni', organic: true, unit: 'ton', basePrice: 2000, desc: 'Dried and aged cow manure by the ton.' },
  { name: 'Neem Cake', category: 'Fertilizers', district: 'Theni', organic: true, unit: 'kg', basePrice: 40, desc: 'Organic pest repellent and fertilizer.' },
  { name: 'Bio Fertilizer', category: 'Fertilizers', district: 'Idukki', organic: true, unit: 'litre', basePrice: 250, desc: 'Liquid bio-fertilizer for foliar spray.' },
  { name: 'Micronutrient Mix', category: 'Fertilizers', district: 'Theni', organic: false, unit: 'kg', basePrice: 150, desc: 'Essential micronutrients for vegetable crops.' },
  { name: 'Drip Irrigation Kit', category: 'Agricultural Inputs', district: 'Theni', organic: false, unit: 'packet', basePrice: 2500, desc: 'Complete drip irrigation set for 1 acre.' },
  { name: 'Mulching Sheet', category: 'Agricultural Inputs', district: 'Theni', organic: false, unit: 'bag', basePrice: 1800, desc: 'Agricultural plastic mulching roll.' },

  // Organic Products
  { name: 'Organic Pepper', category: 'Organic Products', district: 'Idukki', organic: true, unit: 'kg', basePrice: 800, desc: 'Certified organic black pepper.' },
  { name: 'Organic Cardamom', category: 'Organic Products', district: 'Idukki', organic: true, unit: 'kg', basePrice: 2800, desc: 'Certified organic green cardamom.' },
  { name: 'Organic Coffee', category: 'Organic Products', district: 'Idukki', organic: true, unit: 'kg', basePrice: 650, desc: 'Certified organic coffee beans.' },
  { name: 'Organic Tea', category: 'Organic Products', district: 'Idukki', organic: true, unit: 'kg', basePrice: 500, desc: 'Certified organic pesticide-free tea leaves.' },
  { name: 'Organic Honey', category: 'Organic Products', district: 'Idukki', organic: true, unit: 'kg', basePrice: 450, desc: 'Pure wild honey collected from the Western Ghats.' }
];

const generateProducts = (users) => {
  const products = [];
  
  // We want to generate ~80-100 products. We will loop through the templates
  // and sometimes create variations.
  for (let template of productTemplates) {
    const randomVendor = users[Math.floor(Math.random() * users.length)];
    const townList = template.district === 'Theni' ? theniTowns : idukkiTowns;
    const town = townList[Math.floor(Math.random() * townList.length)];
    
    // Vary the price slightly
    const priceVariance = (Math.random() * 0.2) - 0.1; // +/- 10%
    const price = Math.round(template.basePrice * (1 + priceVariance));
    
    products.push({
      farmer: randomVendor._id,
      vendorName: randomVendor.name,
      name: template.name,
      category: template.category,
      description: template.desc,
      price: price,
      unit: template.unit,
      stock: Math.floor(Math.random() * 500) + 20, // 20 to 520
      district: template.district,
      town: town,
      images: [getImagePath(template.name, template.category)],
      organic: template.organic,
      harvestSeason: ['Summer', 'Winter', 'Monsoon', 'All Year'][Math.floor(Math.random() * 4)],
      rating: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
      deliveryRadius: Math.floor(Math.random() * 100) + 100, // 100 to 200
      isAvailable: Math.random() > 0.1 // 90% available
    });
    
    // Some popular items get duplicate listings from different vendors
    if (['Tomato', 'Banana', 'Black Pepper', 'Green Cardamom', 'Tea Leaves', 'Onion'].includes(template.name)) {
      const randomVendor2 = users[Math.floor(Math.random() * users.length)];
      const town2 = townList[Math.floor(Math.random() * townList.length)];
      const price2 = Math.round(template.basePrice * (1 + ((Math.random() * 0.3) - 0.15)));
      products.push({
        farmer: randomVendor2._id,
        vendorName: randomVendor2.name,
        name: template.name + ' (Fresh Batch)',
        category: template.category,
        description: template.desc + ' Newly harvested batch.',
        price: price2,
        unit: template.unit,
        stock: Math.floor(Math.random() * 300) + 50,
        district: template.district,
        town: town2,
        images: [getImagePath(template.name + ' Fresh', template.category)],
        organic: template.organic,
        harvestSeason: ['Summer', 'Winter', 'Monsoon', 'All Year'][Math.floor(Math.random() * 4)],
        rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)), // 3.5 to 5.0
        deliveryRadius: Math.floor(Math.random() * 100) + 100,
        isAvailable: true
      });
    }
  }
  return products;
};

const importData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await AuctionLot.deleteMany();
    await Bid.deleteMany();

    console.log('Inserting vendors...');
    const createdUsers = await User.insertMany(vendors);
    console.log(`${createdUsers.length} vendors inserted.`);

    console.log('Generating products...');
    const sampleProducts = generateProducts(createdUsers);
    
    console.log('Inserting products...');
    await Product.insertMany(sampleProducts);
    console.log(`${sampleProducts.length} realistic products imported successfully!`);

    console.log('Inserting live e-auction lots...');
    const sampleAuctions = [
      {
        productName: 'Idukki 8mm Bold Green Cardamom (Export Grade)',
        lotNumber: 'LOT-2026-CARD-001',
        quantity: 500,
        basePrice: 2850,
        minBidIncrement: 10,
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 48 * 60 * 60 * 1000),
        status: 'Active',
        farmer: createdUsers[0]._id,
        farmLocation: 'Nedumkandam, Idukki',
        images: ['/images/products/green-cardamom.jpg'],
        organicBadge: true,
        podSize: 8.5,
        colour: 'Deep Forest Green',
        aroma: 'Rich Camphorous & Sweet',
        moisture: 9.8,
        volatileOil: 8.1,
        harvestDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        qualityGrade: 'A+'
      },
      {
        productName: 'Bodinayakanur MG1 Black Pepper (High Piperine)',
        lotNumber: 'LOT-2026-PEPP-002',
        quantity: 1000,
        basePrice: 690,
        minBidIncrement: 5,
        startTime: new Date(Date.now() - 5 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
        status: 'Active',
        farmer: createdUsers[1]._id,
        farmLocation: 'Bodinayakanur, Theni',
        images: ['/images/products/black-pepper.jpg'],
        organicBadge: true,
        podSize: 5.0,
        colour: 'Sun-dried Charcoal Black',
        aroma: 'Pungent & Spicy',
        moisture: 10.2,
        volatileOil: 6.5,
        harvestDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        qualityGrade: 'A+'
      },
      {
        productName: 'Munnar Organic Orthodox Whole Leaf Tea',
        lotNumber: 'LOT-2026-TEA-003',
        quantity: 350,
        basePrice: 480,
        minBidIncrement: 5,
        startTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 36 * 60 * 60 * 1000),
        status: 'Active',
        farmer: createdUsers[2]._id,
        farmLocation: 'Munnar, Idukki',
        images: ['/images/products/tea-leaves.jpg'],
        organicBadge: true,
        podSize: 3.5,
        colour: 'Dark Golden Amber',
        aroma: 'Floral & Malty',
        moisture: 4.5,
        volatileOil: 4.2,
        harvestDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        qualityGrade: 'A'
      },
      {
        productName: 'Kattappana Single-Origin Arabica Coffee Beans',
        lotNumber: 'LOT-2026-COFF-004',
        quantity: 600,
        basePrice: 520,
        minBidIncrement: 10,
        startTime: new Date(Date.now() - 12 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 60 * 60 * 60 * 1000),
        status: 'Active',
        farmer: createdUsers[3]._id,
        farmLocation: 'Kattappana, Idukki',
        images: ['/images/products/arabica-coffee-beans.jpg'],
        organicBadge: true,
        podSize: 7.0,
        colour: 'Uniform Olive Green',
        aroma: 'Chocolatey & Nutty',
        moisture: 11.0,
        volatileOil: 5.8,
        harvestDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        qualityGrade: 'A+'
      },
      {
        productName: 'Periyakulam Organic Clove Buds (Extra Bold)',
        lotNumber: 'LOT-2026-CLOV-005',
        quantity: 250,
        basePrice: 920,
        minBidIncrement: 15,
        startTime: new Date(Date.now() - 3 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 18 * 60 * 60 * 1000),
        status: 'Active',
        farmer: createdUsers[4]._id,
        farmLocation: 'Periyakulam, Theni',
        images: ['/images/products/clove.jpg'],
        organicBadge: true,
        podSize: 12.0,
        colour: 'Reddish Dark Brown',
        aroma: 'Eugenol Rich Warm Spice',
        moisture: 8.5,
        volatileOil: 18.5,
        harvestDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        qualityGrade: 'A+'
      }
    ];

    await AuctionLot.insertMany(sampleAuctions);
    console.log(`${sampleAuctions.length} live e-auction lots seeded successfully!`);

    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

importData();
