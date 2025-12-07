import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  googleId?: string;
  verified: boolean;
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // Password is not required if using Google Auth
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  verified: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;