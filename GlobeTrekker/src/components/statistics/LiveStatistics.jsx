import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const LiveStatistics = ({ country }) => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      if (!country) return;
      
      try {
        setLoading(true);
        // Example API call - replace with actual statistics API
        const response = await axios.get(
          `https://api.worldbank.org/v2/country/${country.cca2}/indicator/SP.POP.TOTL?format=json`
        );
        setStatistics(response.data[1]?.[0]?.value);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [country]);

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        {country ? `Statistics: ${country.name.common}` : 'Select a country'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Population Stats */}
        <motion.div
          className="bg-white/5 p-6 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-white mb-2">Population</h3>
          <p className="text-3xl font-bold text-white">
            {country?.population?.toLocaleString()}
          </p>
        </motion.div>

        {/* Area Stats */}
        <motion.div
          className="bg-white/5 p-6 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-white mb-2">Area</h3>
          <p className="text-3xl font-bold text-white">
            {country?.area?.toLocaleString()} km²
          </p>
        </motion.div>

        {/* Population Density */}
        <motion.div
          className="bg-white/5 p-6 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-white mb-2">
            Population Density
          </h3>
          <p className="text-3xl font-bold text-white">
            {country ? Math.round(country.population / country.area) : 0}/km²
          </p>
        </motion.div>

        {/* Languages Count */}
        <motion.div
          className="bg-white/5 p-6 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-white mb-2">Languages</h3>
          <p className="text-3xl font-bold text-white">
            {Object.keys(country?.languages || {}).length}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LiveStatistics;