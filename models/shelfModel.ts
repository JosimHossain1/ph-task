import mongoose, { Schema } from "mongoose";

const shelfSchema = new Schema({
  shelfCode: {type: String, required: true, unique: true, uppercase: true, trim: true},
  locationDes: {type: String, required: true},
  category: {type: Schema.Types.ObjectId, ref: "genre"},
  capacity: {type: Number, default: 50}
}, { timestamps: true });


const shelfModel = mongoose.models.shelf || mongoose.model("shelf", shelfSchema);
export default shelfModel;