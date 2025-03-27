import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Globe, 
  Activity, 
  ArrowRight,
  Check,
  Zap
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Login Card */}
        <div
          className="p-6 bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition"
          onClick={() => navigate('/student-dashboard')}
        >
          <h2 className="text-xl font-bold text-center">Student Login</h2>
          <p className="text-gray-600 text-center mt-2">Access your student portal</p>
        </div>

        {/* Teacher Login Card */}
        <div
          className="p-6 bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition"
          onClick={() => navigate('/teacher-dashboard')}
        >
          <h2 className="text-xl font-bold text-center">Teacher Login</h2>
          <p className="text-gray-600 text-center mt-2">Access your teacher portal</p>
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState(null);

  // Enhanced feature descriptions
  const features = [
    { 
      icon: BookOpen, 
      title: "Interactive Courses", 
      description: "Engaging, multimedia-rich learning experiences tailored to individual learning styles.",
      color: "purple"
    },
    { 
      icon: Users, 
      title: "Collaborative Learning", 
      description: "Real-time group projects, peer reviews, and interactive study sessions.",
      color: "blue"
    },
    { 
      icon: Calendar, 
      title: "Smart Scheduling", 
      description: "Intelligent calendar integration with AI-powered time management.",
      color: "green"
    },
    { 
      icon: Globe, 
      title: "Global Connectivity", 
      description: "Connect with learners and educators from around the world.",
      color: "indigo"
    }
  ];

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

      {/* Floating Geometric Shapes with Enhanced Animation */}
      {[
        { 
          initial: { x: -100, y: -100 }, 
          animate: { x: [-100, 50, -100], y: [-100, 50, -100] },
          className: "bg-purple-200/30 top-0 left-0 w-64 h-64",
          duration: 20
        },
        { 
          initial: { x: 100, y: 100 }, 
          animate: { x: [100, -50, 100], y: [100, -50, 100] },
          className: "bg-blue-200/30 bottom-0 right-0 w-80 h-80",
          duration: 25
        }
      ].map((shape, index) => (
        <motion.div
          key={index}
          initial={{ ...shape.initial, rotate: 0 }}
          animate={{ 
            ...shape.animate,
            rotate: [0, 360, 0]
          }}
          transition={{ 
            duration: shape.duration, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className={`absolute rounded-full blur-2xl ${shape.className}`}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Intro & Features */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-4 mt-4">
              Classroom <span className="text-purple-600">Hub</span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Revolutionizing education through intelligent digital collaboration and personalized learning experiences.
            </p>
          </motion.div>

          {/* Enhanced Feature Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
                className={`
                  bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-md 
                  hover:shadow-xl transition-all group relative overflow-hidden
                  ${hoveredFeature === index ? 'ring-4 ring-opacity-50 ring-' + feature.color + '-500' : ''}
                `}
              >
                <feature.icon 
                  className={`text-${feature.color}-600 mb-2 group-hover:scale-110 transition-transform`} 
                  size={32} 
                />
                <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                
                <AnimatePresence>
                  {hoveredFeature === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="absolute inset-0 bg-white p-4 text-sm text-gray-600 overflow-hidden"
                    >
                      {feature.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex space-x-4"
          >
            <button 
              onClick={() => navigate('/auth/login')}
              className="flex items-center bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors group"
            >
              LOGIN
              <Zap 
                className="ml-2 group-hover:scale-110 transition-transform" 
                size={20} 
              />
            </button>
          </motion.div>
        </div>

        {/* Right Column - Enhanced Interactive SVG Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="hidden md:block"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 600 500" 
            className="w-full h-auto"
          >
            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#8b5cf6', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#6366f1', stopOpacity:1}} />
              </linearGradient>
              
              <filter id="shadowEffect">
                <feDropShadow dx="3" dy="3" stdDeviation="3" floodColor="#4a5568" floodOpacity="0.3"/>
              </filter>
            </defs>
            
            {/* Animated Book Illustration */}
            <motion.rect 
              x="200" 
              y="100" 
              width="250" 
              height="300" 
              rx="20" 
              fill="url(#bookGradient)"
              filter="url(#shadowEffect)"
              initial={{ rotate: 0 }}
              animate={{ 
                rotate: [-5, 5, -5],
                transition: { 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }
              }}
            />
            
            {/* Interactive Learning Elements */}
            <motion.circle 
              cx="250" 
              cy="180" 
              r="30" 
              fill="#fbbf24"
              initial={{ scale: 1 }}
              animate={{ 
                scale: [1, 1.2, 1],
                transition: { 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }
              }}
            />
            
            {/* Animated Progress Bars */}
            {[
              { y: 220, width: 170, color: "#10b981" },
              { y: 260, width: 140, color: "#3b82f6" }
            ].map((bar, index) => (
              <motion.rect 
                key={index}
                x="250" 
                y={bar.y} 
                width={bar.width} 
                height="20" 
                rx="10" 
                fill={bar.color}
                initial={{ scaleX: 0 }}
                animate={{ 
                  scaleX: 1,
                  transition: { 
                    duration: 1, 
                    delay: index * 0.5,
                    type: "spring",
                    stiffness: 100 
                  }
                }}
              />
            ))}
            
            {/* Animated Action Button */}
            <motion.rect 
              x="220" 
              y="320" 
              width="210" 
              height="40" 
              rx="20" 
              fill="#f43f5e"
              initial={{ opacity: 0, y: 350 }}
              animate={{ 
                opacity: 1, 
                y: 320,
                transition: { 
                  type: "spring", 
                  stiffness: 100 
                }
              }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Animated Wave Divider */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { duration: 1 }
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
          className="w-full h-32 text-white fill-current"
        >
          <path 
            fillOpacity="1" 
            d="M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,186.7C672,160,768,128,864,133.3C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default LandingPage;