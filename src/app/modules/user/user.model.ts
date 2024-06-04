import { required } from 'joi';
import { Schema, model } from 'mongoose';
import { Tuser } from './user.interface';

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
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const User = model<Tuser>('User', userSchema);