import Joi from 'joi';

const userNameValidationSchemaJoi = Joi.object({
  firstName: Joi.string().required(),
  middleName: Joi.string().required(),
  lastName: Joi.string()
    .required()
    .regex(/^[A-Za-z]+$/)
    .messages({
      'string.pattern.base': 'Last name must contain only letters',
    }),
});

// Define Joi schema for Guardian
const guardianValidationSchemaJoi = Joi.object({
  fatherName: Joi.string().required(),
  motherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

// Define Joi schema for LocalGuardian
const localGuardianValidationSchemaJoi = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

// Define Joi schema for Student
const studentValidationSchemaJoi = Joi.object({
  id: Joi.string(),
  name: userNameValidationSchemaJoi,
  gender: Joi.string().valid('male', 'female').required(),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .required(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchemaJoi,
  localGuardian: localGuardianValidationSchemaJoi,
  profileImage: Joi.string().required(),
  isActive: Joi.string().valid('active', 'blocked').required(),
});

export default studentValidationSchemaJoi;
