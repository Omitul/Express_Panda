import { Request, Response } from 'express';
import { StudentServies } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: StudentData } = req.body;
    // will call service func to send this data
    const result = await StudentServies.createStudentIntoDB(StudentData);

    //send response

    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
    console.log('cannot posted data!');
  }
};

export const StudentControllers = {
  createStudent,
};
