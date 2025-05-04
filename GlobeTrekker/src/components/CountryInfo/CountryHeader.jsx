import { motion } from 'framer-motion';
import { FaMapMarkedAlt } from 'react-icons/fa';

const CountryHeader = ({ country, onClose }) => {
  return (
    <div className="relative p-6 pb-4 border-b border-gray-100 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="flex items-start gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <motion.img
            src={country.flags.svg}
            alt={`${country.name.common} flag`}
            className="w-20 h-12 object-cover rounded-md shadow-lg"
            loading="lazy"
            whileHover={{ 
              scale: 1.1, 
              rotate: [0, -1, 1, -1, 1, 0],
              transition: { duration: 0.5 }
            }}
          />
          <motion.div 
            className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            <img 
              src={country.coatOfArms?.svg || country.flags.svg} 
              alt="Coat of arms" 
              className="w-6 h-6 object-contain rounded-full"
            />
          </motion.div>
        </motion.div>
        <div className="flex-1 min-w-0">
          <motion.h2 
            className="text-2xl font-bold truncate"
          >
            {country.name.common}
          </motion.h2>
          <motion.p 
            className="text-indigo-100 truncate flex items-center gap-1"
          >
            <FaMapMarkedAlt className="text-indigo-200" />
            {country.capital?.[0] || "No capital"}
          </motion.p>
        </div>
      </div>

      <motion.button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/80 hover:text-white 
                 rounded-full hover:bg-white/10 transition-colors"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </motion.button>
    </div>
  );
};

export default CountryHeader;