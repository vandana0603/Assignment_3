// controllers/initDatabase.js
const axios = require('axios');
const Transaction = require('../models/Transaction');

const initDatabase = async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    // Convert dateOfSale string to Date object for each transaction
    const processedTransactions = transactions.map(transaction => {
      return {
        ...transaction,
        dateOfSale: new Date(transaction.dateOfSale) // Ensure it's a valid Date object
      };
    });

    // Insert transactions into MongoDB
    await Transaction.insertMany(processedTransactions);
    res.status(200).json({ message: 'Database initialized with seed data.' });
  } catch (error) {
    console.error('Error initializing database:', error);
    res.status(500).json({ message: 'Error initializing database' });
  }
};

module.exports = { initDatabase };
