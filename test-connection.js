const mongoose = require('mongoose');

// Try different connection strings
const connectionStrings = [
  'mongodb+srv://shmm333:wYelXQxQrnYPkUhf@islamic-sourcses.0zgxyp.mongodb.net/test?retryWrites=true&appName=Islamic-Sourcses',
  'mongodb+srv://shmm333:wYelXQxQrnYPkUhf@islamic-sources.0zgxyp.mongodb.net/test?retryWrites=true&appName=Islamic-Sources',
  'mongodb+srv://shmm333:wYelXQxQrnYPkUhf@islamic-sourcses.0zgxyp.mongodb.net/?retryWrites=true&appName=Islamic-Sourcses'
];

async function testConnection(uri, name) {
  try {
    console.log(`Testing connection: ${name}`);
    await mongoose.connect(uri);
    console.log(`✅ SUCCESS: ${name}`);
    
    // Test creating a simple document
    const TestSchema = new mongoose.Schema({
      message: String,
      timestamp: { type: Date, default: Date.now }
    });
    const Test = mongoose.model('Test', TestSchema);
    
    const testDoc = new Test({ message: 'Connection test successful' });
    await testDoc.save();
    console.log(`✅ Document saved successfully`);
    
    await mongoose.disconnect();
    return true;
  } catch (error) {
    console.log(`❌ FAILED: ${name} - ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('Testing MongoDB connections...\n');
  
  for (let i = 0; i < connectionStrings.length; i++) {
    const success = await testConnection(connectionStrings[i], `Connection ${i + 1}`);
    if (success) {
      console.log(`\n🎉 Working connection found: ${connectionStrings[i]}\n`);
      break;
    }
    console.log('');
  }
}

runTests(); 