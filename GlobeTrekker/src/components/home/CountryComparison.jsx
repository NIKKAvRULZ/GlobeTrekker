import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CountryComparison = ({ data }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMetric, setActiveMetric] = useState(null);

  const filteredCountries = useMemo(() => {
    if (!searchTerm) return [];
    return data?.filter(country => 
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5) || [];
  }, [data, searchTerm]);

  const handleCountrySelect = (country) => {
    if (selectedCountries.length < 3 && 
        !selectedCountries.find(c => c.cca3 === country.cca3)) {
      setSelectedCountries([...selectedCountries, country]);
    }
    setSearchTerm("");
  };

  const removeCountry = (countryCode) => {
    setSelectedCountries(selectedCountries.filter(c => c.cca3 !== countryCode));
  };

  const ComparisonMetric = ({ label, getValue }) => (
    <motion.div 
      className={`grid grid-cols-[1fr,repeat(3,2fr)] gap-4 py-4 border-b border-gray-200 rounded-md ${activeMetric === label ? 'bg-blue-50' : ''}`}
      whileHover={{ 
        backgroundColor: "#EFF6FF", 
        scale: 1.01,
        transition: { duration: 0.2 }
      }}
      onClick={() => setActiveMetric(label)}
    >
      <div className="font-medium text-gray-600 flex items-center">
        <motion.span 
          className="inline-block"
          whileHover={{ scale: 1.05 }}
        >
          {label}
        </motion.span>
      </div>
      {selectedCountries.map(country => (
        <motion.div 
          key={country.cca3} 
          className="text-gray-800 p-2 rounded-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ 
            backgroundColor: "#F0F9FF", 
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)" 
          }}
        >
          {getValue(country)}
        </motion.div>
      ))}
      {Array(3 - selectedCountries.length).fill(null).map((_, i) => (
        <motion.div 
          key={i} 
          className="text-gray-400 p-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
        >
          -
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-gray-800 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          Compare Countries
        </motion.h2>

        {/* Country Selection */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search countries to compare (max 3)"
              className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-300"
            />
            
            {/* Search Results Dropdown */}
            <AnimatePresence>
              {searchTerm && (
                <motion.div 
                  className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-xl mt-2 z-10 overflow-hidden"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredCountries.map(country => (
                    <motion.button
                      key={country.cca3}
                      className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center gap-3 border-b border-gray-100 last:border-none"
                      onClick={() => handleCountrySelect(country)}
                      whileHover={{ 
                        backgroundColor: "#EFF6FF", 
                        x: 5,
                        transition: { duration: 0.2 } 
                      }}
                    >
                      <motion.img 
                        src={country.flags.svg} 
                        alt={`${country.name.common} flag`}
                        className="w-8 h-6 object-cover rounded shadow-sm"
                        whileHover={{ scale: 1.2 }}
                      />
                      {country.name.common}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Selected Countries */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          {/* Headers */}
          <motion.div 
            className="grid grid-cols-[1fr,repeat(3,2fr)] gap-4 pb-5 border-b border-gray-200"
          >
            <div className="font-semibold text-gray-600">Metrics</div>
            <AnimatePresence>
              {selectedCountries.map((country, index) => (
                <motion.div 
                  key={country.cca3} 
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: index * 0.15 }
                  }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <motion.div 
                    className="flex items-center gap-2 p-2 rounded-md"
                    whileHover={{ scale: 1.03, backgroundColor: "#F0F9FF" }}
                  >
                    <motion.img 
                      src={country.flags.svg} 
                      alt={`${country.name.common} flag`}
                      className="w-8 h-5 object-cover shadow-sm rounded"
                      whileHover={{ 
                        scale: 1.2,
                        rotate: [0, -5, 5, -5, 0],
                        transition: { duration: 0.5 }
                      }}
                    />
                    <span className="font-semibold">{country.name.common}</span>
                  </motion.div>
                  <motion.button
                    onClick={() => removeCountry(country.cca3)}
                    className="absolute -top-2 -right-2 bg-red-100 text-red-500 rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-200 transition-colors"
                    whileHover={{ 
                      scale: 1.2,
                      backgroundColor: "#FEE2E2"
                    }}
                  >
                    ×
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
            {Array(3 - selectedCountries.length).fill(null).map((_, i) => (
              <motion.div 
                key={i} 
                className="text-gray-400 bg-gray-50 rounded-md p-2 flex items-center justify-center"
                whileHover={{ backgroundColor: "#EFF6FF" }}
              >
                <motion.span 
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 1 }}
                >
                  Add country
                </motion.span>
              </motion.div>
            ))}
          </motion.div>

          {/* Comparison Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <ComparisonMetric 
              label="Population" 
              getValue={(c) => c.population.toLocaleString()} 
            />
            <ComparisonMetric 
              label="Region" 
              getValue={(c) => c.region} 
            />
            <ComparisonMetric 
              label="Capital" 
              getValue={(c) => c.capital?.[0] || 'N/A'} 
            />
            <ComparisonMetric 
              label="Languages" 
              getValue={(c) => Object.values(c.languages || {}).join(', ')} 
            />
            <ComparisonMetric 
              label="Area" 
              getValue={(c) => `${c.area.toLocaleString()} km²`} 
            />
            <ComparisonMetric 
              label="Currencies" 
              getValue={(c) => Object.values(c.currencies || {}).map(curr => curr.name).join(', ')} 
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CountryComparison;