import { Schema, model } from 'mongoose';
import { TAademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicfaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicDepartment = model<TAademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
