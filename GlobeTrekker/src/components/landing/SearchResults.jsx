import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchResults = ({ results, isSearching }) => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);

  if (!results?.length && !isSearching) return null;

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const handleViewMore = () => {
    navigate('/login');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute z-50 w-full max-w-2xl mt-2"
      >
        {/* Search Results List */}
        <div className="bg-white rounded-lg shadow-xl border border-gray-100 max-h-96 overflow-auto">
          {isSearching ? (
            <div className="p-4 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
              />
            </div>
          ) : results?.length ? (
            results.map((country) => (
              <motion.div
                key={country.cca3}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                className="p-4 flex items-center gap-4 cursor-pointer border-b border-gray-100 last:border-none"
                onClick={() => handleCountryClick(country)}
              >
                <motion.img
                  src={country.flags.svg}
                  alt={`${country.name.common} flag`}
                  className="w-12 h-8 object-cover rounded shadow-sm"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{country.name.common}</h3>
                  <p className="text-sm text-gray-500">
                    {country.capital?.[0]} • {country.region}
                  </p>
                </div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="text-blue-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </motion.div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No countries found
            </div>
          )}
        </div>

        {/* Country Details Popup */}
        <AnimatePresence>
          {selectedCountry && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-4 bg-white rounded-lg shadow-xl border border-gray-100 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedCountry.flags.svg}
                    alt={`${selectedCountry.name.common} flag`}
                    className="w-16 h-10 object-cover rounded shadow-sm"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedCountry.name.common}
                    </h2>
                    <p className="text-gray-500">{selectedCountry.region}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Capital</p>
                  <p className="font-medium">{selectedCountry.capital?.[0] || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Population</p>
                  <p className="font-medium">
                    {selectedCountry.population.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Languages</p>
                  <p className="font-medium">
                    {selectedCountry.languages ? 
                      Object.values(selectedCountry.languages).join(', ') : 
                      'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Currencies</p>
                  <p className="font-medium">
                    {selectedCountry.currencies ?
                      Object.values(selectedCountry.currencies)
                        .map(curr => curr.name)
                        .join(', ') :
                      'N/A'}
                  </p>
                </div>
              </div>

              <motion.button
                onClick={handleViewMore}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium
                          shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  View More Details
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchResults;