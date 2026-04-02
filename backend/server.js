const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to database (safe)
connectDB().catch(err => {
  console.log("❌ DB connection failed:", err.message);
});

const app = express();

// Body parser
app.use(express.json());

// ✅ CORS FIX (allow all for now)
app.use(cors({
  origin: "*",
  credentials: true
}));

// ✅ ROOT ROUTE (VERY IMPORTANT for Render)
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Error handler middleware
app.use(errorHandler);

// Port setup (IMPORTANT for Render)
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Error: ${err.message}`);
  server.close(() => process.exit(1));
});
