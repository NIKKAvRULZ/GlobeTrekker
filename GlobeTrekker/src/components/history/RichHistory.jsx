import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const RichHistory = ({ country }) => {
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!country) return;
      
      try {
        setLoading(true);
        const response = await axios.get(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(country.name.common)}`
        );
        setHistoricalData(response.data);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [country]);

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        {country ? `History of ${country.name.common}` : 'Select a country'}
      </h2>

      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-white/5 rounded w-3/4"></div>
          <div className="h-4 bg-white/5 rounded"></div>
          <div className="h-4 bg-white/5 rounded w-5/6"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Historical Overview */}
          <div className="space-y-6">
            <motion.div
              className="bg-white/5 p-6 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Overview</h3>
              <p className="text-white/80 leading-relaxed">
                {historicalData?.extract}
              </p>
            </motion.div>

            {/* Key Facts */}
            <motion.div
              className="bg-white/5 p-6 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Key Facts</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-white/60">Independence:</span>
                  <span className="text-white">{country?.independent ? 'Independent' : 'Dependent'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/60">UN Member:</span>
                  <span className="text-white">{country?.unMember ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/60">Region:</span>
                  <span className="text-white">{country?.region}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Historical Timeline */}
          <motion.div
            className="bg-white/5 p-6 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Timeline</h3>
            <div className="space-y-6">
              <div className="relative pl-6 border-l-2 border-white/10">
                {historicalData?.description && (
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                    <p className="text-white/80">{historicalData.description}</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default RichHistory;