require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

const allRouter = require('./routes/allRoutes');
app.use('/blogs', allRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
