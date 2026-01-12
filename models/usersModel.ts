import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name:  { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  photo: String,
  role: { type: String, enum: ['Admin', 'User'], default: 'User' },
  readingGoal: Number,
})

const userModel = mongoose.models.test || mongoose.model('test', userSchema)

export default userModel