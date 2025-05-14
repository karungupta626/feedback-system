import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // added role to get admin for admin dashboard for a cleaner approach
});

const User = mongoose.model('User', userSchema);
export default User;
