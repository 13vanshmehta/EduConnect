import React, { useState, useEffect, createContext, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { 
  User, 
  MessageCircle, 
  Calendar, 
  Sun, 
  Moon,
  ChevronRight,
  Home,
  QrCode
} from 'lucide-react';

// Dark Mode Context
const DarkModeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {}
});

// Dark Mode Provider
const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage or system preference
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' || 
           (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', newMode.toString());
      return newMode;
    });
  };

  useEffect(() => {
    // Apply dark mode class to root element
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Profile Component
const ProfileCard = () => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-full"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 bg-purple-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <User className="text-purple-600 dark:text-white" size={48} />
        </div>
        <div className="flex-grow">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">John Doe</h2>
          <p className="text-md text-gray-600 dark:text-gray-300">Computer Science Student</p>
          <div className="mt-4 flex space-x-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Semester</p>
              <p className="font-semibold text-gray-800 dark:text-white">6th</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">GPA</p>
              <p className="font-semibold text-gray-800 dark:text-white">3.8</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Attendance Component
const AttendanceCard = () => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800 dark:text-white">My Attendance</h3>
        <Calendar className="text-green-600" />
      </div>
      <div className="space-y-2">
        {[
          { label: 'Total Classes', value: '45/50' },
          { label: 'Attendance Rate', value: '90%' }
        ].map((item, index) => (
          <div 
            key={index} 
            className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded-lg"
          >
            <span className="text-sm text-gray-600 dark:text-gray-300">{item.label}</span>
            <span className="font-bold text-gray-800 dark:text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Chatbot Component
const ChatbotCard = () => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800 dark:text-white">AI Chatbot</h3>
        <MessageCircle className="text-blue-600" />
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Need help? Chat with our AI assistant
        </p>
        <motion.button 
          className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Chat <ChevronRight className="ml-2" size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Main Dashboard Component
const StudentDashboard = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [activeTab, setActiveTab] = useState('home'); // Define activeTab state
  const navItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: Calendar, label: 'Attendance', id: 'attendance' },
    { icon: QrCode, label: 'Scan QR', id: 'qr' },
    { icon: MessageCircle, label: 'Chatbot', id: 'chatbot' },
    { icon: User, label: 'Profile', id: 'profile' }
];
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-4 pt-18">
      {/* Top Navigation */}
      <motion.nav 
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button 
          onClick={toggleDarkMode} 
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-purple-600" />}
        </button>
      </motion.nav>

    {/* Bottom Navigation */}
    <motion.nav 
        className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-lg"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        >
        <div className="grid grid-cols-5 py-3">
            {navItems.map((item) => (
            <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center ${
                activeTab === item.id 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}
                whileTap={{ scale: 0.9 }}
            >
                <item.icon size={24} />
                <span className="text-xs mt-1">{item.label}</span>
            </motion.button>
            ))}
        </div>
    </motion.nav>

      {/* Dashboard Content */}
      <div className="space-y-6">
        <ProfileCard />
        <div className="grid grid-cols-2 gap-4">
          <AttendanceCard />
          <ChatbotCard />
        </div>
      </div>
    </div>
  );
};

// Wrapped Dashboard Component
const Dashboard = () => {
  return (
    <DarkModeProvider>
      <StudentDashboard />
    </DarkModeProvider>
  );
};

export default Dashboard;