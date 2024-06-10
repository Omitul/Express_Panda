import express from 'express';
import validateRequest from '../../config/middleWares/ValidateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.CreateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get(':/facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);

router.patch(
  ':/facultyId',
  validateRequest(
    AcademicFacultyValidation.UpdateAcademicFacultyValidationSchema,
  ),

  AcademicFacultyControllers.updateAcademicFaculty,
);

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);

export const AcademicFacultyRoute = router;
