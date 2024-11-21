import mongoose, { Schema, model } from "mongoose";

const entrySchema = new Schema(
  {
    title: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    }, // This can be a reference to User model
    description: { type: String, required: true },
    videoUrl: { type: String },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Entry = model("Entry", entrySchema);

export default Entry;
