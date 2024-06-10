import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { Response, Request, NextFunction } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    ///schema validation using joi

    const result =
      await AcademicDepartmentServices.createAcademicDepartmentIntoDb(req.body);

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
      message: 'Academic Department created successfully',
      data: result,
    });
  },
);

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  console.log(departmentId);
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
      departmentId,
    );

  console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Academic Department is retrieved successfully',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params;
    const result =
      await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
        departmentId,
        req.body,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is updated successfully',
      data: result,
    });
  },
);

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Departments are retrieved successfully',
    data: result,
  });
});
export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
