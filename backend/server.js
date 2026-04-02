const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

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

// Health check endpoint
app.get('/api/health', (req, res) => {
res.json({
status: 'OK',
message: 'Server is running!',
timestamp: new Date().toISOString()
});
});

// Test route
app.get('/api/test', (req, res) => {
res.json({ message: 'API is working!', version: '1.0.0' });
});

// Error handling middleware
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).json({
message: 'Something went wrong!',
error: process.env.NODE_ENV === 'development' ? err.message : {}
});
});

// Port setup
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
