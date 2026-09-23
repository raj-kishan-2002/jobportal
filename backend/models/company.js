import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Company name is required"],
    unique: true,
    trim: true,
    minlength: [2, "Company name must be at least 2 characters"],
    maxlength: [100, "Company name cannot exceed 100 characters"],
  },

  description: {
    type: String,
    trim: true,
    maxlength: [1000, "Description cannot exceed 1000 characters"],
  },

  website: {
    type: String,
    trim: true,
    maxlength: [300, "Website URL cannot exceed 300 characters"],
  },

  location: {
    type: String,
    trim: true,
    minlength: [2, "Location must be at least 2 characters"],
    maxlength: [200, "Location cannot exceed 200 characters"],
  },

  logo: {
    type: String,
    trim: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Company owner is required"],
  },
}, { timestamps: true });

export const Company = mongoose.model('Company', companySchema);