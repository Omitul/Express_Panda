import { StudentModel } from './student.model';
import { Student } from './student.interface';

const createStudentIntoDB = async (studentData: Student) => {
  //  const result = await StudentModel.create(student);

  const student = new StudentModel(studentData);
  const result = await student.save(); //mongoose provide kore ei func
  return result;
};

const getAllStudentsFromDb = async () => {
  const result = await StudentModel.find();

  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  //const result = await StudentModel.aggregate([{ $match: { id: id } }]);

  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const result = await StudentModel.deleteOne({ id });
  return result;
};

const deleteStudentFromDbHe = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isdeleted: true });
  return result;
};

export const StudentServies = {
  createStudentIntoDB,
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
  deleteStudentFromDbHe,
};
