import { StudentModel } from './student.model';
import mongoose from 'mongoose';
import AppError from '../../Error/AppError';
import { User } from '../user/user.model';
import httpStatus from 'http-status';

const getAllStudentsFromDb = async () => {
  const result = await StudentModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicfaculty',
      },
    });
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicfaculty',
      },
    });
  //const result = await StudentModel.aggregate([{ $match: { id: id } }]);

  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const result = await StudentModel.deleteOne({ id });
  return result;
};

const deleteStudentFromDbHe = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction;
    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isdeleted: true },
      { new: true, session },
    ); // findoneAndupdate as amra nijeder toiri id use korchi
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student');
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isdeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    console.log(err);
  }
};

export const StudentServies = {
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
  deleteStudentFromDbHe,
};
