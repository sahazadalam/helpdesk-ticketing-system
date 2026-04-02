import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { EnvelopeIcon, LockClosedIcon, TicketIcon, UserCircleIcon, ShieldCheckIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Login failed');
    }
    
    setLoading(false);
  };

  const quickLogin = (email, password) => {
    setFormData({ email, password });
    setTimeout(() => {
      const form = document.getElementById('login-form');
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl">
        <div className="text-center">
          <div className="flex justify-center">
            <TicketIcon className="h-12 w-12 text-indigo-600 animate-bounce" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to HelpDesk Pro
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to manage your tickets
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-400 text-red-800 px-4 py-3 rounded-lg">
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        <form id="login-form" className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex justify-center items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </div>
        </form>

        {/* Quick Login Buttons with Custom Credentials */}
        <div className="mt-6">
          <p className="text-xs text-gray-500 text-center mb-3">Quick Login (Demo Accounts)</p>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => quickLogin('sahazadadmin@gmail.com', 'Sahzad@123')}
              className="flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-all duration-200 border-2 border-purple-200"
            >
              <div className="flex items-center space-x-3">
                <ShieldCheckIcon className="h-6 w-6 text-purple-600" />
                <div className="text-left">
                  <div className="font-semibold text-purple-900">Administrator</div>
                  <div className="text-xs text-purple-600">sahazadadmin@gmail.com</div>
                </div>
              </div>
              <div className="text-xs text-purple-500">Click to login</div>
            </button>
            
            <button
              onClick={() => quickLogin('sahazadagent@gmail.com', 'Sahzad2123')}
              className="flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 border-2 border-blue-200"
            >
              <div className="flex items-center space-x-3">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
                <div className="text-left">
                  <div className="font-semibold text-blue-900">Support Agent</div>
                  <div className="text-xs text-blue-600">sahazadagent@gmail.com</div>
                </div>
              </div>
              <div className="text-xs text-blue-500">Click to login</div>
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up here
            </Link>
          </p>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs font-semibold text-gray-700 text-center mb-2">
            📝 Account Options
          </p>
          <div className="space-y-2 text-xs text-gray-600">
            <div className="border-b border-gray-200 pb-2">
              <p className="font-semibold text-purple-700">👑 Admin Access:</p>
              <p>sahazadadmin@gmail.com / Sahzad@123</p>
            </div>
            <div className="border-b border-gray-200 pb-2">
              <p className="font-semibold text-blue-700">🧑‍💻 Agent Access:</p>
              <p>sahazadagent@gmail.com / Sahzad2123</p>
            </div>
            <div>
              <p className="font-semibold text-green-700">👤 Regular User:</p>
              <p>Register with your own email OR use user@example.com / 123456</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            💡 Click on the colored buttons above to auto-fill credentials
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;