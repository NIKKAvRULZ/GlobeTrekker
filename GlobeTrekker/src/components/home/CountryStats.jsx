import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaGlobe, FaUsers, FaLanguage, FaClock } from "react-icons/fa";
import CountUp from 'react-countup'; // Add this package with: npm install react-countup

const CountryStats = () => {
  const [stats, setStats] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isInView, setIsInView] = useState(false);
  
  // Fun facts for each statistic that appear on hover
  const funFacts = [
    "Vatican City is the smallest country with just 0.49 sq km!",
    "Over 60% of the global population lives in Asia.",
    "Papua New Guinea has over 840 different languages!",
    "Kiribati is the only country to exist in all four hemispheres."
  ];

  useEffect(() => {
    // Simulating API data loading
    const loadStats = async () => {
      // In a real app, fetch data from an API here
      // For now, we'll use static data with a simulated delay
      setTimeout(() => {
        setStats([
          { label: "Total Countries", value: 195, icon: <FaGlobe className="text-blue-500" /> },
          { label: "Total Population", value: 7800000000, formattedValue: "7.8B", icon: <FaUsers className="text-green-500" /> },
          { label: "Languages", value: 6500, formattedValue: "6,500+", icon: <FaLanguage className="text-purple-500" /> },
          { label: "Time Zones", value: 24, icon: <FaClock className="text-red-500" /> }
        ]);
      }, 600);
    };

    loadStats();
  }, []);

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Animation variants for the stats cards
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white/60 to-blue-100/70 backdrop-blur-md relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute w-40 h-40 rounded-full bg-blue-300/20"
          style={{ top: '10%', left: '5%' }}
          animate={{ 
            scale: [1, 1.2, 1], 
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-green-300/20"
          style={{ bottom: '10%', right: '15%' }}
          animate={{ 
            scale: [1, 1.3, 1], 
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute w-52 h-52 rounded-full bg-purple-300/20"
          style={{ top: '30%', right: '5%' }}
          animate={{ 
            scale: [1, 1.1, 1], 
            x: [0, -10, 0],
            y: [0, 15, 0]
          }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Global Statistics
          </h2>
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
            Explore key statistics about our planet's countries and populations
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          onViewportEnter={() => setIsInView(true)}
        >
          {stats ? stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className={`relative bg-white/90 rounded-xl p-8 text-center shadow-lg border-2 transition-all duration-300
                ${activeIndex === index ? 'border-blue-500 shadow-blue-200/50 shadow-xl' : 'border-transparent'}
              `}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <motion.div 
                className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, 0] }}
                transition={{ delay: index * 0.2, type: "spring" }}
              >
                {stat.icon && <div className="text-3xl">{stat.icon}</div>}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.3 + 0.2 }}
              >
                <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {isInView ? (
                    stat.formattedValue ? (
                      stat.formattedValue
                    ) : (
                      <CountUp 
                        end={stat.value} 
                        duration={2.5}
                        separator=","
                      />
                    )
                  ) : (
                    0
                  )}
                </h3>
                <p className="text-gray-700 font-medium">{stat.label}</p>
              </motion.div>
              
              {/* Fun fact that appears on hover */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-purple-500 text-white rounded-b-xl px-4 py-3 text-sm"
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: activeIndex === index ? 'auto' : 0,
                  opacity: activeIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-medium">Did you know?</p>
                <p>{funFacts[index]}</p>
              </motion.div>
            </motion.div>
          )) : (
            // Loading skeletons while data is being fetched
            [...Array(4)].map((_, index) => (
              <motion.div
                key={index}
                className="bg-white/80 rounded-xl p-8 text-center shadow-lg animate-pulse"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4" />
                <div className="h-8 bg-gray-200 rounded mb-2 mx-auto w-24" />
                <div className="h-4 bg-gray-100 rounded mx-auto w-20" />
              </motion.div>
            ))
          )}
        </motion.div>
        
        {/* Interactive explore button */}
        <motion.button
          className="mt-12 mx-auto block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Explore More Statistics
        </motion.button>
      </div>
    </section>
  );
};

export default CountryStats;