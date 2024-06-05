import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

/// will call controller function

router.get('/', StudentControllers.getAllStudents);

router.get('/:studentId', StudentControllers.getSingleStudent);

router.get('/delete/:studentId', StudentControllers.deleteStudentFromDb);

router.delete('/:studentId', StudentControllers.deleteStudentFromDbH);

export const StudentRoutes = router;
