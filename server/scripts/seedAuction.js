import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
import Auction from '../models/auctionModel.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const seedAuction = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Find a farmer
    const farmer = await User.findOne({ role: 'Farmer' });
    if (!farmer) {
      console.log('No farmer found. Creating one...');
      return;
    }

    // Create a live auction that ends in 1 hour
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 1);

    const auction = await Auction.create({
      productName: 'Premium 8mm Bold Green Cardamom',
      farmer: farmer._id,
      lotNumber: 'L-' + Math.floor(1000 + Math.random() * 9000),
      quantity: 50,
      basePrice: 3200,
      minBidIncrement: 50,
      qualityGrade: 'A+',
      farmLocation: 'Puttady, Idukki',
      podSize: 8,
      moisture: 10,
      colour: 'Deep Green',
      volatileOil: 8.5,
      aroma: 'Intense',
      harvestDate: new Date('2024-01-15'),
      organicBadge: true,
      verifiedFarmerBadge: true,
      startTime: new Date(),
      endTime,
      status: 'Active',
      bids: [],
    });

    console.log('✅ Successfully seeded an Active Auction:', auction.productName);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding auction:', error);
    process.exit(1);
  }
};

seedAuction();
