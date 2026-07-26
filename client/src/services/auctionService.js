import axios from 'axios';

const API_URL = '/api/auctions/';

// Get all auctions
const getAuctions = async () => {
  const response = await axios.get(API_URL);
  return response.data.data;
};

// Get single auction
const getAuctionById = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data.data;
};

// Create new auction
const createAuction = async (auctionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, auctionData, config);
  return response.data.data;
};

// Get my auctions
const getMyAuctions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + 'my-auctions', config);
  return response.data.data;
};

// Get my bids
const getMyBids = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + 'my-bids', config);
  return response.data.data;
};

// Update auction status (Admin)
const updateAuctionStatus = async (id, status, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}${id}/status`, { status }, config);
  return response.data.data;
};

const auctionService = {
  getAuctions,
  getAuctionById,
  createAuction,
  getMyAuctions,
  getMyBids,
  updateAuctionStatus,
};

export default auctionService;
