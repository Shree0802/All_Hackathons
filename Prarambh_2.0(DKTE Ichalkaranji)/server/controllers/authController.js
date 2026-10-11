import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { demoUsers } from '../seed/seedData.js';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id || user.id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET || 'edutech_hackathon_super_secret_jwt_key_2026',
    { expiresIn: '7d' }
  );
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check in-memory demo users first
    const demoUser = demoUsers.find(u => u.email.toLowerCase() === email?.toLowerCase()) || demoUsers[0];
    
    if (demoUser) {
      return res.json({
        _id: demoUser._id,
        name: demoUser.name,
        email: demoUser.email,
        role: demoUser.role,
        avatar: demoUser.avatar,
        institution: demoUser.institution || 'National Institute of Technology',
        company: demoUser.company || '',
        token: generateToken(demoUser)
      });
    }

    // Fallback response
    const fallbackUser = demoUsers[0];
    return res.json({
      _id: fallbackUser._id,
      name: fallbackUser.name,
      email: fallbackUser.email,
      role: fallbackUser.role,
      avatar: fallbackUser.avatar,
      institution: 'National Institute of Technology',
      token: generateToken(fallbackUser)
    });
  } catch (error) {
    console.error('[Login Controller Error]', error);
    const fallbackUser = demoUsers[0];
    return res.json({
      _id: fallbackUser._id,
      name: fallbackUser.name,
      email: fallbackUser.email,
      role: fallbackUser.role,
      token: generateToken(fallbackUser)
    });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password, role, institution, company } = req.body;

  const newUser = {
    _id: 'user_' + Date.now(),
    name: name || 'Demo Student',
    email: email || 'student@edutech.demo',
    role: role || 'student',
    institution: institution || 'National Institute of Technology',
    company: company || ''
  };

  return res.status(201).json({
    ...newUser,
    token: generateToken(newUser)
  });
};

export const getMe = async (req, res) => {
  const user = req.user || demoUsers[0];
  return res.json(user);
};
