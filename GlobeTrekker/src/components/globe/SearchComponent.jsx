import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const SearchComponent = ({ 
  searchTerm, 
  onSearchChange, 
  searchResults, 
  onCountrySelect 
}) => {
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  
  // Focus on input when mounted
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target) && 
          inputRef.current && !inputRef.current.contains(event.target)) {
        onSearchChange("");
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onSearchChange]);
  
  const handleSelect = (country) => {
    // Select country and clear search
    onCountrySelect(country);
    onSearchChange("");
    // Return focus to input for better UX
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };
  
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
      <div className="relative mx-4">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search countries..."
          className="w-full px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm 
                   border border-blue-500/30 shadow-lg text-white
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchResults.length > 0) {
              // Trigger the same pin drop animation as clicking on globe
              handleSelect(searchResults[0]);
            }
            if (e.key === 'Escape') {
              onSearchChange("");
            }
          }}
        />
        
        <AnimatePresence>
          {searchResults.length > 0 && (
            <motion.div
              ref={resultsRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto
                       bg-black/80 backdrop-blur-md rounded-lg shadow-xl border border-blue-500/20"
            >
              {searchResults.map(country => (
                <motion.div
                  key={country.cca3}
                  className="flex items-center gap-3 p-3 hover:bg-blue-900/40 cursor-pointer border-b border-blue-500/10"
                  onClick={() => handleSelect(country)}
                  whileHover={{ scale: 1.02, x: 3 }}
                >
                  <img
                    src={country.flags.svg}
                    alt={`${country.name.common} flag`}
                    className="w-8 h-6 object-cover rounded shadow-sm"
                  />
                  <div className="text-white">
                    <p className="font-medium">{country.name.common}</p>
                    <p className="text-sm text-blue-200/70">{country.capital?.[0]}</p>
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