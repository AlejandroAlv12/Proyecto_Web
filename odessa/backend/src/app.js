const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth.routes');
const lotsRoutes = require('./routes/lots.routes');

const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/lots', lotsRoutes);

app.get('/', (req, res) => res.send('Odessa API ok'));

module.exports = app;
