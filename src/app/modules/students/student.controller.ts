import { NextFunction, Request, Response } from 'express';
import { StudentServies } from './student.service';
//import studentValidationSchemaJoi from './student.validationJoi';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServies.getAllStudentsFromDb();
    res.status(200).json({
      success: true,
      message: 'student are retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServies.getSingleStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: 'Single student data retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteStudentFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServies.deleteStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: 'Student Deleted Successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteStudentFromDbH = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServies.deleteStudentFromDbHe(studentId);
    res.status(200).json({
      success: true,
      message: 'Student Deleted Successfully',
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudentFromDb,
  deleteStudentFromDbH,
};
