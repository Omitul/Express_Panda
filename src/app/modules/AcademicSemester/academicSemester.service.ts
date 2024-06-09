import { acadedemicSemesterNameAndCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { academicSemester } from './academicSemester.model';

const createAcademicSemesterintoDb = async (payload: TAcademicSemester) => {
  if (acadedemicSemesterNameAndCodeMapper[payload.name] != payload.code) {
    throw new Error('Invalid Semester Code');
  }

  const result = await academicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterFromDB = async () => {
  const result = await academicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await academicSemester.findById(id);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    acadedemicSemesterNameAndCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }
  const result = await academicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterintoDb,
  updateAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
};
