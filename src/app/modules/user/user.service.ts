import config from '../../config';
import { Student } from '../students/student.interface';
import { NewUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: Student) => {
  //  const result = await StudentModel.create(student);

  // creating user object
  const user: NewUser = {};

  // if password is not given use default pass
  //user.password = password || (config.default_pass as string);
  if (!password) {
    user.password = config.default_pass as string;
  } else {
    user.password = password;
  }

  // set student role
  user.role = 'student';

  // set manually generated id
  user.id = '20301000001';

  //create a user
  const result = await User.create(user);

  //create a student

  if (Object.keys(result).length) {
    studentData.id = result.id;
    studentData.user = result._id;
  }

  return result;
};

export const UserServices = {
  createStudentIntoDB,
};
