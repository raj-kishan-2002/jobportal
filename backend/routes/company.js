import express from 'express';
import { getCompany, getCompanyById, registerCompany, updateCompany, deleteCompany } from '../controllers/company.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';
import { singleUpload } from '../middlewares/multer.js';
import { validate } from '../middlewares/validate.js'
import { companySchema, updateCompanySchema } from '../utils/validation.js';

const router = express.Router();

router.route('/register').post(isAuthenticated, authorizeRoles("recruiter"), validate(companySchema), registerCompany);
router.route('/get').get(isAuthenticated, getCompany);
router.route('/get/:id').get(isAuthenticated, getCompanyById);
router.route('/update/:id').put(isAuthenticated, authorizeRoles("recruiter"), singleUpload, validate(updateCompanySchema), updateCompany);
router.route("/delete/:id").delete(isAuthenticated, authorizeRoles("recruiter"), deleteCompany);

export default router;