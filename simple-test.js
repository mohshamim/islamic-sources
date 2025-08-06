const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://shmm333:wYelXQxQrnYPkUhf@islamic-sourcses.0zgxypg.mongodb.net/?retryWrites=true&w=majority&appName=Islamic-Sourcses';

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    
    // Set a timeout for the connection
    const connectionPromise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      socketTimeoutMS: 45000, // 45 second timeout
    });
    
    // Add a timeout wrapper
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Connection timeout')), 10000);
    });
    
    await Promise.race([connectionPromise, timeoutPromise]);
    
    console.log('✅ Connected to MongoDB successfully!');
    
    // Test creating a simple document
    const TestSchema = new mongoose.Schema({
      message: String,
      timestamp: { type: Date, default: Date.now }
    });
    const Test = mongoose.model('Test', TestSchema);
    
    const testDoc = new Test({ message: 'Connection test successful' });
    await testDoc.save();
    console.log('✅ Document saved successfully');
    
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    // Try to get more details about the error
    if (error.name === 'MongoNetworkError') {
      console.error('Network error details:', error);
    }
  }
}

testConnection(); 