import { UserServices } from './user.service';
import { Response, Request } from 'express';

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

    const { password, student: StudentData } = req.body;

    // const zodParsedData = studentValidationZodSchema.parse(StudentData);

    //used joi
    //const { error, value } = studentValidationSchemaJoi.validate(StudentData);
    //console.log(error, value);
    // will call service func to send this data
    //const result = await StudentServies.createStudentIntoDB(value);

    const result = await UserServices.createStudentIntoDB(
      password,
      StudentData,
    );

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
