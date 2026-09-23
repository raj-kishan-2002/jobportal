import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
    minlength: [2, "Full name must be at least 2 characters"],
    maxlength: [50, "Full name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: [100, "Email cannot exceed 100 characters"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
    match: [
      /^[0-9]{10}$/,
      "Please enter a valid phone number",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ['student', 'recruiter'],
    enum: {
      values: ["student", "recruiter"],
      message: "Role must be either student or recruiter",
    },
  },
  profile: {
    bio: {
      type: String,
      trim: true,
      maxlength: [500, "Bio cannot exceed 500 characters"],
    },

    skills: [
      {
        type: String,
        trim: true,
        maxlength: [50, "Each skill cannot exceed 50 characters"],
      },
    ],

    resume: {
      type: String,
    },

    resumeOriginalName: {
      type: String,
      trim: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    profilePhoto: {
      type: String,
      default: ""
    }
  },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);