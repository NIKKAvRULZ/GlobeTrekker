import { motion } from "framer-motion";
import { useMemo } from "react";
import { calculateRegionalStats } from "./utils/regionUtils";

const RegionCards = ({ 
  data, 
  selectedRegion, 
  hoveredRegion, 
  setHoveredRegion, 
  setShowRegionDetails,
  getRegionColorClass,
  getRegionIcon
}) => {
  const regionalStats = useMemo(() => calculateRegionalStats(data), [data]);

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.1 }
        }
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {Object.entries(regionalStats).map(([region, stats], index) => {
        const colorClass = stats.colorClass;
        const isSelected = selectedRegion === region;
        const isHovered = hoveredRegion === region;
        
        return (
          <motion.div
            key={region}
            className={`bg-white backdrop-blur-md rounded-xl overflow-hidden shadow-lg border ${
              isSelected ? `border-${colorClass}-500 ring-2 ring-${colorClass}-300` : 'border-gray-200'
            } transition-all duration-300`}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -8, boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.1)" }}
            onMouseEnter={() => setHoveredRegion(region)}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <div className={`h-2 bg-${colorClass}-500`}></div>
            <div className="p-6">
              <h3 className={`text-xl font-bold text-${colorClass}-700 mb-4 flex items-center gap-2`}>
                {(() => {
                  const IconComponent = getRegionIcon(region);
                  return <IconComponent />;
                })()}
                {region}
              </h3>
              
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

              <div className="mt-4 mb-6">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Population Share</span>
                  <span>
                    {((stats.totalPopulation / Object.values(regionalStats).reduce(
                      (acc, r) => acc + r.totalPopulation, 0
                    )) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="bg-gray-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full bg-${colorClass}-500`}
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${(stats.totalPopulation / Object.values(regionalStats).reduce(
                        (acc, r) => acc + r.totalPopulation, 0
                      )) * 100}%` 
                    }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Top Countries by Population:</h4>
                <ul className="space-y-2">
                  {stats.countries
                    .sort((a, b) => b.population - a.population)
                    .slice(0, 3)
                    .map((country, idx) => (
                      <motion.li 
                        key={country.cca3} 
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + idx * 0.05 }}
                      >
                        <img 
                          src={country.flags.svg} 
                          alt={`${country.name.common} flag`} 
                          className="w-6 h-4 object-cover rounded shadow-sm"
                        />
                        <span className="text-sm">{country.name.common}</span>
                        <span className="text-xs text-gray-500 ml-auto">
                          {(country.population / 1000000).toFixed(1)}M
                        </span>
                      </motion.li>
                    ))}
                </ul>
              </div>
              
              <motion.button 
                className={`mt-6 w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  isHovered || isSelected
                    ? `bg-${colorClass}-500 text-white`
                    : `bg-${colorClass}-50 text-${colorClass}-700 hover:bg-${colorClass}-100`
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowRegionDetails(region)}
              >
                View All {region} Countries
              </motion.button>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default RegionCards;