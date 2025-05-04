import { motion } from "framer-motion";
import { FaSortAlphaDown, FaSortAmountDown } from "react-icons/fa";
import { getGlobalStats, getTopCountries } from "../utils/statsUtils";
import { useState } from "react";

const PopulationTab = ({ data }) => {
  const [sortOrder, setSortOrder] = useState('population');
  const stats = getGlobalStats(data);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Population Statistics</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="text-sm text-blue-700 mb-1">Total Population</p>
            <p className="text-2xl font-bold">{stats?.totalPopulation?.toLocaleString()}</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <p className="text-sm text-green-700 mb-1">Average Per Country</p>
            <p className="text-2xl font-bold">
              {stats && Math.round(stats.totalPopulation / stats.totalCountries).toLocaleString()}
            </p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <p className="text-sm text-purple-700 mb-1">Median Population</p>
            <p className="text-2xl font-bold">
              {(() => {
                if (!data) return "N/A";
                const populations = data
                  .filter(c => c.population)
                  .map(c => c.population)
                  .sort((a, b) => a - b);
                const mid = Math.floor(populations.length / 2);
                const median = populations.length % 2 === 0
                  ? (populations[mid - 1] + populations[mid]) / 2
                  : populations[mid];
                return Math.round(median).toLocaleString();
              })()}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Countries by Population</h3>
          <div className="flex gap-2">
            <button 
              className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 ${
                sortOrder === 'population' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setSortOrder('population')}
            >
              <FaSortAmountDown size={12} />
              Population
            </button>
            <button 
              className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 ${
                sortOrder === 'alphabetical' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setSortOrder('alphabetical')}
            >
              <FaSortAlphaDown size={12} />
              A-Z
            </button>
          </div>
        </div>
        
        <div className="overflow-auto max-h-96">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="p-3 text-left text-xs font-semibold text-gray-600">Rank</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600">Country</th>
                <th className="p-3 text-right text-xs font-semibold text-gray-600">Population</th>
                <th className="p-3 text-right text-xs font-semibold text-gray-600">% of World</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {getTopCountries(data, 'population', 25).map((country, index) => (
                <motion.tr 
                  key={country.cca3}
                  className="hover:bg-gray-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="p-3 text-sm text-gray-500">{index + 1}</td>
                  <td className="p-3">
                    <div className="flex items-center">
                      <img 
                        src={country.flags.svg} 
                        alt={`${country.name.common} flag`}
                        className="h-4 w-6 mr-2 object-cover"
                      />
                      <span className="text-sm font-medium text-gray-900">{country.name.common}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-600 text-right">
                    {country.population.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-600 text-right">
                    {stats ? ((country.population / stats.totalPopulation) * 100).toFixed(1) + '%' : 'N/A'}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default PopulationTab;