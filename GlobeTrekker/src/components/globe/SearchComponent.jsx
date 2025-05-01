import { motion, AnimatePresence } from "framer-motion";

const SearchComponent = ({ 
  searchTerm, 
  onSearchChange, 
  searchResults, 
  onCountrySelect 
}) => {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-md">
      <div className="relative mx-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search countries..."
          className="w-full px-4 py-2 rounded-lg bg-white/90 backdrop-blur-sm 
                   border border-gray-200 shadow-lg focus:ring-2 focus:ring-blue-500 
                   focus:border-transparent outline-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchResults.length > 0) {
              // Trigger the same pin drop animation as clicking on globe
              onCountrySelect(searchResults[0]);
            }
            if (e.key === 'Escape') {
              onSearchChange("");
            }
          }}
        />
        
        <AnimatePresence>
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto
                       bg-white/90 backdrop-blur-sm rounded-lg shadow-xl"
            >
              {searchResults.map(country => (
                <motion.div
                  key={country.cca3}
                  className="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer"
                  onClick={() => onCountrySelect(country)}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={country.flags.svg}
                    alt={`${country.name.common} flag`}
                    className="w-8 h-6 object-cover rounded shadow-sm"
                  />
                  <div>
                    <p className="font-medium">{country.name.common}</p>
                    <p className="text-sm text-gray-500">{country.capital?.[0]}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchComponent;