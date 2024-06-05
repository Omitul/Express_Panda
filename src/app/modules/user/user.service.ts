import config from '../../config';
import { Student } from '../students/student.interface';
import { StudentModel } from '../students/student.model';
import { Tuser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: Student) => {
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

  // set manually generated id
  userData.id = '20301000001';

  //create a user
  const newUser = await User.create(userData);

  //create a student

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id; // embedding id
    studentData.user = newUser._id; // reference id

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
