import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from './data/models/User';
import dotenv from 'dotenv';
dotenv.config();

const ADMIN_LOGIN = process.env.ADMIN_LOGIN
const ADMIN_PASSKEY = process.env.ADMIN_PASSKEY

/**
 * One time script for creating an admin,
 */

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI); 

  const hashedPassword = await bcrypt.hash(ADMIN_PASSKEY, 12);

  const adminUser = new User({
    username: "Juice",
    email: ADMIN_LOGIN,
    password: hashedPassword,
    isAdmin: true,
  });

  await adminUser.save();
  console.log('✅ Admin user created');
  await mongoose.disconnect();
};

createAdmin().catch((err) => {
  console.error('❌ Failed to create admin user:', err);
});
