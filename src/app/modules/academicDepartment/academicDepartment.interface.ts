import { Types } from 'mongoose';

export type TAademicDepartment = {
  name: string;
  academicfaculty: Types.ObjectId;
};
