import express from "express";
const router = express.Router();

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { generateInterviewReport, getInterviewReportById, getAllInterviewReports, generateResumePdf, deleteReport } from "../controllers/interviewReport.js";

router.route('/report').post(isAuthenticated, authorizeRoles("student"), singleUpload, generateInterviewReport);
router.route('/report/:interviewId').get(isAuthenticated, authorizeRoles("student"), getInterviewReportById);
router.route('/reports').get(isAuthenticated, authorizeRoles("student"), getAllInterviewReports);
router.route('/report/:interviewId/pdf').get(isAuthenticated, authorizeRoles("student"), generateResumePdf);
router.route('/report/delete/:interviewId').delete(isAuthenticated, authorizeRoles("student"), deleteReport);


export default router;