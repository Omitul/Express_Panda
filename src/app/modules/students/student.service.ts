import { StudentModel } from './student.model';
import mongoose, { ObjectId } from 'mongoose';
import AppError from '../../Error/AppError';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import { Student } from './student.interface';

const getAllStudentsFromDb = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];
  let searchTerm = '';

  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = StudentModel.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const excludeFields = ['searchTerm', 'sort', 'limit', 'fields', 'page'];

  excludeFields.forEach((el) => delete queryObj[el]);

  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicfaculty',
      },
    });

  let sort = '-createdAt';

  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);
  let page = 1;
  let limit = 1;
  let skip = 0;
  if (query.limit) {
    limit = Number(query.limit);
  }
  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginationQuery = sortQuery.skip(skip);

  const limitQuery = paginationQuery.limit(limit);

  let fields = '-__v';

  if (query.fields) {
    fields = (query.fields as string).split(',').join('');
  }

  const fieldQuery = await limitQuery.select(fields);

  return fieldQuery;
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
