import express from 'express';
import { postJob, getAllJobs, getAdminJobs, getJobById, updateJob, deleteJob } from '../controllers/job.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';
import { validate } from '../middlewares/validate.js';
import { jobSchema, updateJobSchema } from '../utils/validation.js';

const router = express.Router();

router.route('/post').post(isAuthenticated, authorizeRoles("recruiter"), validate(jobSchema), postJob);
router.route('/get').get(getAllJobs);
router.route('/getadminjobs').get(isAuthenticated, authorizeRoles("recruiter"), getAdminJobs);
router.route('/get/:id').get(isAuthenticated, getJobById);
router.route("/update/:id").put(isAuthenticated, authorizeRoles("recruiter"), validate(updateJobSchema), updateJob);
router.route("/delete/:id").delete(isAuthenticated, authorizeRoles("recruiter"), deleteJob);

export default router;