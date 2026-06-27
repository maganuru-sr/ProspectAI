import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      default: "LinkedIn",
    },

    priority: {
      type: String,
      default: "Medium",
    },

    owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

    status: {
      type: String,
      default: "Warm",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Lead", leadSchema);