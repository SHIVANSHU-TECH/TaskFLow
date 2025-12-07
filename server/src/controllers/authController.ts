import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Generate JWT Token
const generateToken = (res: any, userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || '', {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: any, res: any) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields: username, email, password' });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with verified: true (per requirements)
    const user = (await User.create({
      username,
      email,
      password: hashedPassword,
      verified: true,
    } as any)) as any;

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        message: "Account created successfully"
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error("Register Error Details:", error); // Log the full error
    res.status(500).json({ message: (error as Error).message || 'Server Error' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Fix: Explicitly check if user exists to prevent null access errors
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check verification status (user is now guaranteed to be non-null)
    if (!user.verified) {
      return res.status(401).json({ message: 'Account not verified. Please contact support.' });
    }

    // Check password if it exists
    if (user.password && (await bcrypt.compare(password, user.password))) {
      generateToken(res, user._id.toString());
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Google Authentication
// @route   POST /api/auth/google
// @access  Public
export const googleAuth = async (req: any, res: any) => {
  const { email, username, googleId } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      // User exists, update googleId if missing
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    } else {
      // Create new user via Google
      user = (await User.create({
        username,
        email,
        googleId,
        verified: true, // Auto verify social logins
      } as any)) as any;
    }

    // Fix: Ensure user exists before accessing properties
    if (!user) {
      return res.status(500).json({ message: 'Error authenticating user' });
    }

    if (!user.verified) {
      return res.status(401).json({ message: 'Account not verified.' });
    }

    generateToken(res, user._id.toString());
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });

  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = (req: any, res: any) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req: any, res: any) => {
  if (req.user) {
    res.json({
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
}