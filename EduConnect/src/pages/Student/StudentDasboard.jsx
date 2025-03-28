
import React, { useState, createContext, useContext, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  User, 
  QrCode, 
  MessageCircle, 
  Calendar, 
  Sun,  
  Moon,
  ArrowUpRight,
  Lock,
  Mail,
  ChevronRight
} from 'lucide-react';

// Dark Mode Context
const DarkModeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {}
});

// Authentication Context
const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
});

// Dark Mode Provider
const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check if dark mode is saved in local storage or system preference
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' || 
           (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (darkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// QR Code Scanning Component
const QRCodeScanner = ({ onClose }) => {
  const videoRef = useRef(null);
  const [scannedResult] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment' 
          } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Unable to access camera. Please check permissions.');
      }
    };

    startCamera();

    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        const tracks = stream?.getTracks();
        tracks?.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-black/80 flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-full max-w-md aspect-square bg-white rounded-xl overflow-hidden">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 border-[20px] border-transparent pointer-events-none">
          <div className="absolute top-0 left-0 w-1/4 h-1 bg-purple-500 animate-scan-line"></div>
          <div className="absolute top-0 right-0 h-1/4 w-1 bg-purple-500 animate-scan-line-vertical"></div>
        </div>
      </div>

      <motion.button 
        onClick={onClose}
        className="mt-8 bg-white text-black px-6 py-3 rounded-lg flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Close Camera
      </motion.button>

      {scannedResult && (
        <div className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
          Scanned: {scannedResult}
        </div>
      )}
    </motion.div>
  );
};

// Profile Component
const ProfileCard = () => {
  return (
    <motion.div 
      className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-lg"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-purple-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <User className="text-purple-600 dark:text-white" size={40} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">KAVISH SHAH</h3>
          <p className="text-md text-gray-600 dark:text-gray-300">LINEAR DEPRESSION</p>
        </div>
        <ArrowUpRight className="ml-auto text-purple-600 dark:text-white" size={28} />
      </div>
    </motion.div>
  );
};

// Attendance Component
const AttendanceCard = () => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">My Attendance</h3>
        <Calendar className="text-green-600" size={28} />
      </div>
      <div className="space-y-3">
        {[
          { label: 'Total Classes', value: '45/50' },
          { label: 'Attendance Rate', value: '90%' }
        ].map((item, index) => (
          <div 
            key={index} 
            className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
          >
            <span className="text-md text-gray-600 dark:text-gray-300">{item.label}</span>
            <span className="text-lg font-bold text-gray-800 dark:text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Attendance QR Code Component
const AttendanceQRCode = () => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Attendance QR</h3>
        <QrCode className="text-purple-600" size={28} />
      </div>
      <div className="w-full aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 200 200" 
          className="w-3/4 h-3/4 text-purple-500"
        >
          <motion.rect 
            x="20" 
            y="20" 
            width="160" 
            height="160" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.circle 
            cx="100" 
            cy="100" 
            r="30" 
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 1 }}
          />
        </svg>
      </div>
    </motion.div>
  );
};

// Chatbot Component
const ChatbotCard = () => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">AI Chatbot</h3>
        <MessageCircle className="text-blue-600" size={28} />
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
        <p className="text-md text-gray-600 dark:text-gray-300">
          Need help? Chat with our AI assistant
        </p>
      </div>
    </motion.div>
  );
};

// Main Dashboard Component
const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const navItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: Calendar, label: 'Attendance', id: 'attendance' },
    { icon: QrCode, label: 'QR Code', id: 'qr' },
    { icon: MessageCircle, label: 'Chatbot', id: 'chatbot' },
    { icon: User, label: 'Profile', id: 'profile' }
  ];

  const handleNavItemClick = (id) => {
    if (id === 'qr') {
      setIsQRScannerOpen(true);
    } else {
      setActiveTab(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Top Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-purple-600" />}
          </button>
        </div>
      </motion.nav>

      {/* Dashboard Grid */}
      <div className="p-4 pt-20 grid grid-cols-1 md:grid-cols-2 gap-6 pb-24">
        <ProfileCard />
        <AttendanceCard />
        <AttendanceQRCode />
        <ChatbotCard />
      </div>

      {/* Bottom Navigation */}
      <motion.nav 
        className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex justify-around py-4 max-w-xl mx-auto">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleNavItemClick(item.id)}
              className={`flex flex-col items-center justify-center w-full ${
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

      {/* QR Code Scanner Modal */}
      <AnimatePresence>
        {isQRScannerOpen && (
          <QRCodeScanner onClose={() => setIsQRScannerOpen(false)} />
        )}
      </AnimatePresence>
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
