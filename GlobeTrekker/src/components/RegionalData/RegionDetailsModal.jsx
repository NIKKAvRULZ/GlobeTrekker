import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaTimesCircle, FaSearch, FaChartBar } from "react-icons/fa";

const RegionDetailsModal = ({ 
  data, 
  showRegionDetails, 
  setShowRegionDetails, 
  searchQuery, 
  setSearchQuery,
  setSelectedRegion,
  getRegionColorClass,
  getRegionIcon
}) => {
  const [filteredCountries, setFilteredCountries] = useState([]);
  
  // Filter countries for the selected region
  useEffect(() => {
    if (!data || !showRegionDetails) return;
    
    const regionCountries = data.filter(country => country.region === showRegionDetails);
    
    if (!searchQuery) {
      setFilteredCountries(regionCountries);
      return;
    }
    
    const filtered = regionCountries.filter(country => 
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (country.capital && country.capital[0] && 
       country.capital[0].toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    setFilteredCountries(filtered);
  }, [data, showRegionDetails, searchQuery]);

  if (!showRegionDetails) return null;

  const colorClass = getRegionColorClass(showRegionDetails);
  const IconComponent = getRegionIcon(showRegionDetails);
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowRegionDetails(null)}
    >
      <motion.div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-5 flex justify-between items-center bg-gradient-to-r from-${colorClass}-500 to-${colorClass}-700`}>
          <div className="flex items-center gap-3">
            <span className="p-2 bg-white/10 rounded-full text-white text-xl">
              <IconComponent />
            </span>
            <div>
              <h3 className="text-2xl font-bold text-white">
                Countries in {showRegionDetails}
              </h3>
              <p className="text-sm text-white/80">
                {filteredCountries.length} countries • 
                {' '}{(filteredCountries.reduce((sum, country) => sum + (country.population || 0), 0) / 1000000000).toFixed(2)} billion people
              </p>
            </div>
          </div>
          <button 
            className="text-white/90 hover:text-white transition-colors p-2"
            onClick={() => setShowRegionDetails(null)}
          >
            <FaTimesCircle className="text-2xl" />
          </button>
        </div>
        
        {/* Region overview stats */}
        <div className="p-5 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Countries</p>
              <p className="text-xl font-bold">{filteredCountries.length}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Population</p>
              <p className="text-xl font-bold">
                {(filteredCountries.reduce((sum, country) => sum + (country.population || 0), 0) / 1000000000).toFixed(2)}B
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Languages</p>
              <p className="text-xl font-bold">
                {new Set(filteredCountries.flatMap(country => 
                  country.languages ? Object.values(country.languages) : []
                )).size}
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Total Area</p>
              <p className="text-xl font-bold">
                {(filteredCountries.reduce((sum, country) => sum + (country.area || 0), 0) / 1000000).toFixed(2)}M km²
              </p>
            </div>
          </div>
        </div>
        
        {/* Search input */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search countries..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Countries list */}
        <div className="overflow-y-auto max-h-[40vh]">
          {filteredCountries.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredCountries
                .sort((a, b) => b.population - a.population)
                .map((country, idx) => (
                <motion.div 
                  key={country.cca3}
                  className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03, duration: 0.2 }}
                  whileHover={{ backgroundColor: `rgba(${colorClass === 'blue' ? '59, 130, 246' : 
                                                    colorClass === 'green' ? '16, 185, 129' :
                                                    colorClass === 'purple' ? '139, 92, 246' :
                                                    colorClass === 'amber' ? '245, 158, 11' :
                                                    '244, 63, 94'}, 0.05)` }}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={country.flags?.svg || country.flags?.png} 
                      alt={`${country.name.common} flag`}
                      className="h-8 w-12 object-cover shadow-sm rounded"
                      onError={(e) => {
                        e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/No_flag.svg/800px-No_flag.svg.png';
                      }}
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{country.name.common}</h4>
                      <p className="text-sm text-gray-500">
                        {country.capital?.[0] || "No capital"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-medium">{country.population?.toLocaleString()}</div>
                    <div className="text-gray-500">{country.area?.toLocaleString()} km²</div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No countries found matching "{searchQuery}"
            </div>
          )}
        </div>
        
        {/* Footer with stats and action buttons */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-wrap justify-between items-center">
          <div className="text-sm text-gray-600">
            <span className="font-medium">
              {filteredCountries.length} countries
            </span> • 
            <span className="ml-2">
              Population: {filteredCountries
                .reduce((sum, country) => sum + (country.population || 0), 0)
                .toLocaleString()}
            </span>
          </div>
          
          <div className="flex gap-3 mt-2 sm:mt-0">
            <button 
              className={`py-2 px-4 bg-${colorClass}-100 text-${colorClass}-700 rounded hover:bg-${colorClass}-200 transition-colors text-sm font-medium flex items-center gap-1`}
              onClick={() => {
                setShowRegionDetails(null);
                setSelectedRegion(showRegionDetails);
              }}
            >
              <FaChartBar size={14} />
              View Statistics
            </button>
            <button 
              className="py-2 px-4 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm font-medium"
              onClick={() => setShowRegionDetails(null)}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RegionDetailsModal;