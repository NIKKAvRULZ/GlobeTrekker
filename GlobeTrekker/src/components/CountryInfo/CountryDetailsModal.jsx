import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react'; // Add this import
import { FaMapMarkedAlt } from 'react-icons/fa';
import OverviewTab from './tabs/OverviewTab';
import GeographyTab from './tabs/GeographyTab';
import EconomyTab from './tabs/EconomyTab';
import CultureTab from './tabs/CultureTab';

const CountryDetailsModal = ({ country, showDetails, setShowDetails }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <AnimatePresence>
      {showDetails && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowDetails(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header with gradient background */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <motion.img
                  src={country.flags.svg}
                  alt={`${country.name.common} flag`}
                  className="w-10 h-6 object-cover rounded shadow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                />
                <h2 className="text-2xl font-bold">{country.name.common}</h2>
              </div>
              <motion.button
                onClick={() => setShowDetails(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto hide-scrollbar">
                {['overview', 'geography', 'economy', 'culture'].map((tab) => (
                  <motion.button
                    key={tab}
                    className={`px-6 py-3 font-medium transition-colors ${
                      activeTab === tab 
                        ? 'text-indigo-600 border-b-2 border-indigo-600' 
                        : 'text-gray-500 hover:text-indigo-500'
                    }`}
                    onClick={() => setActiveTab(tab)}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 1 }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div className="overflow-y-auto max-h-[60vh]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 space-y-6"
                >
                  {activeTab === 'overview' && <OverviewTab country={country} />}
                  {activeTab === 'geography' && <GeographyTab country={country} />}
                  {activeTab === 'economy' && <EconomyTab country={country} />}
                  {activeTab === 'culture' && <CultureTab country={country} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer with view map button */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <motion.a
                href={`https://www.google.com/maps/place/${country.name.common}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-white shadow-md flex items-center gap-2"
              >
                <FaMapMarkedAlt />
                View on Map
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CountryDetailsModal;