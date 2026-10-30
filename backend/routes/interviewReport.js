import express from "express";
const router = express.Router();

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
import { generateInterviewReport, getInterviewReportById, getAllInterviewReports, generateResumePdf } from "../controllers/interviewReport.js";

router.route('/report').post(isAuthenticated, singleUpload, generateInterviewReport);
router.route('/report/:interviewId').get(isAuthenticated, getInterviewReportById);
router.route('/reports').get(isAuthenticated, getAllInterviewReports);
router.route('/report/:interviewId/pdf').get(isAuthenticated, generateResumePdf);


export default router;