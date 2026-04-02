const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

const createCustomUsers = async () => {
  try {
    // Clear existing users (optional - comment out if you want to keep existing users)
    // await User.deleteMany({});
    
    // Create Custom Admin
    const adminExists = await User.findOne({ email: 'sahazadadmin@gmail.com' });
    if (!adminExists) {
      const admin = await User.create({
        name: 'Sahazad Admin',
        email: 'sahazadadmin@gmail.com',
        password: 'Sahzad@123',
        role: 'admin'
      });
      console.log('✅ Admin user created successfully!');
      console.log('   Email: sahazadadmin@gmail.com');
      console.log('   Password: Sahzad@123');
    } else {
      console.log('⚠️ Admin user already exists');
    }
    
    // Create Custom Agent
    const agentExists = await User.findOne({ email: 'sahazadagent@gmail.com' });
    if (!agentExists) {
      const agent = await User.create({
        name: 'Sahazad Agent',
        email: 'sahazadagent@gmail.com',
        password: 'Sahzad2123',
        role: 'agent'
      });
      console.log('✅ Agent user created successfully!');
      console.log('   Email: sahazadagent@gmail.com');
      console.log('   Password: Sahzad2123');
    } else {
      console.log('⚠️ Agent user already exists');
    }
    
    // Keep demo users as well
    const demoAdminExists = await User.findOne({ email: 'admin@example.com' });
    if (!demoAdminExists) {
      await User.create({
        name: 'Demo Admin',
        email: 'admin@example.com',
        password: '123456',
        role: 'admin'
      });
      console.log('✅ Demo admin created');
    }
    
    const demoAgentExists = await User.findOne({ email: 'agent@example.com' });
    if (!demoAgentExists) {
      await User.create({
        name: 'Demo Agent',
        email: 'agent@example.com',
        password: '123456',
        role: 'agent'
      });
      console.log('✅ Demo agent created');
    }
    
    const demoUserExists = await User.findOne({ email: 'user@example.com' });
    if (!demoUserExists) {
      await User.create({
        name: 'Demo User',
        email: 'user@example.com',
        password: '123456',
        role: 'user'
      });
      console.log('✅ Demo user created');
    }
    
    console.log('\n📋 All Users in Database:');
    const allUsers = await User.find({}).select('name email role -_id');
    console.table(allUsers.map(u => ({ Name: u.name, Email: u.email, Role: u.role })));
    
    console.log('\n🎉 Custom users created successfully!');
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔐 Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👑 ADMIN:');
    console.log('   Email: sahazadadmin@gmail.com');
    console.log('   Password: Sahzad@123');
    console.log('\n🧑‍💻 AGENT:');
    console.log('   Email: sahazadagent@gmail.com');
    console.log('   Password: Sahzad2123');
    console.log('\n👤 REGULAR USER:');
    console.log('   Can register with any email');
    console.log('   Or use: user@example.com / 123456');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    process.exit();
  } catch (error) {
    console.error('❌ Error creating users:', error);
    process.exit(1);
  }
};

createCustomUsers();