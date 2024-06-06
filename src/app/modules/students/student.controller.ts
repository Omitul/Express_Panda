import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServies } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { nextTick } from 'process';
//import studentValidationSchemaJoi from './student.validationJoi';
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServies.getAllStudentsFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'students retrieved successfully',
    data: result,
  });
});

const getSingleStudent: RequestHandler = async (req, res, next) => {
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

const deleteStudentFromDb: RequestHandler = async (req, res, next) => {
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

const deleteStudentFromDbH: RequestHandler = async (req, res, next) => {
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
