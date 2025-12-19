import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MissionSection = () => {
  return (
    <motion.section
      className="py-16 bg-white dark:bg-background-dark"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">
            Our Mission
          </h2>
          <div className="w-24 h-1 bg-gold-DEFAULT mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-justify">
            Our mission is to advance the standards of education, training, and research in Gastrointestinal and Hepatobiliary pathology across India. We are dedicated to establishing institutions and organizing comprehensive programs such as continuous medical education, workshops, and conferences led by experts in the field. By fostering collaboration among healthcare professionals, encouraging multi-institutional research, and recognizing academic excellence, we strive to provide outstanding care and support for both practitioners and patients.
          </p>
          <motion.div
            // Consistent hover effect
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/about-us"
              className="inline-block bg-primary text-white font-bold py-3 px-8 rounded hover:bg-blue-900 dark:hover:bg-blue-800 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default MissionSection