import { generateinterviewReport, generateresumePdf } from "../services.js/ai.js";
import { Report } from "../models/interviewReport.js";
import { PDFParse } from "pdf-parse";


export const generateInterviewReport = async (req, res) => {

  try {
    const parser = new PDFParse({
      data: req.file.buffer
    });

    const result = await parser.getText();
    await parser.destroy();

    const resumeContent = result.text;


    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAi = await generateinterviewReport({
      resume: resumeContent,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await Report.create({
      user: req.user.id,
      resume: resumeContent,
      selfDescription,
      jobDescription,
      ...interviewReportByAi,
    });

    res.status(201).json({
      message: "Interview report generated successfully",
      success: true,
      interviewReport
    });

  } catch (error) {
    res.status(500).json({
      message: "Interview report generated failed",
      success: false,
      error: error.message
    });
  }

};


export const getInterviewReportById = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const report = await Report.findOne({ _id: interviewId, user: req.user.id, });

    if (!report) {
      return res.status(404).json({
        message: "Interview report not found",
        success: false
      });
    }
    res.status(200).json({
      message: "Interview report fetched successfully",
      success: true,
      report
    });
  } catch (error) {
    res.status(500).json({
      message: "Interview report not found",
      success: false,
      error: error.message
    });
  }

}

export const getAllInterviewReports = async (req, res) => {

  try {
    const reports = await Report.find({ user: req.user.id, }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan ");

    res.status(200).json({
      message: "Interview reports fetched successfully",
      success: true,
      reports
    });
  } catch (error) {
    res.status(500).json({
      message: "Interview reports not found",
      success: false,
      error: error.message
    });
  }

}

export const generateResumePdf = async (req, res) => {

  try {
    const { interviewId } = req.params;
    const report = await Report.findById(interviewId);
    if (!report) {
      return res.status(404).json({
        message: "Interview report not found",
        success: false
      });
    }

    const { resume, jobDescription, selfDescription } = report;

    const pdfBuffer = await generateresumePdf({ resume, jobDescription, selfDescription });
    res.set({
      "content-Type": "application/pdf",
      "content-Disposition": `attachment; filename=resume_${report._id}.pdf`
    });

    res.send(pdfBuffer);

  } catch (error) {
    res.status(500).json({
      message: "Interview report not found",
      success: false,
      error: error.message
    });
  }

}