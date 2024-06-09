import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../config/middleWares/ValidateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.CreateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get(
  ':/semesterId',
  AcademicSemesterControllers.getSingleAcademicSemester,
);

router.patch(
  ':/semesterId',
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),

  AcademicSemesterControllers.updateAcademicSemester,
);

router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);

export const AcademicSemesterRoute = router;
