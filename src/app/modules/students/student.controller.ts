import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServies } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { nextTick } from 'process';
import catchAsync from '../../utils/catchAsync';
//import studentValidationSchemaJoi from './student.validationJoi';

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServies.getAllStudentsFromDb(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'students retrieved successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;

  const result = await StudentServies.getSingleStudentFromDb(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single student is retrieved successfully',
    data: result,
  });
});

const deleteStudentFromDb = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServies.deleteStudentFromDb(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student deleted successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentServies.updateStudentIntoDb(studentId, student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student Updated successfully',
    data: result,
  });
});

const deleteStudentFromDbH = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServies.deleteStudentFromDbHe(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudentFromDb,
  deleteStudentFromDbH,
  updateStudent,
};
