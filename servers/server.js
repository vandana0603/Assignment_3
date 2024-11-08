// server.js
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb+srv://mukulbhatia189:mukulbhatia189@cluster0.zg7kjju.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
