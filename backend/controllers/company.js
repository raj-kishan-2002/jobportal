import { Company } from '../models/company.js';
import { Job } from '../models/job.js';
import { Application } from '../models/application.js';
import cloudinary from '../utils/cloudinary.js';
import getDataUri from '../utils/datauri.js';

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already exists with this name",
        success: false
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id
    });

    return res.status(201).json({
      message: "Company registered successfully",
      success: true,
      company
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
        message: "Company already exists with this name",
        success: false
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid company data",
        success: false
      });
    }


    return res.status(500).json({ message: "Internal server error", success: false });
  }
}

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });

    if (!companies) {
      return res.status(404).json({
        message: "No companies, registered by you",
        success: false
      });
    }

    return res.status(200).json({
      companies,
      success: true
    });

  } catch (error) {
    console.log(error);
  }
}

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not exist.",
        success: false
      });
    }

    return res.status(200).json({
      success: true,
      company
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
}

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const updateData = { name, description, website, location };

    if (req.file) {
      const fileUri = getDataUri(req.file);

      const cloudResponse = await cloudinary.uploader.upload(
        fileUri.content,
        {
          folder: "Job Portal",
        }
      );

      updateData.logo = cloudResponse.secure_url;
    }

    const existingCompany = await Company.findById(req.params.id);

    if (!existingCompany) {
      return res.status(404).json({
        message: "Company not exist.",
        success: false
      });
    }

    if (existingCompany.userId.toString() !== req.id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to update this company",
        success: false
      });
    }

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });

    if (!company) {
      return res.status(404).json({
        message: "Company not exist.",
        success: false
      });
    }

    return res.status(200).json({
      message: "Company updated successfully",
      success: true,
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
        message: "Company already exists with this name",
        success: false
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid company ID",
        success: false
      });
    }
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
}

export const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;


    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false
      });
    }

    if (company.userId.toString() !== req.id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete this company",
        success: false
      });
    }

    const jobs = await Job.find({ company: companyId }).select("_id");

    const jobIds = jobs.map((job) => job._id);

    if (jobIds.length > 0) {
      await Application.deleteMany({
        job: { $in: jobIds }
      });

      await Job.deleteMany({
        company: companyId
      });
    }

    await Company.findByIdAndDelete(companyId);

    return res.status(200).json({
      message: "Company deleted successfully",
      success: true
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};