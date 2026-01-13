import mongoose, { Schema } from "mongoose";

const shelfSchema = new Schema({
  shelfCode: { type: String, required: true, unique: true, uppercase: true, trim: true },
  locationDes: { type: String, required: true },
  genre: { type: Schema.Types.ObjectId, ref: "genres" },
  capacity: { type: Number, default: 50 }
}, { timestamps: true });


const shelfModel = mongoose.models.Shelf || mongoose.model("Shelf", shelfSchema);
export default shelfModel;