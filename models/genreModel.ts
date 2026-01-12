import mongoose, { Schema } from "mongoose";

const genreSchema = new Schema({
  genreName: { type: String, unique: true },
  slug: { type: String, lowercase: true }
}, { timestamps: true })

const genreModel = mongoose.models.genres || mongoose.model("genre", genreSchema)
export default genreModel