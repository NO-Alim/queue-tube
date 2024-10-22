import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    unique: true,
    trim: true, // remove space
    lowercase: true, // convert to lowercase
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
