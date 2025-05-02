import { motion } from "framer-motion";
import { getGlobalStats, getTopCountries } from "../utils/statsUtils";

const OverviewTab = ({ data }) => {
  const stats = getGlobalStats(data);
  const funFacts = [
    "The United Nations recognizes 193 member states, plus 2 observer states (Vatican City and Palestine).",
    "The world's population reached 8 billion people in November 2022!",
    "There are over 7,000 living languages in the world today.",
    "Asia is the largest region by both land area and population, containing 60% of the world's population."
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* World at a glance */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-xl font-bold text-blue-800 mb-4">World at a Glance</h3>
          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <span className="text-gray-700">Countries:</span>
              <span className="font-semibold">{stats?.totalCountries}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-700">Total Population:</span>
              <span className="font-semibold">{stats?.totalPopulation?.toLocaleString()}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-700">Languages Spoken:</span>
              <span className="font-semibold">{stats?.totalLanguages}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-700">Geographic Regions:</span>
              <span className="font-semibold">{stats?.totalRegions}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-700">Continents:</span>
              <span className="font-semibold">7</span>
            </li>
          </ul>
        </div>
        
        {/* Top 5 countries by population */}
        <div className="bg-green-50 rounded-xl p-6 border border-green-100">
          <h3 className="text-xl font-bold text-green-800 mb-4">Most Populous Countries</h3>
          <ul className="space-y-3">
            {getTopCountries(data, 'population', 5).map((country, index) => (
              <li key={country.cca3} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-6 text-gray-500">{index + 1}</span>
                  <img 
                    src={country.flags.svg} 
                    alt={`${country.name.common} flag`}
                    className="h-4 w-6 mr-2 object-cover"
                  />
                  <span>{country.name.common}</span>
                </div>
                <span className="font-semibold">{country.population?.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* More stats sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Top 5 countries by area */}
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
          <h3 className="text-xl font-bold text-purple-800 mb-4">Largest Countries by Area</h3>
          <ul className="space-y-3">
            {getTopCountries(data, 'area', 5).map((country, index) => (
              <li key={country.cca3} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-6 text-gray-500">{index + 1}</span>
                  <img 
                    src={country.flags.svg} 
                    alt={`${country.name.common} flag`}
                    className="h-4 w-6 mr-2 object-cover"
                  />
                  <span>{country.name.common}</span>
                </div>
                <span className="font-semibold">{country.area?.toLocaleString()} km²</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Population density */}
        <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
          <h3 className="text-xl font-bold text-amber-800 mb-4">Most Densely Populated</h3>
          <ul className="space-y-3">
            {data
              ?.filter(c => c.area && c.population)
              .sort((a, b) => (b.population / b.area) - (a.population / a.area))
              .slice(0, 5)
              .map((country, index) => (
                <li key={country.cca3} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-6 text-gray-500">{index + 1}</span>
                    <img 
                      src={country.flags.svg} 
                      alt={`${country.name.common} flag`}
                      className="h-4 w-6 mr-2 object-cover"
                    />
                    <span>{country.name.common}</span>
                  </div>
                  <span className="font-semibold">
                    {Math.round(country.population / country.area).toLocaleString()} people/km²
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
      
      {/* Interesting facts */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Interesting Facts</h3>
        <ul className="space-y-3">
          {funFacts.map((fact, index) => (
            <motion.li 
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-blue-300 mr-2">•</span>
              <span>{fact}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default OverviewTab; 