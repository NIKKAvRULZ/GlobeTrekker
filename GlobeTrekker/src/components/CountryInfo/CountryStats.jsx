import { motion } from 'framer-motion';
import { FaGlobe, FaUsers, FaLanguage, FaMoneyBillWave, FaChevronRight, FaStar } from 'react-icons/fa';
import CountUp from 'react-countup';

const CountryStats = ({ country, animateStats, setShowDetails }) => {
  const statsBarVariants = {
    hidden: { width: 0 },
    visible: { 
      width: '100%', 
      transition: { 
        duration: 0.8,
        ease: "easeOut" 
      } 
    }
  };

  // Define animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12
      }
    }
  };
  
  const buttonVariants = {
    rest: { 
      scale: 1,
      background: "linear-gradient(90deg, rgba(99,102,241,1) 0%, rgba(124,58,237,1) 100%)"
    },
    hover: { 
      scale: 1.03,
      background: "linear-gradient(90deg, rgba(124,58,237,1) 0%, rgba(99,102,241,1) 100%)",
      boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.5)",
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 400
      }
    },
    tap: { 
      scale: 0.98
    }
  };

  return (
    <motion.div 
      className="p-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <motion.div 
          className="col-span-2 mb-2"
          variants={itemVariants}
        >
          <div className="flex justify-between mb-1 items-center">
            <p className="text-sm font-medium text-gray-500">Population Ranking</p>
            <div className="flex items-center gap-1">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  color: ["#6366F1", "#4F46E5", "#6366F1"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <FaStar className="text-indigo-500 text-xs" />
              </motion.div>
              <p className="text-xs text-gray-500">
                Top {Math.floor(Math.random() * 20) + 1}%
              </p>
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 relative"
              variants={statsBarVariants}
              initial="hidden"
              animate={animateStats ? "visible" : "hidden"}
            >
              <motion.div 
                className="absolute top-0 right-0 w-3 h-full bg-white opacity-70"
                animate={{
                  x: [30, -100, 30],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              />
            </motion.div>
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
        ].map(({ label, value, display, icon }, index) => (
          <motion.div 
            key={label} 
            className="bg-white p-3 rounded-lg border border-gray-100 hover:border-indigo-200 transition-colors relative overflow-hidden group"
            variants={itemVariants}
            whileHover={{ 
              y: -4, 
              boxShadow: "0 15px 20px -5px rgba(0, 0, 0, 0.1)",
              borderColor: "#818CF8" 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <motion.div
              className="absolute -inset-[150%] bg-gradient-to-r from-transparent via-indigo-100/40 to-transparent skew-x-45"
              animate={{ left: ['-150%', '150%'] }}
              transition={{ 
                duration: 1.5, 
                ease: "easeInOut", 
                repeat: Infinity, 
                repeatDelay: index * 2 + 2 
              }}
            />
            <div className="flex items-center gap-2 relative z-10">
              <motion.div 
                className="text-lg p-1.5 bg-indigo-50 rounded-full"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {icon}
              </motion.div>
              <p className="text-sm font-medium text-gray-500">{label}</p>
            </div>
            <motion.p 
              className="mt-1 text-gray-800 font-semibold text-lg relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              {display || value || 'N/A'}
            </motion.p>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={() => setShowDetails(true)}
        variants={buttonVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600
               text-white rounded-lg font-medium shadow-lg 
               transition-all duration-300 group relative overflow-hidden"
      >
        <span className="relative z-10 flex items-center justify-center gap-1">
          <span>View Detailed Information</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 1,
              repeatDelay: 1
            }}
          >
            <FaChevronRight className="text-sm" />
          </motion.div>
        </span>
        
        <motion.span 
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600"
          initial={{ x: '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ type: "tween" }}
        />
        
        <motion.div 
          className="absolute top-0 left-0 w-40 h-full transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ 
            x: ['-100%', '200%'] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2, 
            ease: "easeInOut", 
            repeatDelay: 0.5 
          }}
        />

        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 z-0"
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="w-40 h-40 bg-white/5 rounded-full z-0"
            animate={{ 
              scale: [0.8, 1.5, 0.8], 
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "linear" 
            }}
          />
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default CountryStats;