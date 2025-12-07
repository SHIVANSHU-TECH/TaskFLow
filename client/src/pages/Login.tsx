
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login as loginService, googleAuth } from '../services/authService';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { FcGoogle } from 'react-icons/fc';
import { FaTasks } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginService({ email, password });
      authContext?.login(data);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      if (user.email) {
        const data = await googleAuth({
            email: user.email,
            username: user.displayName || user.email.split('@')[0],
            googleId: user.uid
        });
        authContext?.login(data);
        navigate('/');
      }
    } catch (err: any) {
       console.error(err);
       setError(err.response?.data?.message || 'Google Login Failed');
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white text-base";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-64 h-64 md:w-96 md:h-96 bg-purple-300/30 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-bounce-short"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 md:w-96 md:h-96 bg-indigo-300/30 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-bounce-short" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="glass-card w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl z-10 animate-fade-in-up">
        <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white mb-4 shadow-lg shadow-indigo-500/30">
                <FaTasks size={24} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 mt-2 text-sm sm:text-base">Sign in to continue to TaskFlow</p>
        </div>

        {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100 flex items-center gap-2 mb-6">
                <span className="font-bold">Error:</span> {error}
            </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Email</label>
            <input
              type="email"
              required
              className={inputClasses}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Password</label>
            <input
              type="password"
              required
              className={inputClasses}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl active:scale-95 transition-all duration-200 mt-2"
          >
            Sign In
          </button>
        </form>

        <div className="relative my-6 sm:my-8">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-slate-800 text-slate-400">Or continue with</span>
            </div>
        </div>

        <button 
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 p-3 rounded-lg text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600"
        >
          <FcGoogle size={22} />
          <span>Google</span>
        </button>

        <p className="mt-6 sm:mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          Don't have an account? <Link to="/register" className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline">Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
