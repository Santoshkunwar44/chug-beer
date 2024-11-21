import { Schema, model, Document } from "mongoose";

const userSchema = new Schema(
  {
    avatar: { type: String, require: false },
    username: { type: String, required: true, unique: true, maxlength: 100 },
    password: { type: String, required: true, maxlength: 255 },
    isActive: { type: Boolean, default: true },
    owe: { type: Number, default: 0 },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const User = model("User", userSchema);

export default User;
