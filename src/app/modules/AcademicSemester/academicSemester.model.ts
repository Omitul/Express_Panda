import { Schema, model } from 'mongoose';
import {
  TAcademicSemester,
  TMonth,
  TacademicSemesterCode,
  TacademicSemesterName,
} from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  months,
} from './academicSemester.constant';
import { string } from 'joi';

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName,
    },
    year: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },

    startMonth: {
      type: String,
      required: true,
      enum: months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: months,
    },
  },
  {
    timestamps: true,
  },
);

export const academicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  AcademicSemesterSchema,
);
