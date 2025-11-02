import React from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion'; // 1. Import motion

// 2. Define variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
  },
};


const AcademicsEvents = () => {
  return (
    // <Layout>
    // 3. Page fade-in transition
      <motion.main 
        className="container mx-auto px-6 py-12 md:py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* 4. Title fade-down */}
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary dark:text-white mb-4">
            Academics & Events
          </h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-text-light dark:text-text-dark leading-relaxed text-justify">
            Stay informed about our upcoming CMEs, workshops, and conferences. The Society is committed to fostering 
            continuous learning and professional development for all its members. Explore our calendar of events to find 
            opportunities for networking, knowledge sharing, and advancing your expertise in the field of pathology.
          </p>
        </motion.div>

        {/* 5. Stagger container */}
        <motion.div 
          className="mt-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow-md border border-border-light dark:border-border-dark divide-y divide-border-light dark:divide-border-dark overflow-hidden">
            
            {/* 6. Stagger item */}
            <motion.div 
              className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-6"
              variants={itemVariants}
            >
              <div className="flex-grow">
                <h2 className="text-2xl font-display font-bold text-primary dark:text-white mb-2">
                  Annual National Conference 2024
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-text-light dark:text-text-dark">
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-secondary mr-2 text-xl">calendar_month</span>
                    <span>October 12-14, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-secondary mr-2 text-xl">location_on</span>
                    <span>New Delhi, India</span>
                  </div>
                </div>
              </div>
              {/* 7. Button hover animation */}
              <motion.a 
                className="bg-secondary text-primary font-bold py-3 px-8 rounded-full shadow-lg transition-opacity duration-300 whitespace-nowrap" 
                href="#"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Register Now
              </motion.a>
            </motion.div>

            {/* Stagger item */}
            <motion.div 
              className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-6"
              variants={itemVariants}
            >
              <div className="flex-grow">
                <h2 className="text-2xl font-display font-bold text-primary dark:text-white mb-2">
                  GI Pathology Update Workshop
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-text-light dark:text-text-dark">
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-secondary mr-2 text-xl">calendar_month</span>
                    <span>November 20, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-secondary mr-2 text-xl">location_on</span>
                    <span>Online / Virtual</span>
                  </div>
                </div>
              </div>
              <motion.a 
                className="bg-secondary text-primary font-bold py-3 px-8 rounded-full shadow-lg transition-opacity duration-300 whitespace-nowrap" 
                href="#"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </motion.div>

            {/* Stagger item */}
            <motion.div 
              className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-6 opacity-60"
              variants={itemVariants}
            >
              <div className="flex-grow">
                <h2 className="text-2xl font-display font-bold text-gray-500 dark:text-gray-400 mb-2">
                  Future Event Title
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-gray-400 mr-2 text-xl">calendar_month</span>
                    <span>Date To Be Announced</span>
                  </div>
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-gray-400 mr-2 text-xl">location_on</span>
                    <span>Location To Be Announced</span>
                  </div>
                </div>
              </div>
              <button className="bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 font-bold py-3 px-8 rounded-full cursor-not-allowed whitespace-nowrap">
                Coming Soon
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.main>
    // </Layout>
  );
};

export default AcademicsEvents;