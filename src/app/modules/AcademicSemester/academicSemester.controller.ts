import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { Response, Request, NextFunction } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    ///schema validation using joi

    const result = await AcademicSemesterServices.createAcademicSemesterintoDb(
      req.body,
    );

    /// using zod validation
    // const studentValidationSchemaJod = z.object({
    //   id: z.string(),
    //   name: z.object({
    //     firstName: z
    //       .string()
    //       .max(20, 'firstName cannot be more than 20 characters'),
    //   }),
    // });

    // const zodParsedData = studentValidationZodSchema.parse(StudentData);

    //used joi
    //const { error, value } = studentValidationSchemaJoi.validate(StudentData);
    //console.log(error, value);
    // will call service func to send this data
    //const result = await StudentServies.createStudentIntoDB(value);

    // const result = await UserServices.createStudentIntoDB(
    //   password,
    //   StudentData,
    // );

    //send response

    // res.status(200).json({
    //   success: true,
    //   message: 'Academic Semester is created successfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
  },
);
export const AcademicSemesterControllers = {
  createAcademicSemester,
};
