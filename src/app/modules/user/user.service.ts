import mongoose from 'mongoose';
import config from '../../config';
import { academicSemester } from '../AcademicSemester/academicSemester.model';
import { Student } from '../students/student.interface';
import { StudentModel } from '../students/student.model';
import { Tuser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../Error/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: Student) => {
  //  const result = await StudentModel.create(student);

  // creating user object
  const userData: Partial<Tuser> = {};

  // if password is not given use default pass
  //user.password = password || (config.default_pass as string);
  if (!password) {
    userData.password = config.default_pass as string;
  } else {
    userData.password = password;
  }

  // set student role
  userData.role = 'student';

  //findAcademicSemesterInfo
  const admissionSemester = await academicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // set manually generated id
    if (admissionSemester)
      userData.id = await generateStudentId(admissionSemester);

    //create a user
    const newUser = await User.create([userData], { session });

    //create a student
    // Object.keys(newUser).length
    if (newUser.length <= 0) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id; // embedding id
    payload.user = newUser[0]._id; // reference id
    console.log(payload);

    const newStudent = await StudentModel.create([payload], { session });
    // console.log('ahare');

    if (newStudent.length <= 0) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};
export const UserServices = {
  createStudentIntoDB,
};
