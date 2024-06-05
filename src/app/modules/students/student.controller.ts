import { NextFunction, Request, Response } from 'express';
import { StudentServies } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
//import studentValidationSchemaJoi from './student.validationJoi';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServies.getAllStudentsFromDb();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'students retrieved successfully',
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
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'single student is retrieved successfully',
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
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'student deleted successfully',
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
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'student deleted successfully',
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
