import { Schema, model } from 'mongoose';
import { TAademicDepartment } from './academicDepartment.interface';
import AppError from '../../Error/AppError';
import httpStatus from 'http-status';

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

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (isDepartmentExist) {
    throw new AppError(500, 'Department already exists');
  }

  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartment.findOne({
    query,
  });

  if (!isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This department doenst exist!');
  }
  next();
});

export const AcademicDepartment = model<TAademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
