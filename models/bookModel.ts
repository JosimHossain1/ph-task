import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    bookName: {type: String, required: true,index: true,},
    author: {type: String,required: true,index: true,},
    description: {type: String,required: true,},
    genre: { type: mongoose.Schema.Types.ObjectId,ref: "Genre",required: true,},
    coverImage: { type: String,required: true,},
    totalPages: { type: Number,required: true,},
    avgRating: { type: Number,default: 0,},
    totalReviews: { type: Number,default: 0},
    addedCount: {type: Number,default: 0,},
    createdBy: {type: mongoose.Schema.Types.ObjectId,ref: "User",},
  },
  { timestamps: true }
);
const bookModel = mongoose.models.Book || mongoose.model("Book", bookSchema);

export default bookModel
