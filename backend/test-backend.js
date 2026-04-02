const testAPI = async () => {
  const API_URL = 'https://helpdesk-backend-ris4.onrender.com/api';
  
  console.log('🔍 Testing Backend Connection...\n');
  
  // Test 1: Check if backend is alive
  try {
    const testRes = await fetch(`${API_URL}/test`);
    const testData = await testRes.json();
    console.log('✅ Backend is running:', testData);
  } catch (error) {
    console.error('❌ Backend not reachable:', error.message);
    return;
  }
  
  // Test 2: Try admin login
  console.log('\n👑 Testing Admin Login...');
  try {
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'sahazadadmin@gmail.com',
        password: 'Sahzad@123'
      })
    });
    
    const data = await loginRes.json();
    
    if (loginRes.ok) {
      console.log('✅ Admin login successful!');
      console.log('   Name:', data.name);
      console.log('   Email:', data.email);
      console.log('   Role:', data.role);
    } else {
      console.log('❌ Admin login failed:', data.message);
      console.log('\n💡 Creating admin user...');
      
      // Create admin user
      const registerRes = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Sahazad Admin',
          email: 'sahazadadmin@gmail.com',
          password: 'Sahzad@123',
          role: 'admin'
        })
      });
      
      const registerData = await registerRes.json();
      if (registerRes.ok) {
        console.log('✅ Admin user created successfully!');
      } else {
        console.log('❌ Failed to create admin:', registerData.message);
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  // Test 3: Try agent login
  console.log('\n🧑‍💻 Testing Agent Login...');
  try {
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'sahazadagent@gmail.com',
        password: 'Sahzad2123'
      })
    });
    
    const data = await loginRes.json();
    
    if (loginRes.ok) {
      console.log('✅ Agent login successful!');
      console.log('   Name:', data.name);
      console.log('   Role:', data.role);
    } else {
      console.log('❌ Agent login failed:', data.message);
      
      // Create agent user
      const registerRes = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Sahazad Agent',
          email: 'sahazadagent@gmail.com',
          password: 'Sahzad2123',
          role: 'agent'
        })
      });
      
      if (registerRes.ok) {
        console.log('✅ Agent user created successfully!');
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

testAPI();