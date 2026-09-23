import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      minlength: [2, "Job title must be at least 2 characters"],
      maxlength: [100, "Job title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
      minlength: [10, "Job description must be at least 10 characters"],
      maxlength: [5000, "Job description cannot exceed 5000 characters"],
    },

    requirements: [
      {
        type: String,
        trim: true,
        minlength: [1, "Requirement cannot be empty"],
        maxlength: [200, "Requirement cannot exceed 200 characters"],
      },
    ],

    salary: {
      type: Number,
      required: [true, "Salary is required"],
      min: [0, "Salary cannot be negative"],
    },

    experienceLevel: {
      type: Number,
      required: [true, "Experience level is required"],
      min: [0, "Experience cannot be negative"],
    },

    location: {
      type: String,
      required: [true, "Job location is required"],
      trim: true,
      minlength: [2, "Location must be at least 2 characters"],
      maxlength: [200, "Location cannot exceed 200 characters"],
    },

    jobType: {
      type: String,
      required: [true, "Job type is required"],
      trim: true,
      minlength: [2, "Job type must be at least 2 characters"],
      maxlength: [50, "Job type cannot exceed 50 characters"],
    },

    position: {
      type: Number,
      required: [true, "Number of positions is required"],
      min: [1, "At least 1 position is required"],
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company is required"],
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Job creator is required"],
    },

    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  }, { timestamps: true });

export const Job = mongoose.model('Job', jobSchema);