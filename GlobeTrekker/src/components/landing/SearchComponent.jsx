import { motion, AnimatePresence } from "framer-motion";

const SearchComponent = ({ searchTerm, setSearchTerm, searchResults, isSearching }) => {
  return (
    <motion.div 
      className="relative max-w-md mx-auto mb-10"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Search for a country..."
          className="w-full py-3 pl-12 pr-4 rounded-full border-2 border-blue-100 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 shadow-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <AnimatePresence>
          {isSearching && (
            <motion.div 
              className="absolute right-3 top-1/2 -translate-y-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Search Results Dropdown */}
      <AnimatePresence>
        {searchResults.length > 0 && (
          <motion.div 
            className="absolute z-20 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="divide-y divide-gray-100">
              {searchResults.map(country => (
                <motion.li 
                  key={country.cca3}
                  whileHover={{ backgroundColor: '#f3f4f6' }}
                  className="flex items-center p-3 cursor-pointer"
                >
                  <img 
                    src={country.flags.svg} 
                    alt={`${country.name.common} flag`} 
                    className="w-8 h-6 object-cover mr-3"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{country.name.common}</p>
                    <p className="text-xs text-gray-500">{country.region}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchComponent;