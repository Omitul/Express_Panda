import { Request, Response } from 'express';
import { StudentServies } from './student.service';
import studentValidationZodSchema from './student.validationZod';
//import studentValidationSchemaJoi from './student.validationJoi';
const createStudent = async (req: Request, res: Response) => {
  try {
    ///schema validation using joi

    /// using zod validation
    // const studentValidationSchemaJod = z.object({
    //   id: z.string(),
    //   name: z.object({
    //     firstName: z
    //       .string()
    //       .max(20, 'firstName cannot be more than 20 characters'),
    //   }),
    // });

    const { student: StudentData } = req.body;

    const zodParsedData = studentValidationZodSchema.parse(StudentData);

    //used joi
    //const { error, value } = studentValidationSchemaJoi.validate(StudentData);
    //console.log(error, value);
    // will call service func to send this data
    //const result = await StudentServies.createStudentIntoDB(value);

    const result = await StudentServies.createStudentIntoDB(zodParsedData);

    //send response

    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServies.getAllStudentsFromDb();
    res.status(200).json({
      success: true,
      message: 'student are retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
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
  }
};

const deleteStudentFromDb = async (req: Request, res: Response) => {
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
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudentFromDb,
};
