import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const CountryComparison = ({ data }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="grid grid-cols-[1fr,repeat(3,2fr)] gap-4 py-3 border-b border-gray-200">
      <div className="font-medium text-gray-600">{label}</div>
      {selectedCountries.map(country => (
        <div key={country.cca3} className="text-gray-800">
          {getValue(country)}
        </div>
      ))}
      {Array(3 - selectedCountries.length).fill(null).map((_, i) => (
        <div key={i} className="text-gray-400">-</div>
      ))}
    </div>
  );

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-gray-800 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Compare Countries
        </motion.h2>

        {/* Country Selection */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search countries to compare (max 3)"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            {/* Search Results Dropdown */}
            {searchTerm && (
              <motion.div 
                className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-lg mt-2 z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {filteredCountries.map(country => (
                  <motion.button
                    key={country.cca3}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3"
                    onClick={() => handleCountrySelect(country)}
                    whileHover={{ backgroundColor: "#F3F4F6" }}
                  >
                    <img 
                      src={country.flags.svg} 
                      alt={`${country.name.common} flag`}
                      className="w-6 h-4 object-cover"
                    />
                    {country.name.common}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Selected Countries */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Headers */}
          <div className="grid grid-cols-[1fr,repeat(3,2fr)] gap-4 pb-4 border-b border-gray-200">
            <div className="font-semibold text-gray-600">Metrics</div>
            {selectedCountries.map(country => (
              <div key={country.cca3} className="relative">
                <div className="flex items-center gap-2">
                  <img 
                    src={country.flags.svg} 
                    alt={`${country.name.common} flag`}
                    className="w-6 h-4 object-cover"
                  />
                  <span className="font-semibold">{country.name.common}</span>
                </div>
                <button
                  onClick={() => removeCountry(country.cca3)}
                  className="absolute -top-2 -right-2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            ))}
            {Array(3 - selectedCountries.length).fill(null).map((_, i) => (
              <div key={i} className="text-gray-400">Add country</div>
            ))}
          </div>

          {/* Comparison Metrics */}
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
        </div>
      </div>
    </section>
  );
};

export default CountryComparison;