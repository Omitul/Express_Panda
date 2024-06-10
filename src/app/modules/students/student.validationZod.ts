import { z } from 'zod';

const CreateuserNameValidationZodSchema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string().regex(/^[a-zA-Z]+$/),
});

const CreateguardianValidationZodSchema = z.object({
  fatherName: z.string(),
  motherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const CreatelocalGuardianValidationZodSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const CreateStudentValidation = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: CreateuserNameValidationZodSchema,

      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),

      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: CreateguardianValidationZodSchema,
      localGuardian: CreatelocalGuardianValidationZodSchema,
      profileImage: z.string(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      isDeleted: z.boolean(),
    }),
  }),
});

const UpdateuserNameValidationZodSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .regex(/^[a-zA-Z]+$/)
    .optional(),
});

const UpdateguardianValidationZodSchema = z.object({
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const UpdatelocalGuardianValidationZodSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

const UpdateStudentValidation = z.object({
  body: z.object({
    student: z.object({
      name: UpdateuserNameValidationZodSchema.optional(),

      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),

      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: UpdateguardianValidationZodSchema.optional(),
      localGuardian: UpdatelocalGuardianValidationZodSchema.optional(),
      profileImage: z.string().optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

export const studentValidations = {
  CreateStudentValidation,
  UpdateStudentValidation,
};
