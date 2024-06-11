import { StudentModel } from './student.model';
import mongoose from 'mongoose';
import AppError from '../../Error/AppError';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import { Student } from './student.interface';
import { object } from 'joi';

const getAllStudentsFromDb = async (query: Record<string, unknown>) => {
  let searchTerm = '';

  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const result = await StudentModel.find({
    $or: ['email', 'name.firstName', 'presentAddress'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  })
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
  const result = await StudentModel.find({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicfaculty',
      },
    });
  //const result = await StudentModel.aggregate([{ $match: { id: id } }]);
  console.log(result);
  return result;
};

const updateStudentIntoDb = async (id: string, payload: Partial<Student>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`$localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);
  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );

  //const result = await StudentModel.aggregate([{ $match: { id: id } }]);
  console.log(result);
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
    throw new Error('Failed to delete Student');
  }
};

export const StudentServies = {
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
  deleteStudentFromDbHe,
  updateStudentIntoDb,
};
