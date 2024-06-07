import { TAcademicSemester } from './academicSemester.interface';
import { academicSemester } from './academicSemester.model';

const createAcademicSemesterintoDb = async (payload: TAcademicSemester) => {
  const result = await academicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterintoDb,
};
