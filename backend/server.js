const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Handle error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Somethings was wrong!');
});


app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});