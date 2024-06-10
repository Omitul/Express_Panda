import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../config/middleWares/ValidateRequest';
import { studentValidations } from './student.validationZod';

const router = express.Router();

/// will call controller function

router.get('/', StudentControllers.getAllStudents);

router.get('/:studentId', StudentControllers.getSingleStudent);

router.get('/delete/:studentId', StudentControllers.deleteStudentFromDb);

router.delete('/:studentId', StudentControllers.deleteStudentFromDbH);

router.patch(
  '/:studentId',
  validateRequest(studentValidations.UpdateStudentValidation),
  StudentControllers.updateStudent,
);

export const StudentRoutes = router;
