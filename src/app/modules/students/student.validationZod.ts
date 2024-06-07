import { z } from 'zod';

const userNameValidationZodSchema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string().regex(/^[a-zA-Z]+$/),
});

const guardianValidationZodSchema = z.object({
  fatherName: z.string(),
  motherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianValidationZodSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const Create_Student_Validation = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationZodSchema,

      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.date().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),

      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationZodSchema,
      localGuardian: localGuardianValidationZodSchema,
      profileImage: z.string(),
    }),
  }),
});

export const studentValidations = {
  Create_Student_Validation,
};
