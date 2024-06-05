import { required } from 'joi';
import { Schema, model } from 'mongoose';
import { Tuser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<Tuser>(
  {
    id: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },

    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

///hashing the password
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
  console.log(this, 'pre hook: we will save the data');
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  console.log(this, 'post hook: we  saved our` data');
  next();
});

export const User = model<Tuser>('User', userSchema);
