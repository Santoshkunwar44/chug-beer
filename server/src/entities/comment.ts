import { Schema, model, Document } from "mongoose";



const commentSchema = new Schema(
  {
    text: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true}, // This can be a reference to User model
    entryId: { type: Schema.Types.ObjectId, ref: "Entry", required: true }, // Reference to Entry
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

export default Comment;
