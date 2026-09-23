import { Job } from "../models/job.js";
import { Application } from "../models/application.js";


export const postJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
    const userId = req.id;

    if (!title || !description || !requirements || !salary || !location || !jobType || experience === undefined || experience === null || !position || !companyId) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    };

    const requirementsArray = Array.isArray(requirements)
      ? requirements
      : requirements.split(",");

    const job = await Job.create({
      title,
      description,
      requirements: requirementsArray,
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId
    });
    return res.status(201).json({
      message: "New job created successfully",
      success: true,
      job
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

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ]
    };
    const jobs = await Job.find(query).populate({
      path: "company",
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      jobs,
      success: true,
    });

  } catch (error) {
    console.log(error);

    return res.status(404).json({
      message: "No jobs found",
      success: false
    });
  }
}

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });

    if (!job) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false
      });
    };
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
}

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
    });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false
      });
    };
    return res.status(200).json({
      jobs,
      success: true,
    });

  } catch (error) {
    console.log(error);
  }
}


export const updateJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId
    } = req.body;

    const jobId = req.params.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      experience === undefined ||
      experience === null ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    }

    const requirementsArray = Array.isArray(requirements)
      ? requirements
      : requirements.split(",");

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      });
    }

    if (job.created_by.toString() !== req.id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to update this job",
        success: false
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        title,
        description,
        requirements: requirementsArray,
        salary: Number(salary),
        location,
        jobType,
        experienceLevel: experience,
        position,
        company: companyId
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedJob) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      });
    }

    return res.status(200).json({
      message: "Job updated successfully",
      success: true,
      job: updatedJob
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

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid job or company ID",
        success: false
      });
    }

    return res.status(500).json({
      message: "Server error",
      success: false
    });
  }
};


export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      });
    }

    if (job.created_by.toString() !== req.id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete this job",
        success: false
      });
    }

    await Application.deleteMany({
      job: jobId
    });

    await Job.findByIdAndDelete(jobId);

    return res.status(200).json({
      message: "Job deleted successfully",
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