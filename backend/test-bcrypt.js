const bcrypt = require('bcryptjs');

const runTest = async () => {
  const password = 'testpassword';
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  const isMatch = await bcrypt.compare(password, hashedPassword);
  
  if (isMatch) {
    console.log("SUCCESS! bcrypt is working correctly on your machine.");
  } else {
    console.log("FAILURE! bcrypt is not working correctly on your machine.");
  }
};

runTest();