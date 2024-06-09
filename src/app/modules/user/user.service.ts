import config from '../../config';
import { academicSemester } from '../AcademicSemester/academicSemester.model';
import { Student } from '../students/student.interface';
import { StudentModel } from '../students/student.model';
import { Tuser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

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
  // set manually generated id
  if (admissionSemester)
    userData.id = await generateStudentId(admissionSemester);

  //create a user
  const newUser = await User.create(userData);

  //create a student

  if (Object.keys(newUser).length) {
    payload.id = newUser.id; // embedding id
    payload.user = newUser._id; // reference id

    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
