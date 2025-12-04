const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const email = 'newuser@school.com';
const password = 'newpassword123';

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        // Hash the password directly
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email,
            password: hashedPassword,
            role: 'teacher'
        });

        await newUser.save();
        console.log('User created successfully!');
        
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

run();