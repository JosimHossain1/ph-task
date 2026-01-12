import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
  bookName: { type: String, required: true },
  author: { type: String, required: true },
  genreId: { type: Schema.Types.ObjectId, ref: "genres", required: true },
  description: String,
  coverUrl: String,

  totalCopies: { type: Number, required: true, default: 1 },
  availableCopies: { type: Number, required: true, default: 1 },

  shelfLocation: { type: String },
  publishedYear: { type: Number }
}, { timestamps: true })

const bookModel = mongoose.models.books || mongoose.model("Book", bookSchema)
export default bookModel