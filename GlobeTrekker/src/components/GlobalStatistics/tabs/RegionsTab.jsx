import { motion, AnimatePresence } from "framer-motion";
import { FaGlobeEurope, FaGlobeAsia, FaGlobeAfrica, FaGlobeAmericas, FaTimesCircle, FaSearch } from "react-icons/fa";
import { getRegionalStats } from "../utils/statsUtils";
import { useState } from "react";

const RegionsTab = ({ data }) => {
  const regions = getRegionalStats(data);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const getCountriesByRegion = (regionName) => {
    if (!data) return [];
    return data.filter(country => country.region === regionName);
  };

  const filteredCountries = selectedRegion 
    ? getCountriesByRegion(selectedRegion).filter(country => 
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regions.map((region, index) => (
          <motion.div 
            key={region.name}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, boxShadow: "0 12px 24px -8px rgba(0, 0, 0, 0.15)" }}
          >
            <div className={`h-3 ${
              index % 5 === 0 ? 'bg-blue-500' : 
              index % 5 === 1 ? 'bg-green-500' : 
              index % 5 === 2 ? 'bg-purple-500' : 
              index % 5 === 3 ? 'bg-amber-500' : 
              'bg-rose-500'
            }`} />
            
            <div className="p-5">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                {index % 5 === 0 ? <FaGlobeEurope className="text-blue-500" /> :
                 index % 5 === 1 ? <FaGlobeAsia className="text-green-500" /> :
                 index % 5 === 2 ? <FaGlobeAfrica className="text-purple-500" /> :
                 <FaGlobeAmericas className="text-amber-500" />}
                {region.name}
              </h3>
              
              <ul className="space-y-3 text-gray-700">
                <li className="flex justify-between items-center">
                  <span>Countries:</span>
                  <span className="font-semibold">{region.countries}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Population:</span>
                  <span className="font-semibold">{region.population.toLocaleString()}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Languages:</span>
                  <span className="font-semibold">{region.languages}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Total Area:</span>
                  <span className="font-semibold">{region.area.toLocaleString()} km²</span>
                </li>
              </ul>
              
              <button 
                className="mt-4 w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-sm font-medium transition-colors"
                onClick={() => setSelectedRegion(region.name)}
              >
                View All {region.name} Countries
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Region Countries Popup */}
      <AnimatePresence>
        {selectedRegion && (
          <motion.div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRegion(null)}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Popup header */}
              <div className={`p-5 flex justify-between items-center bg-gradient-to-r 
                ${selectedRegion === 'Europe' ? 'from-blue-500 to-blue-700' : 
                  selectedRegion === 'Asia' ? 'from-green-500 to-green-700' : 
                  selectedRegion === 'Africa' ? 'from-purple-500 to-purple-700' : 
                  selectedRegion === 'Oceania' ? 'from-amber-500 to-amber-700' : 
                  'from-rose-500 to-rose-700'}`}
              >
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  {selectedRegion === 'Europe' ? <FaGlobeEurope /> :
                   selectedRegion === 'Asia' ? <FaGlobeAsia /> :
                   selectedRegion === 'Africa' ? <FaGlobeAfrica /> :
                   <FaGlobeAmericas />}
                  Countries in {selectedRegion}
                </h3>
                <button 
                  className="text-white/90 hover:text-white transition-colors"
                  onClick={() => setSelectedRegion(null)}
                >
                  <FaTimesCircle className="text-2xl" />
                </button>
              </div>
              
              {/* Search input */}
              <div className="p-4 border-b">
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
              <div className="overflow-y-auto max-h-[50vh]">
                {filteredCountries.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {filteredCountries.map((country) => (
                      <motion.div 
                        key={country.cca3}
                        className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={country.flags.svg} 
                            alt={`${country.name.common} flag`}
                            className="h-8 w-12 object-cover shadow-sm rounded"
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
              
              {/* Footer with stats */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total {filteredCountries.length} countries</span>
                  <span>Total population: {
                    filteredCountries
                      .reduce((sum, country) => sum + (country.population || 0), 0)
                      .toLocaleString()
                  }</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RegionsTab;