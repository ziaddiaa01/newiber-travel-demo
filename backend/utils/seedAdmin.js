const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const adminExists = await User.findOne({ email: 'admin@newiber.com' });
    if (!adminExists) {
      await User.create({
        email: 'admin@newiber.com',
        password: 'SecurePass123!',
        role: 'admin'
      });
      console.log('Admin created');
    } else {
      console.log('Admin already exists');
    }
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();