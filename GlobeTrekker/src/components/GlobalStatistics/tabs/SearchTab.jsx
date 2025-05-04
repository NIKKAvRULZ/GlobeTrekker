import { motion } from "framer-motion";
import { FaSearch, FaSortAlphaDown, FaSortAmountDown, FaGlobeAmericas } from "react-icons/fa";
import { useState } from "react";

const SearchTab = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('alphabetical');

  const getFilteredCountries = () => {
    if (!data || !searchQuery) return [];
    
    const filtered = data.filter(country => 
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (country.name.official && country.name.official.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (country.capital && country.capital.some(cap => cap.toLowerCase().includes(searchQuery.toLowerCase())))
    );
    
    if (sortOrder === 'alphabetical') {
      return filtered.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (sortOrder === 'population') {
      return filtered.sort((a, b) => (b.population || 0) - (a.population || 0));
    } else if (sortOrder === 'area') {
      return filtered.sort((a, b) => (b.area || 0) - (a.area || 0));
    }
    
    return filtered;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-lg shadow-sm p-4 flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for a country, capital..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              sortOrder === 'alphabetical' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSortOrder('alphabetical')}
          >
            <FaSortAlphaDown />
            Name
          </button>
          <button 
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              sortOrder === 'population' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSortOrder('population')}
          >
            <FaSortAmountDown />
            Population
          </button>
          <button 
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              sortOrder === 'area' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSortOrder('area')}
          >
            <FaGlobeAmericas />
            Area
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {searchQuery ? (
          <div className="divide-y divide-gray-100">
            {getFilteredCountries().slice(0, 20).map((country) => (
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
                    className="h-8 w-12 object-cover shadow-sm"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{country.name.common}</h4>
                    <p className="text-sm text-gray-500">
                      {country.capital?.[0] || "No capital"}, {country.region}
                    </p>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="font-medium">{country.population?.toLocaleString()}</div>
                  <div className="text-gray-500">{country.area?.toLocaleString()} km²</div>
                </div>
              </motion.div>
            ))}
            
            {getFilteredCountries().length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No countries found matching "{searchQuery}"
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            Enter a search term to find countries
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SearchTab;