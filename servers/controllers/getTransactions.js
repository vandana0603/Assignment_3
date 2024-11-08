// controllers/getTransactions.js
const Transaction = require('../models/Transaction');

const getTransactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = '', month } = req.query;
    
    // Create a Date range for the selected month (year 2024 in this case)
    const startDate = new Date(`2024-${month}-01`);
    const endDate = new Date(`2024-${parseInt(month) + 1}-01`);
    
    if (isNaN(startDate.getTime())) {
      return res.status(400).json({ message: 'Invalid month value' });
    }

    const query = {
      dateOfSale: { $gte: startDate, $lt: endDate },
      $or: [
        { productTitle: { $regex: search, $options: 'i' } },
        { productDescription: { $regex: search, $options: 'i' } },
        { price: { $regex: search, $options: 'i' } }
      ]
    };

    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));
    
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Error fetching transactions' });
  }
};

module.exports = { getTransactions };
