import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
  bookName: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  status: { type: String, enum: ['Available', 'Pending', 'Cancelled'], default : 'Available' },
  coverUrl: String,

  totalCopies: { type: Number, required: true, default: 1 },
  availableCopies: { type: Number, required: true, default: 1 },

  totalReview: { type: Number, default: 0 },
  avarageRating: { type: Number, default: 0 },

  shelfLocation: { type: String },
  publishedYear: { type: Number }
}, { timestamps: true })

const bookModel = mongoose.models.Book || mongoose.model("Book", bookSchema)
export default bookModel