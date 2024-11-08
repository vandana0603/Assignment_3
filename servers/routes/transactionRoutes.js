const express = require('express');
const { initializeDatabase } = require('../controllers/initDatabase'); // Ensure this import is correct
const { getTransactions } = require('../controllers/getTransactions');
const router = express.Router();

// Define POST route for initializing the database
router.post('/init', initializeDatabase);
router.get('/transactions', getTransactions);

// Define other routes as needed
// Example: router.get('/transactions', getTransactions);

module.exports = router;
