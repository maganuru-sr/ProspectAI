import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    assignedTo: {
      type: String,
      required: true,
    },

    dueDate: {
      type: String,
      default: "",
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
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);