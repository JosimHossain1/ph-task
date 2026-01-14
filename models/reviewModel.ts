import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    book: {type: Schema.Types.ObjectId,ref: "Book",required: true},
    rating: {type: Number, min: 1,max: 5,  required: true},
    comment: {type: String,required: true},
    status: {type: String,enum: ["Pending", "Approved", "Rejected"],default: "Pending",},
  },
  { timestamps: true }
);

const reviewModel = mongoose.models.Review || mongoose.model("Review", reviewSchema);
export default reviewModel
