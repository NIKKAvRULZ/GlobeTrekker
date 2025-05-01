import { motion } from 'framer-motion';

const CulturalInsights = ({ country }) => {
  if (!country) {
    return (
      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Select a country</h2>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        Cultural Insights: {country.name.common}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Languages */}
        <motion.div
          className="bg-white/5 p-6 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Languages</h3>
          <div className="space-y-2">
            {Object.entries(country.languages || {}).map(([code, name]) => (
              <div key={code} className="flex items-center gap-2">
                <span className="text-white/60">{code}:</span>
                <span className="text-white">{name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Currencies */}
        <motion.div
          className="bg-white/5 p-6 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Currencies</h3>
          <div className="space-y-2">
            {Object.entries(country.currencies || {}).map(([code, currency]) => (
              <div key={code} className="flex items-center gap-2">
                <span className="text-white/60">{code}:</span>
                <span className="text-white">{currency.name} ({currency.symbol})</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Additional Cultural Information */}
        <motion.div
          className="lg:col-span-2 bg-white/5 p-6 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Cultural Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-white/60">Region:</span>
                <span className="text-white">{country.region}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/60">Subregion:</span>
                <span className="text-white">{country.subregion}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/60">Capital:</span>
                <span className="text-white">{country.capital?.[0]}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-white/60">Demonym:</span>
                <span className="text-white">
                  {country.demonyms?.eng?.m || 'Not available'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/60">Time Zones:</span>
                <span className="text-white">
                  {country.timezones?.join(', ')}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CulturalInsights;