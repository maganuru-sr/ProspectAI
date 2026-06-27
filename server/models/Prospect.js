import mongoose from "mongoose";

const prospectSchema = new mongoose.Schema(
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

    owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

    status: {
      type: String,
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Prospect", prospectSchema);