const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  console.log('🔌 Testing MongoDB Connection...');
  console.log('Connection String:', process.env.MONGODB_URI.replace(/Sahzad123/, '******'));
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    console.log('✅ Connected to MongoDB successfully!');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🌍 Host:', mongoose.connection.host);
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('✅ Test completed!');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Check if MongoDB Atlas IP is whitelisted (0.0.0.0/0)');
    console.log('2. Verify username/password is correct');
    console.log('3. Check if cluster is active');
  }
};

testConnection();