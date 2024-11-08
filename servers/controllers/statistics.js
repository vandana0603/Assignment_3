// controllers/statistics.js
const Transaction = require('../models/Transaction');

const getStatistics = async (req, res) => {
  try {
    const { month } = req.query;
    
    // Create a Date range for the selected month
    const startDate = new Date(`2024-${month}-01`);
    const endDate = new Date(`2024-${parseInt(month) + 1}-01`);
    
    // Calculate the statistics
    const totalSales = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);
    
    const totalSoldItems = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: null, total: { $sum: '$quantitySold' } } }
    ]);
    
    const totalNotSoldItems = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: null, total: { $sum: { $subtract: [0, '$quantitySold'] } } } }
    ]);
    
    res.status(200).json({
      totalSales: totalSales[0]?.total || 0,
      totalSoldItems: totalSoldItems[0]?.total || 0,
      totalNotSoldItems: totalNotSoldItems[0]?.total || 0
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ message: 'Error fetching statistics' });
  }
};

module.exports = { getStatistics };
