import { motion } from 'framer-motion';
import { FaGlobe, FaUsers, FaLanguage, FaMoneyBillWave } from 'react-icons/fa';
import CountUp from 'react-countup';

const CountryStats = ({ country, animateStats, setShowDetails }) => {
  const statsBarVariants = {
    hidden: { width: 0 },
    visible: { width: '100%', transition: { duration: 0.8 } }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <motion.div 
          className="col-span-2 mb-2"
        >
          <div className="flex justify-between mb-1 items-center">
            <p className="text-sm font-medium text-gray-500">Population Ranking</p>
            <p className="text-xs text-gray-500">
              Top {Math.floor(Math.random() * 20) + 1}%
            </p>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
              variants={statsBarVariants}
              initial="hidden"
              animate={animateStats ? "visible" : "hidden"}
            />
          </div>
        </motion.div>

        {[
          { 
            label: "Population", 
            value: country.population, 
            display: <CountUp end={country.population} duration={2} separator="," />,
            icon: <FaUsers className="text-indigo-500" />
          },
          { 
            label: "Region", 
            value: country.region,
            icon: <FaGlobe className="text-purple-500" />
          },
          { 
            label: "Languages", 
            value: country.languages ? Object.values(country.languages).length : 0,
            display: country.languages ? 
              `${Object.values(country.languages).length} language${Object.values(country.languages).length !== 1 ? 's' : ''}` : 'N/A',
            icon: <FaLanguage className="text-indigo-500" />
          },
          { 
            label: "Currency", 
            value: country.currencies ? Object.keys(country.currencies)[0] : 'N/A',
            display: country.currencies ?
              Object.values(country.currencies)[0]?.symbol : 'N/A',
            icon: <FaMoneyBillWave className="text-purple-500" />
          }
        ].map(({ label, value, display, icon }) => (
          <motion.div 
            key={label} 
            className="bg-gray-50 p-3 rounded-lg border border-gray-100 hover:border-indigo-200 transition-colors"
            whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="flex items-center gap-2">
              <div className="text-lg">{icon}</div>
              <p className="text-sm font-medium text-gray-500">{label}</p>
            </div>
            <p className="mt-1 text-gray-800 font-semibold text-lg">
              {display || value}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={() => setShowDetails(true)}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)"
        }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600
               text-white rounded-lg font-medium shadow-lg 
               transition-all duration-300 group relative overflow-hidden"
      >
        <span className="relative z-10">View Detailed Information</span>
        <motion.span 
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600"
          initial={{ x: '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ type: "tween" }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="w-10 h-10 bg-white/10 rounded-full"
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default CountryStats;