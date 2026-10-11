import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch, setAuthToken, removeAuthToken, getAuthToken } from '../services/api';

const AuthContext = createContext();

export const demoAccounts = [
  { role: 'student', email: 'student@edutech.demo', name: 'Prathamesh Patil', title: 'Student (Demo)' },
  { role: 'faculty', email: 'faculty@edutech.demo', name: 'Dr. Ramesh Kulkarni', title: 'Faculty / HOD' },
  { role: 'employer', email: 'employer@edutech.demo', name: 'TechNova Labs', title: 'Employer / Recruiter' },
  { role: 'admin', email: 'admin@edutech.demo', name: 'EDUTECH Admin', title: 'System Admin' }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginDemoAccount = async (roleName = 'student') => {
    const demoAcc = demoAccounts.find(a => a.role === roleName) || demoAccounts[0];
    const mockUser = {
      _id: '660a11111111111111111111',
      name: demoAcc.name,
      email: demoAcc.email,
      role: demoAcc.role,
      institution: 'National Institute of Technology',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'
    };
    
    // Immediate state update for smooth instant demo mode
    setUser(mockUser);

    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: demoAcc.email, password: 'password123' })
      });
      if (res && res.token) {
        setAuthToken(res.token);
        setUser(res);
      }
    } catch (err) {
      console.warn('[Demo Login Sync]', err.message);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          const userData = await apiFetch('/auth/me');
          setUser(userData);
        } catch (e) {
          loginDemoAccount('student');
        }
      } else {
        loginDemoAccount('student');
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      setAuthToken(res.token);
      setUser(res);
      return res;
    } catch (err) {
      // Fallback demo login
      const demoAcc = demoAccounts.find(a => a.email.toLowerCase() === email?.toLowerCase()) || demoAccounts[0];
      loginDemoAccount(demoAcc.role);
      return demoAcc;
    }
  };

  const register = async (userData) => {
    const res = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    setAuthToken(res.token);
    setUser(res);
    return res;
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, loginDemoAccount, demoAccounts }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
