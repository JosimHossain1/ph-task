import mongoose, { Schema } from "mongoose";

const librarySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true,},
    book: {type: Schema.Types.ObjectId, ref: "Book", required: true,},
    shelf: {type: String, enum: ["want-to-read", "currently-reading", "read"], required: true},
    progress: {pagesRead: { type: Number, default: 0 }, percentage: { type: Number, default: 0 }},
    startedAt: Date,
    finishedAt: Date,
    lastUpdated: {type: Date, default: Date.now,},
  },
  { timestamps: true }
);

librarySchema.index({ user: 1, book: 1 }, { unique: true });

const libraryModel =  mongoose.models.Library || mongoose.model("Library", librarySchema);

export default libraryModel