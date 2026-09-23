import { User } from '../models/user.js';
import { Job } from '../models/job.js';
import { Company } from '../models/company.js';
import { Application } from '../models/application.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this mail",
        success: false
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role
    };

    if (req.file) {
      const fileuri = getDataUri(req.file);

      const cloudResponse = await cloudinary.uploader.upload(
        fileuri.content,
        {
          folder: "Job Portal/Profile",
          resource_type: "image"
        }
      );

      userData.profile = {
        profilePhoto: cloudResponse.secure_url
      };
    }

    const user = await User.create(userData);

    return res.status(201).json({
      message: "Account created successfully",
      success: true
    });

  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: Object.values(error.errors)
          .map((err) => err.message)
          .join(", "),
        success: false
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already exists",
        success: false
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
}

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Incorrect email or password.",
        success: false
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false
      });
    }
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false
      });
    }

    const tokenData = {
      userId: user._id
    }

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }

    return res.status(200).cookie('token', token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.COOKIE_SAME_SITE || "strict",
      path: "/"
    }).json({
      message: `Welcome back ${user.fullname}`,
      user,
      success: true,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
}

export const logout = async (req, res) => {
  try {

    const isProduction = process.env.NODE_ENV === "production";

    return res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: process.env.COOKIE_SAME_SITE || "strict",
        path: "/"
      })
      .json({
        message: "Logged out successfully",
        success: true
      });
  }
  catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const resume = req.files?.resume?.[0];
    const profilePhoto = req.files?.profilePhoto?.[0];

    const userId = req.id;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    if (fullname !== undefined) {
      user.fullname = fullname;
    }

    if (email !== undefined) {
      user.email = email;
    }

    if (phoneNumber !== undefined) {
      user.phoneNumber = phoneNumber;
    }

    if (bio !== undefined) {
      user.profile.bio = bio;
    }

    if (skills !== undefined) {
      user.profile.skills = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "");
    }

    if (resume) {
      const fileUri = getDataUri(resume);

      const cloudResponse = await cloudinary.uploader.upload(
        fileUri.content,
        {
          folder: "Job Portal/Resume",
          resource_type: "raw"
        }
      );

      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = resume.originalname;
    }

    if (profilePhoto) {
      const fileUri = getDataUri(profilePhoto);

      const cloudResponse = await cloudinary.uploader.upload(
        fileUri.content,
        {
          folder: "Job Portal/Profile",
          resource_type: "image"
        }
      );

      user.profile.profilePhoto = cloudResponse.secure_url;
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true
    });

  } catch (error) {
    console.log(error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: Object.values(error.errors)
          .map((err) => err.message)
          .join(", "),
        success: false
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already exists",
        success: false
      });
    }

    return res.status(500).json({
      message: "Something went wrong",
      success: false
    });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.id.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "You can only delete your own account",
        success: false
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    if (user.role === "student") {

      await Application.deleteMany({
        applicant: userId
      });

      await User.findByIdAndDelete(userId);

      return res.status(200).json({
        message: "Deleted successfully",
        success: true
      });
    }

    if (user.role === "recruiter") {

      const companies = await Company.find({
        userId: userId
      }).select("_id");

      const companyIds = companies.map((company) => company._id);

      const jobs = await Job.find({
        $or: [
          { created_by: userId },
          { company: { $in: companyIds } }
        ]
      }).select("_id");

      const jobIds = jobs.map((job) => job._id);

      if (jobIds.length > 0) {
        await Application.deleteMany({
          job: { $in: jobIds }
        });

        await Job.deleteMany({
          _id: { $in: jobIds }
        });
      }

      await Company.deleteMany({
        userId: userId
      });

      await User.findByIdAndDelete(userId);

      return res.status(200).json({
        message: "Deleted successfully",
        success: true
      });
    }

    return res.status(400).json({
      message: "Invalid user role",
      success: false
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};