// server.js  ─────────────────────────────────────────────
const express   = require('express');
const cors      = require('cors');
require('dotenv').config();            // loads .env into process.env

const connectDB   = require('./src/config/db');
const itemRoutes  = require('./src/routes/itemRoutes'); // adjust path as needed

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/items', itemRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
