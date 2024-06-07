import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import { AnyZodObject } from 'zod';
import { studentValidations } from '../students/student.validationZod';
import validateRequest from '../../config/middleWares/ValidateRequest';

const router = express.Router();

/// will call controller function
router.post(
  '/create-student',
  validateRequest(studentValidations.Create_Student_Validation),
  UserControllers.createStudent,
);

export const UserRoutes = router;
