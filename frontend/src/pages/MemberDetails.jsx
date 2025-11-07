import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

// --- DUMMY DATA ---
const allMembers = [
  { id: 1, name: 'Prof. Puja Sakhuja', membershipNumber: 'L-001', phone: '98111XXXXX', category: 'Life' },
  { id: 2, name: 'Prof. Anjali Amarapurkar', membershipNumber: 'L-002', phone: '98222XXXXX', category: 'Life' },
  { id: 3, name: 'Prof. Prasenjit Das', membershipNumber: 'L-003', phone: '98333XXXXX', category: 'Life' },
  { id: 4, name: 'Prof. Arvind Ahuja', membershipNumber: 'F-001', phone: '98444XXXXX', category: 'Founder' },
  { id: 5, name: 'Dr. Lipika Lipi', membershipNumber: 'F-002', phone: '98555XXXXX', category: 'Founder' },
  { id: 6, name: 'Prof. Kim Vaiphei', membershipNumber: 'A-001', phone: '98666XXXXX', category: 'Ad Hoc' },
  { id: 7, name: 'Prof. Vatsala Misra', membershipNumber: 'A-002', phone: '98777XXXXX', category: 'Ad Hoc' },
  { id: 8, name: 'Prof. Mukta Ramadwar', membershipNumber: 'S-001', phone: '98888XXXXX', category: 'Associate' },
  { id: 9, name: 'Prof. Archana Rastogi', membershipNumber: 'L-004', phone: '98999XXXXX', category: 'Life' },
  { id: 10, name: 'Dr. Roopa Paulose', membershipNumber: 'L-005', phone: '97111XXXXX', category: 'Life' },
  { id: 11, name: 'Dr. Chagan Bihari', membershipNumber: 'F-003', phone: '97222XXXXX', category: 'Founder' },
  { id: 12, name: 'Dr. Rajni Yadav', membershipNumber: 'S-002', phone: '97333XXXXX', category: 'Associate' },
];
// --- END DUMMY DATA ---

const categories = ['All', 'Life', 'Founder', 'Ad Hoc', 'Associate'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const MembersDetails = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredMembers = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();

    return allMembers.filter(member => {
      const searchMatch = lowerSearch === '' ||
        member.name.toLowerCase().includes(lowerSearch) ||
        member.phone.toLowerCase().includes(lowerSearch) ||
        member.membershipNumber.toLowerCase().includes(lowerSearch);
      
      const categoryMatch = selectedCategory === 'All' || member.category === selectedCategory;
      
      return searchMatch && categoryMatch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="bg-primary/10 dark:bg-primary/20 py-8">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            className="text-3xl md:text-4xl font-display font-bold text-primary dark:text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Member Directory
          </motion.h1>
          <motion.p
            className="text-md text-text-light dark:text-text-dark max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Search and filter our complete list of esteemed members.
          </motion.p>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            
            {/* 1. === ENHANCED CONTROL PANEL === */}
            <motion.div 
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Search Bar */}
              <div className="relative flex-grow">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search by name, phone, or member ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 w-full border border-border-light dark:border-border-dark rounded-lg bg-white dark:bg-background-dark text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              
              {/* Category Filters */}
              <div className="flex items-center justify-center flex-wrap gap-2 flex-shrink-0">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                      selectedCategory === category
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
            {/* === END ENHANCED CONTROL PANEL === */}


            {/* Results Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={searchTerm + selectedCategory}
            >
              {filteredMembers.length > 0 ? (
                filteredMembers.map(member => (
                  <motion.div
                    key={member.id}
                    className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow border border-border-light dark:border-border-dark flex flex-col"
                    variants={itemVariants}
                  >
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-primary dark:text-gold-light text-3xl mt-1">
                        person
                      </span>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold font-display text-primary dark:text-white">
                          {member.name}
                        </h3>
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">
                          Phone: <span className="font-medium text-text-light dark:text-text-dark">{member.phone}</span>
                        </p>
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                          Member ID: <span className="font-medium text-text-light dark:text-text-dark">{member.membershipNumber}</span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 text-right">
                      <span className="inline-block bg-gold-DEFAULT/20 text-gold-darker dark:bg-gold-light/20 dark:text-gold-light text-xs font-semibold px-2 py-1 rounded-full">
                        {member.category} Member
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="md:col-span-2 lg:col-span-3 text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span className="material-symbols-outlined text-6xl text-gray-400">search_off</span>
                  <h3 className="text-2xl font-bold text-text-light dark:text-heading-dark mt-4">No Members Found</h3>
                  <p className="text-lg text-text-muted-light dark:text-text-muted-dark mt-2">
                    Try adjusting your search terms or filters.
                  </p>
                </motion.div>
              )}
            </motion.div>

          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default MembersDetails;