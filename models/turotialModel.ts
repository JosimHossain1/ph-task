import mongoose, { Schema } from "mongoose";

const tutorialSchema = new Schema({
  tutorialName: { type: String, required: true },
  genreId: { type: Schema.Types.ObjectId, ref: 'genre', required: true },
  description: String,
  contentUrl: { type: String, required: true }
}, { timestamps: true })

const tutorialModel = mongoose.models.tutorial || mongoose.model("tutorial", tutorialSchema)
export default tutorialModel