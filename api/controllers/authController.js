import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { userID, userName, userEmail, role } = req.body; 
  try {
    const newUser = new User({ userID, userName, userEmail, role });
    await newUser.save();
    res.status(201).json({ message: "User registered", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { userNameOrEmail } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ userName: userNameOrEmail }, { userEmail: userNameOrEmail }],
    });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const token = jwt.sign(
      { userID: user.userID, userEmail: user.userEmail, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};