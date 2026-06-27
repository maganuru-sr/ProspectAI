import mongoose from "mongoose";

const dealSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    value: { type: String, required: true },
    owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},
    stage: {
      type: String,
      default: "New",
    },
    closeDate: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Deal", dealSchema);