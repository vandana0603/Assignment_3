// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  productTitle: { type: String, required: true },
  productDescription: { type: String, required: true },
  price: { type: Number, required: true },
  quantitySold: { type: Number, required: true },
  category: { type: String, required: true },
  dateOfSale: { type: Date, required: true }
});

module.exports = mongoose.model('Transaction', transactionSchema);
