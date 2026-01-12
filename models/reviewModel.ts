import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  bookId: { type: Schema.Types.ObjectId, ref: 'book', required: true },
  star: { type: Number, required: true, min: 1, max: 5 },
  reviewDes: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  helpfulCount: { type: Number, default: 0 },
  isEdited: { type: Boolean, default: false }
}, { timestamps: true })

const reviewModel = mongoose.models.reviews || mongoose.model("review", reviewSchema)
export default reviewModel