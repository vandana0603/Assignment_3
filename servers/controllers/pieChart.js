// controllers/pieChart.js
const Transaction = require('../models/Transaction');

const getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;
    
    const startDate = new Date(`2024-${month}-01`);
    const endDate = new Date(`2024-${parseInt(month) + 1}-01`);
    
    const categoryData = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    res.status(200).json(categoryData);
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    res.status(500).json({ message: 'Error fetching pie chart data' });
  }
};

module.exports = { getPieChartData };
