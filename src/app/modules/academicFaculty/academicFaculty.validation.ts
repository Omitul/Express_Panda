import { z } from 'zod';
const CreateAcademicFacultyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Academic Faculty  must be string',
  }),
});

const UpdateAcademicFacultyValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Academic Faculty  must be string',
    })
    .optional(),
});

export const AcademicFacultyValidation = {
  CreateAcademicFacultyValidationSchema,
  UpdateAcademicFacultyValidationSchema,
};
