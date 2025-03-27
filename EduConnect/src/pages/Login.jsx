import React, { useState, createContext, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  ChevronRight, 
  UserCircle, 
  School 
} from 'lucide-react';

// Authentication Context
const AuthContext = createContext({
  isAuthenticated: false,
  userType: '',
  login: () => {},
  logout: () => {}
});

// Authentication Provider
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('');

  const login = (email, password, type) => {
    // Simulated login logic (replace with actual authentication)
    if (email && password) {
      setIsAuthenticated(true);
      setUserType(type);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserType('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Login Page Component
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('student');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password, loginType);
    
    // Navigate based on user type
    if (loginType === 'student') {
      navigate('/student/dashboard');
    } else {
      navigate('/teacher/dashboard');
    }
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        initial={{ backgroundPosition: '0 0' }}
        animate={{ 
          backgroundPosition: ['0 0', '50px 50px', '0 0'],
          transition: { 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="100%" 
          height="100%" 
          viewBox="0 0 1440 810" 
          preserveAspectRatio="xMinYMin slice"
        >
          <defs>
            <pattern 
              id="dynamicPattern" 
              width="80" 
              height="80" 
              patternUnits="userSpaceOnUse"
            >
              <path 
                d="M0 0 L40 40 L80 0 M0 40 L40 80 L80 40" 
                fill="none" 
                stroke="#8b5cf6" 
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dynamicPattern)" />
        </svg>
      </motion.div>

      {/* Login Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div 
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Classroom <span className="text-purple-600">Hub</span> Login
            </h1>

            {/* Login Type Selector */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 rounded-full p-1 flex items-center">
                <button
                  onClick={() => setLoginType('student')}
                  className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                    loginType === 'student' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-600'
                  }`}
                >
                  <UserCircle className="mr-2" size={20} />
                  Student
                </button>
                <button
                  onClick={() => setLoginType('teacher')}
                  className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                    loginType === 'teacher' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-600'
                  }`}
                >
                  <School className="mr-2" size={20} />
                  Teacher
                </button>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required 
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required 
                />
              </div>
              <motion.button 
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login <ChevronRight className="ml-2" />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Wrapper Component
const Login = () => {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
};

export default Login;