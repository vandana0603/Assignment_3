// controllers/combinedData.js
const { getStatistics } = require('./statistics');
const { getBarChartData } = require('./barChart');
const { getPieChartData } = require('./pieChart');

const getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;
    
    const statistics = await getStatistics(req, res);
    const barChartData = await getBarChartData(req, res);
    const pieChartData = await getPieChartData(req, res);
    
    res.status(200).json({
      statistics,
      barChartData,
      pieChartData
    });
  } catch (error) {
    console.error('Error fetching combined data:', error);
    res.status(500).json({ message: 'Error fetching combined data' });
  }
};

module.exports = { getCombinedData };
