import mongoose, { Schema } from "mongoose";

const tutorialSchema = new Schema({
  tutorialName: { type: String, required: true },
  genreId: { type: Schema.Types.ObjectId, ref: 'genre', required: true },
  description: String,
  contentUrl: { type: String, required: true }
}, { timestamps: true })

const tutorialModel = mongoose.models.tutorials || mongoose.model("Tutorial", tutorialSchema)
export default tutorialModel