const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const users = [
  {
    email: 'admin@test.com',
    password: 'testpass',
    role: 'admin'
  },
  {
    email: 'teacher@test.com',
    password: 'testpass',
    role: 'teacher'
  }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany();

    // Hash each user's password
    const usersWithHashedPw = await Promise.all(
      users.map(async u => ({
        ...u,
        password: await bcrypt.hash(u.password, 10)
      }))
    );

    await User.insertMany(usersWithHashedPw);

    console.log('Users Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany();

    console.log('Users Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}