import mongoose, { Schema } from "mongoose";

const tutorialSchema = new Schema({
  tutorialName: { type: String, required: true },
  genreName: { type: String, required: true },
  description: String,
  videoUrl: { type: String, required: true }
}, { timestamps: true })

const tutorialModel = mongoose.models.Tutorial || mongoose.model("Tutorial", tutorialSchema)
export default tutorialModel