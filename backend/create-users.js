const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const User = mongoose.model('User', userSchema);

const createUsers = async () => {
  try {
    console.log('📝 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');
    
    // Clear existing users
    console.log('🗑️  Clearing existing users...');
    await User.deleteMany({});
    console.log('✅ Cleared existing users\n');
    
    // Hash passwords
    console.log('🔐 Hashing passwords...');
    const adminPassword = await bcrypt.hash('Sahzad@123', 10);
    const agentPassword = await bcrypt.hash('Sahzad2123', 10);
    const userPassword = await bcrypt.hash('123456', 10);
    console.log('✅ Passwords hashed\n');
    
    // Create users
    console.log('👥 Creating users...');
    const users = await User.insertMany([
      {
        name: 'Sahazad Admin',
        email: 'sahazadadmin@gmail.com',
        password: adminPassword,
        role: 'admin'
      },
      {
        name: 'Sahazad Agent',
        email: 'sahazadagent@gmail.com',
        password: agentPassword,
        role: 'agent'
      },
      {
        name: 'Demo User',
        email: 'user@example.com',
        password: userPassword,
        role: 'user'
      }
    ]);
    
    console.log('✅ Users created successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 Created Users:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    users.forEach(user => {
      console.log(`👤 ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Password: ${user.role === 'admin' ? 'Sahzad@123' : user.role === 'agent' ? 'Sahzad2123' : '123456'}`);
      console.log('');
    });
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Setup complete! You can now login at http://localhost:3000');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 11000) {
      console.log('⚠️  Duplicate email error. Users might already exist.');
    }
  }
};

// Run the function
createUsers();