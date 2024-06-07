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

export const AcademicSemesterServices = {
  createAcademicSemesterintoDb,
};
