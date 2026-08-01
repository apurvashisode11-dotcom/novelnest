const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes   = require('./routes/auth');
const bookRoutes   = require('./routes/books');
const orderRoutes  = require('./routes/orders');
const userRoutes   = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',   authRoutes);
app.use('/api/books',  bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users',  userRoutes);

app.get('/', (req, res) => {
  res.send('NovelNest API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
