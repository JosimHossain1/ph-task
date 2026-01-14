// Connect MongoDB database
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

async function dbConnect() {
  await mongoose.connect(MONGODB_URI);
}

export default dbConnect;