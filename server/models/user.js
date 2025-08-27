import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true }, // Added name field
  password: { type: String, required: true },
  userType: { type: String, enum: ['Admin', 'HR', 'Employee', 'Candidate'], required: true },
  email: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
});

export default mongoose.model('User', userSchema);