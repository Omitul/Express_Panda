import { StudentModel } from './student.model';
import { Student } from './student.interface';

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
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
  deleteStudentFromDbHe,
};
