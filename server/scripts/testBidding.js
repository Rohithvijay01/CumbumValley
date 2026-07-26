import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { io as Client } from 'socket.io-client';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/userModel.js';
import Auction from '../models/auctionModel.js';
import Bid from '../models/bidModel.js';
import socketHandler from '../socket.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const runTest = async () => {
  let server, clientSocket;
  try {
    console.log('🔄 Connecting to Database...');
    await mongoose.connect(process.env.MONGO_URI);
    
    // Find active auction
    const auction = await Auction.findOne({ status: 'Active' });
    if (!auction) {
      throw new Error('No active auction found. Please run seedAuction.js first.');
    }

    // Find or create a buyer
    let buyer = await User.findOne({ role: 'Buyer' });
    if (!buyer) {
      buyer = await User.create({
        name: 'Test Customer',
        email: 'customer@test.com',
        password: 'password123',
        role: 'Buyer',
      });
      console.log('✅ Created mock customer account.');
    }

    console.log(`✅ Test Target: Auction [${auction.productName}] by Buyer [${buyer.name}]`);

    // Setup dummy server for socket testing
    const app = express();
    server = http.createServer(app);
    const io = new Server(server);
    socketHandler(io);

    await new Promise((resolve) => server.listen(5005, resolve));
    console.log('✅ Temporary Socket Server listening on port 5005');

    // Connect Client
    clientSocket = Client('http://localhost:5005');

    await new Promise((resolve, reject) => {
      clientSocket.on('connect', resolve);
      setTimeout(() => reject(new Error('Socket client timeout')), 5000);
    });

    console.log('✅ Client Socket Connected');

    // Test Room Join
    clientSocket.emit('join_auction', auction._id.toString());
    
    // Calculate Valid Bid Amount
    const bidAmount = auction.currentHighestBid ? 
      (await Bid.findById(auction.currentHighestBid)).amount + auction.minBidIncrement : 
      auction.basePrice;

    console.log(`🔄 Attempting to place bid of ₹${bidAmount}...`);

    const result = await new Promise((resolve) => {
      clientSocket.emit('place_bid', {
        auctionId: auction._id.toString(),
        buyerId: buyer._id.toString(),
        amount: bidAmount
      }, resolve);
    });

    if (result.success) {
      console.log('✅ Bid Placement Result: SUCCESS');
      console.log(`   Bid ID: ${result.bid._id}`);
      console.log(`   Amount: ₹${result.bid.amount}`);
      
      // Verify DB update
      const updatedAuction = await Auction.findById(auction._id);
      if (updatedAuction.currentHighestBid.toString() === result.bid._id.toString()) {
        console.log('✅ Database Verification: SUCCESS (Auction updated with highest bid)');
      } else {
        console.error('❌ Database Verification: FAILED (Auction not updated)');
      }
    } else {
      console.error('❌ Bid Placement Result: FAILED');
      console.error('   Reason:', result.message);
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error);
  } finally {
    if (clientSocket) clientSocket.disconnect();
    if (server) server.close();
    await mongoose.disconnect();
    console.log('🏁 Test completed. Cleaned up resources.');
    process.exit(0);
  }
};

runTest();
