# Live Bidding Implementation Plan

## Overview
Implement a professional agricultural auction platform for AgriConnect (inspired by real cardamom e-auctions). 
The feature involves real-time bidding, automatic auction closing, and dashboard views for Buyers, Farmers, and Admins.

## Phase 1: Infrastructure & Setup
1. **Backend**: Install `socket.io` and `node-cron`.
2. **Frontend**: Install `socket.io-client`.

## Phase 2: Database Schema
1. **AuctionLot Model**:
   - Product Name, Lot Number, Quantity (kg), Base Price (₹/kg)
   - Current Highest Bid (reference to Bid), Minimum Bid Increment
   - Start Time, End Time, Status (Pending, Active, Closed, Cancelled)
   - Farmer (User ref), Farm Location, Images, Badges (Organic, Verified)
   - Quality Grading: Pod Size, Colour, Aroma, Moisture, Volatile Oil, Harvest Date, Quality Grade (A+, A, B, C)
2. **Bid Model**:
   - AuctionLot (ref), Buyer (User ref), Amount (₹/kg), Timestamp

## Phase 3: Backend Logic (Real-time & APIs)
1. **REST APIs**:
   - `POST /api/auctions` (Farmer: Create lot)
   - `GET /api/auctions` (List active/upcoming lots)
   - `GET /api/auctions/:id` (Lot details)
   - `PUT /api/auctions/:id/status` (Admin: Approve/Reject)
2. **WebSockets (Socket.io)**:
   - Connect/Disconnect handlers
   - Room per `auctionLotId`
   - `place_bid` event:
     - Use MongoDB transactions.
     - Validate increment and outbid current.
     - Broadcast `bid_update` to room.
3. **Cron Jobs**:
   - `node-cron` checks every minute for expired auctions.
   - Transitions status to `Closed`.
   - Creates an `Order` using COD/Direct Transfer for the winner.

## Phase 4: Frontend Implementation
1. **Services & Context**:
   - `auctionService.js` (API calls)
   - `SocketContext.js` (Manage global socket connection)
2. **UI Components**:
   - Live Bidding Navigation Item
   - `AuctionList` & `AuctionCard` (Framer Motion animations)
   - `AuctionRoom` (Real-time bidding interface, Countdown Timer)
3. **Dashboards**:
   - **Buyer**: Active Bids, Won/Lost Auctions, Watchlist.
   - **Farmer**: Active Auctions, Revenue, Completed.
   - **Admin**: Approve/Reject Lots, Live Monitor.

## Phase 5: Testing & Integration
- Verify real-time updates across multiple tabs.
- Validate RBAC (Farmers can't bid, Buyers can't create lots).
- Run `verify_all.py` (or existing scripts) if applicable.
