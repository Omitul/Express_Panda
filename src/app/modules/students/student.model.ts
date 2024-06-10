import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: [true, 'last name required'], /// validated using validator
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: {
    type: String,
    required: [true, 'student id is required'],
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'user id is required'],
    unique: true,
    ref: 'user',
  },

  name: userNameSchema,

  gender: {
    type: String,

    enum: {
      values: ['male', 'female', 'other'],
      message:
        "The gender should be one of the followings: 'male','female','other'.",
    },
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email address',
    },
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },

  bloodGroupd: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImage: { type: String, required: true },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester', /// ekhane mainly tmr model bananur somoi deya database er naam dite hbe jate linked kora jaai
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// pre saved middleware (document middlewares)

//query middleware
studentSchema.pre('find', function (next) {
  this.find({ isdeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { $isdelete: { $ne: true } } });
  next();
});

///model creation 3rd step

export const StudentModel = model<Student>('Student', studentSchema, 'School');
