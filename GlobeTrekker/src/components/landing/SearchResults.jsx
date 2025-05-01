import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchResults = ({ results, isSearching }) => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  if (!results?.length && !isSearching) return null;

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const handleViewMore = () => {
    navigate('/login');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="absolute z-50 w-full max-w-2xl mt-2"
      >
        {/* Search Results List */}
        <motion.div 
          className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl border border-gray-100/50 
                     max-h-96 overflow-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent mb-5"
        >
          {isSearching ? (
            <div className="p-8 text-center">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity, repeatType: "reverse" }
                }}
                className="inline-block w-8 h-8 border-3 border-gradient-to-r from-blue-600 to-green-500 border-t-transparent rounded-full"
              />
            </div>
          ) : results?.length ? (
            results.map((country, index) => (
              <motion.div
                key={country.cca3}
                variants={itemVariants}
                onHoverStart={() => setHoverIndex(index)}
                onHoverEnd={() => setHoverIndex(null)}
                onClick={() => handleCountryClick(country)}
                className="group relative p-4 flex items-center gap-4 cursor-pointer border-b border-gray-100/50 
                           last:border-none hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 
                           transition-all duration-300"
              >
                <motion.img
                  src={country.flags.svg}
                  alt={`${country.name.common} flag`}
                  className="w-16 h-10 object-cover rounded-md shadow-md"
                  whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.3 }}
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">
                    {country.name.common}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-blue-400">
                    {country.capital?.[0]} • {country.region}
                  </p>
                </div>
                <motion.div
                  animate={hoverIndex === index ? { x: 5, scale: 1.2 } : { x: 0, scale: 1 }}
                  className="text-blue-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center text-gray-500"
            >
              No countries found
            </motion.div>
          )}
        </motion.div>

        {/* Country Details Popup */}
        <AnimatePresence>
          {selectedCountry && (
            <motion.div
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mt-4 mb-8 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-100/50 p-8
                         transform-gpu hover:shadow-blue-500/20"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-6">
                  <motion.img
                    src={selectedCountry.flags.svg}
                    alt={`${selectedCountry.name.common} flag`}
                    className="w-20 h-14 object-cover rounded-lg shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <div>
                    <motion.h2 
                      className="text-3xl font-bold text-gray-800 bg-clip-text text-transparent 
                                bg-gradient-to-r from-blue-600 to-cyan-500"
                    >
                      {selectedCountry.name.common}
                    </motion.h2>
                    <p className="text-lg text-gray-500">{selectedCountry.region}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedCountry(null)}
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              <motion.div 
                className="grid grid-cols-2 gap-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {[
                  { label: "Capital", value: selectedCountry.capital?.[0] || 'N/A' },
                  { label: "Population", value: selectedCountry.population.toLocaleString() },
                  { label: "Languages", value: selectedCountry.languages ? 
                    Object.values(selectedCountry.languages).join(', ') : 'N/A' },
                  { label: "Currencies", value: selectedCountry.currencies ?
                    Object.values(selectedCountry.currencies).map(curr => curr.name).join(', ') : 'N/A' }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="p-4 rounded-lg bg-gray-50/50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 
                             transition-colors duration-300 group"
                  >
                    <p className="text-sm text-gray-500 group-hover:text-blue-600">{item.label}</p>
                    <p className="font-medium text-gray-800 group-hover:text-green-600">{item.value}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                onClick={handleViewMore}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-xl 
                          font-medium text-lg shadow-lg hover:shadow-green-500/25 transition-all duration-300 
                          flex justify-center items-center space-x-2"
              >
                <motion.span 
                  className="flex items-center justify-center gap-3"
                  whileHover={{ x: 5 }}
                >
                  <span>Begin Your Journey</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchResults;