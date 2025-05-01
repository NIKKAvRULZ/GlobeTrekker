import { motion } from "framer-motion";
import { useState, useMemo } from "react";

const RegionalData = ({ data, selectedRegion, setSelectedRegion }) => {
  const [selectedMetric, setSelectedMetric] = useState('population');

  const regions = useMemo(() => {
    if (!data) return [];
    return [...new Set(data.map(country => country.region))];
  }, [data]);

  const regionalStats = useMemo(() => {
    if (!data) return {};
    
    return data.reduce((acc, country) => {
      const region = country.region;
      if (!acc[region]) {
        acc[region] = {
          countries: [],
          totalPopulation: 0,
          languages: new Set(),
          currencies: new Set()
        };
      }
      
      acc[region].countries.push(country);
      acc[region].totalPopulation += country.population || 0;
      if (country.languages) {
        Object.values(country.languages).forEach(lang => acc[region].languages.add(lang));
      }
      if (country.currencies) {
        Object.keys(country.currencies).forEach(curr => acc[region].currencies.add(curr));
      }
      
      return acc;
    }, {});
  }, [data]);

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-gray-800 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Regional Analysis
        </motion.h2>

        {/* Region Selection */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
          {regions.map((region) => (
            <motion.button
              key={region}
              className={`px-6 py-2 rounded-full whitespace-nowrap ${
                selectedRegion === region
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/80 text-gray-600 hover:bg-blue-50'
              } transition-colors duration-200`}
              onClick={() => setSelectedRegion(region)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {region}
            </motion.button>
          ))}
        </div>

        {/* Regional Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(regionalStats).map(([region, stats]) => (
            <motion.div
              key={region}
              className={`bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg ${
                selectedRegion === region ? 'ring-2 ring-blue-500' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">{region}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Countries:</span>
                  <span className="font-medium">{stats.countries.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Population:</span>
                  <span className="font-medium">{stats.totalPopulation.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Languages:</span>
                  <span className="font-medium">{stats.languages.size}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Currencies:</span>
                  <span className="font-medium">{stats.currencies.size}</span>
                </div>
              </div>

              {/* Top Countries List */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Top Countries by Population:</h4>
                <ul className="space-y-2">
                  {stats.countries
                    .sort((a, b) => b.population - a.population)
                    .slice(0, 3)
                    .map(country => (
                      <li key={country.cca3} className="flex items-center gap-2">
                        <img 
                          src={country.flags.svg} 
                          alt={`${country.name.common} flag`} 
                          className="w-6 h-4 object-cover rounded"
                        />
                        <span className="text-sm">{country.name.common}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegionalData;