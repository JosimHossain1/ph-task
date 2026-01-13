import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'User'], default: 'User' },
  photoUrl: String,
  readingGoal: {type : Number, default: 0 },
})

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel