// routes/index.js
const express = require('express');
const { initDatabase } = require('../controllers/initDatabase');
const { getTransactions } = require('../controllers/getTransactions');
const { getStatistics } = require('../controllers/statistics');
const { getBarChartData } = require('../controllers/barChart');
const { getPieChartData } = require('../controllers/pieChart');
const { getCombinedData } = require('../controllers/combinedData');

const router = express.Router();

router.get('/init', initDatabase);
router.get('/transactions', getTransactions);
router.get('/statistics', getStatistics);
router.get('/bar-chart', getBarChartData);
router.get('/pie-chart', getPieChartData);
router.get('/combined-data', getCombinedData);

module.exports = router;
