import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from "motion/react";

// Advanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const slideInVariants = {
  hidden: { 
    opacity: 0, 
    x: -100 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 10
    }
  }
};

const slideInRightVariants = {
  hidden: { 
    opacity: 0, 
    x: 100 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 10
    }
  }
};

const scaleUpVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  }
};

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Missy John",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      text: "We went through the process of getting all his credits recognized and the selection of subjects was done with the help of the counselor. He was less frustrated because of his career options and he is satisfied with the result of school since he found the best way to make sure my son can finish high school.",
      rating: 5,
      role: "Parent"
    },
    {
      name: "Sarah Parker",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      text: "The teachers are incredibly dedicated and the curriculum is comprehensive. My child has shown remarkable progress since joining KMT School.",
      rating: 5,
      role: "Parent"
    }
  ];

  // Scroll-based parallax effect hook
  const ScrollParallaxSection = ({ children }) => {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.2]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

    return (
      <motion.div 
        style={{ scale, opacity }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="pt-16">
      {/* Hero Section with Enhanced Animations */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="relative bg-teal-50 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center py-12 md:py-16">
            <motion.div 
              variants={slideInVariants}
              className="md:w-1/2"
            >
              <motion.h1 
                variants={slideInVariants}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              >
                Welcome to <br /> <span className='text-teal-900'>EDU-CONNECT</span>
              </motion.h1>
              <motion.p 
                variants={slideInVariants}
                className="text-lg text-gray-600 mb-6"
              >
                "Education is hidden in the soul of your child"
              </motion.p>
              <motion.div variants={slideInVariants}>
                <Link
                  to="/welcome"
                  className="inline-block bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors"
                >
                  GET STARTED
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              variants={slideInRightVariants}
              className="md:w-1/2 mt-8 md:mt-0"
            >
              <ScrollParallaxSection>
                <img
                  src="/Landing.png"
                  alt="Happy student"
                  className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover mx-auto hover:rotate-6 transition-transform duration-300"
                />
              </ScrollParallaxSection>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Class Types Section with Scroll-Triggered Animations */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            variants={slideInVariants}
            className="text-3xl font-bold text-center mb-12"
          >
            TYPES OF CLASSES IN OUR SCHOOLS
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Offline Class */}
            <motion.div 
              variants={scaleUpVariants}
              whileHover={{ 
                scale: 1.05,
                rotate: 2,
                transition: { duration: 0.05 }
              }}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-2xl transition-all duration-300"
            >
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    type: "spring", 
                    stiffness: 200 
                  }
                }}
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Offline class"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">OFFLINE CLASS</h3>
              <p className="text-gray-600">Traditional classroom learning with direct teacher interaction and peer engagement.</p>
            </motion.div>

            {/* Online Class */}
            <motion.div 
              variants={scaleUpVariants}
              whileHover={{ 
                scale: 1.05,
                rotate: 2,
                transition: { duration: 0.05 }
              }}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-2xl transition-all duration-300"
            >
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    type: "spring", 
                    stiffness: 200 
                  }
                }}
                src="https://images.unsplash.com/photo-1584697964358-3e14ca57658b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Online class"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">ONLINE CLASS</h3>
              <p className="text-gray-600">Interactive virtual learning environment with live sessions and digital resources.</p>
            </motion.div>

            {/* Virtual Class */}
            <motion.div 
              variants={scaleUpVariants}
              whileHover={{ 
                scale: 1.05,
                rotate: 2,
                transition: { duration: 0.05 }
              }}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-2xl transition-all duration-300"
            >
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    type: "spring", 
                    stiffness: 200 
                  }
                }}
                src="https://images.unsplash.com/photo-1593697821028-7cc59cfd7399?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Virtual class"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">VIRTUAL CLASS</h3>
              <p className="text-gray-600">Immersive learning experience with advanced technology and virtual reality tools.</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section with Enhanced Animations */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            variants={slideInVariants}
            className="text-3xl font-bold text-center mb-12"
          >
            TESTIMONIALS FROM PARENTS
          </motion.h2>
          <div className="relative">
            <motion.div 
              variants={slideInVariants}
              className="flex flex-col items-center"
            >
              <div className="w-full max-w-2xl">
                <motion.div 
                  initial={{ 
                    opacity: 0, 
                    scale: 0.9,
                    y: 50 
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: 0
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300,
                    damping: 20
                  }}
                  key={currentTestimonial}
                  className="bg-white shadow-xl rounded-2xl p-8 md:p-10"
                >
                  {/* Testimonial content remains the same */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <motion.img
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 200 
                        }}
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover ring-4 ring-teal-50"
                      />
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-teal-500 text-white px-4 py-1 rounded-full text-sm"
                      >
                        {testimonials[currentTestimonial].role}
                      </motion.div>
                    </div>
                    
                    {/* Rest of the testimonial content */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mb-4"
                    >
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        {testimonials[currentTestimonial].name}
                      </h3>
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <motion.span 
                            key={i} 
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * i }}
                            className="text-yellow-400 text-xl"
                          >
                            ★
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-gray-600 text-lg leading-relaxed italic"
                    >
                      "{testimonials[currentTestimonial].text}"
                    </motion.p>
                  </div>
                </motion.div>
              </div>

              {/* Navigation buttons remain the same */}
              <div className="flex justify-center gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                  className="p-3 rounded-full bg-teal-100 hover:bg-teal-200 transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6 text-teal-600" />
                </motion.button>
                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        currentTestimonial === index ? 'bg-teal-500 w-4' : 'bg-teal-200'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                  className="p-3 rounded-full bg-teal-100 hover:bg-teal-200 transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6 text-teal-600" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;