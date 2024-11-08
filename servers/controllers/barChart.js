// controllers/barChart.js
const Transaction = require('../models/Transaction');

const getBarChartData = async (req, res) => {
  try {
    const { month } = req.query;
    const priceRanges = [
      { range: '0-100', min: 0, max: 100 },
      { range: '101-200', min: 101, max: 200 },
      { range: '201-300', min: 201, max: 300 },
      { range: '301-400', min: 301, max: 400 },
      { range: '401-500', min: 401, max: 500 },
      { range: '501-600', min: 501, max: 600 },
      { range: '601-700', min: 601, max: 700 },
      { range: '701-800', min: 701, max: 800 },
      { range: '801-900', min: 801, max: 900 },
      { range: '901+', min: 901, max: 9999999 }
    ];
    
    const startDate = new Date(`2024-${month}-01`);
    const endDate = new Date(`2024-${parseInt(month) + 1}-01`);
    
    const chartData = await Promise.all(priceRanges.map(async ({ range, min, max }) => {
      const count = await Transaction.countDocuments({
        dateOfSale: { $gte: startDate, $lt: endDate },
        price: { $gte: min, $lte: max }
      });
      return { range, count };
    }));
    
    res.status(200).json(chartData);
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).json({ message: 'Error fetching bar chart data' });
  }
};

module.exports = { getBarChartData };
