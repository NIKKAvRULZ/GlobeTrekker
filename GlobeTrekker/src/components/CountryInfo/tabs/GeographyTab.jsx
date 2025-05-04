import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaGlobe, FaMapMarkedAlt, FaMountain, FaTree, FaTemperatureLow, FaClock, FaCompass, FaBorderAll, FaWater, FaInfo } from 'react-icons/fa';

const GeographyTab = ({ country }) => {
  // State for hover effects and expanded sections
  const [hoveredSection, setHoveredSection] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  
  // Define animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }),
    hover: {
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    }
  };

  const iconVariants = {
    idle: {},
    hover: (custom) => {
      if (custom === 'rotate') return { rotate: 360, transition: { duration: 1.5 } };
      if (custom === 'bounce') return { y: [0, -5, 0], transition: { duration: 1.5, repeat: Infinity } };
      if (custom === 'shake') return { rotate: [-10, 10, -10], transition: { duration: 1, repeat: Infinity } };
      return {};
    }
  };
  
  const expandVariants = {
    collapsed: { height: 0, opacity: 0, margin: 0 },
    expanded: { 
      height: "auto", 
      opacity: 1, 
      margin: "16px 0 0 0",
      transition: {
        height: {
          type: "spring",
          stiffness: 500,
          damping: 30
        },
        opacity: { duration: 0.4 }
      }
    }
  };
  
  // Calculate climate based on latitude
  const getClimate = () => {
    if (!country.latlng) return "Unknown";
    
    const lat = country.latlng[0];
    if (lat > 60 || lat < -60) return "Polar";
    if (lat > 40 || lat < -40) return "Temperate";
    if (lat > 23.5 || lat < -23.5) return "Subtropical";
    return "Tropical";
  };

  // Get climate description
  const getClimateDescription = () => {
    const climate = getClimate();
    
    switch (climate) {
      case "Polar":
        return "Characterized by extremely cold temperatures, ice, and minimal precipitation. Areas experience long winters with little or no sunlight, and brief summers.";
      case "Temperate":
        return "Features distinct seasons with moderate temperatures. These regions typically experience cold winters and warm summers with year-round precipitation.";
      case "Subtropical":
        return "Warm to hot summers with mild winters. These regions often experience a rainy season and tend to be humid with distinct wet and dry periods.";
      case "Tropical":
        return "Consistently warm temperatures throughout the year with high humidity and significant rainfall. Often divided into wet and dry seasons rather than the traditional four seasons.";
      default:
        return "Climate information not available for this region.";
    }
  };
  
  // Get an array of nearby countries
  const getNearbyCountries = () => {
    if (!country.borders || country.borders.length === 0) return ["None (Island Nation)"];
    
    if (country.borders.length <= 3) return country.borders;
    return country.borders.slice(0, 3).concat([`+${country.borders.length - 3} more`]);
  };

  // Get terrain type based on region
  const getTerrainType = () => {
    if (!country.region) return "Various";
    
    switch (country.region) {
      case "Europe": 
        return "Mountains, plains, forests";
      case "Asia": 
        return "Mountains, deserts, forests, steppes";
      case "Africa": 
        return "Desert, savanna, rainforest";
      case "Oceania": 
        return "Coastal, rainforest, desert";
      case "North America": 
        return "Mountains, forests, plains, desert";
      case "South America": 
        return "Rainforest, mountains, grasslands";
      case "Antarctica": 
        return "Ice sheet, mountains";
      default: 
        return "Various";
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
    >
      {/* Region & Location Section */}
      <motion.div 
        custom={0}
        variants={cardVariants}
        className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 overflow-hidden relative"
        onHoverStart={() => setHoveredSection('location')}
        onHoverEnd={() => setHoveredSection(null)}
        whileHover="hover"
      >
        {/* Animated background patterns */}
        <motion.div 
          className="absolute -inset-[150%] bg-gradient-to-r from-transparent via-indigo-200/30 to-transparent skew-x-45"
          animate={{ left: ['-150%', '150%'] }}
          transition={{ 
            duration: 3, 
            ease: "easeInOut", 
            repeat: Infinity, 
            repeatDelay: 5 
          }}
        />
        
        <motion.div 
          className="absolute top-0 left-0 w-full h-full opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 20%, rgba(129, 140, 248, 0.3) 0%, transparent 50%)`
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              custom="rotate"
              variants={iconVariants}
              animate={hoveredSection === 'location' ? "hover" : "idle"}
              className="bg-indigo-100 p-2.5 rounded-full shadow-md"
            >
              <FaGlobe className="text-indigo-600" size={20} />
            </motion.div>
            <motion.h3 
              className="text-xl font-semibold text-indigo-700"
              animate={{
                color: hoveredSection === 'location' ? 
                  ["#4338CA", "#6366F1", "#4338CA"] : 
                  "#4338CA"
              }}
              transition={{ duration: 2, repeat: hoveredSection === 'location' ? Infinity : 0 }}
            >
              Geographic Location
            </motion.h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div 
              className="bg-white p-4 rounded-lg shadow-sm border border-indigo-50 overflow-hidden relative"
              whileHover={{ 
                scale: 1.03, 
                y: -3,
                boxShadow: "0 15px 30px -5px rgba(79, 70, 229, 0.2)",
                borderColor: "#818CF8"
              }}
              transition={{ type: "spring" }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-indigo-50/50 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8 }}
              />
              
              <div className="relative">
                <p className="text-sm text-indigo-900 font-medium mb-2 flex items-center gap-2">
                  <FaMapMarkedAlt className="text-indigo-500" />
                  <motion.span whileHover={{ x: 3 }}>Region</motion.span>
                </p>
                <motion.p 
                  className="font-bold text-xl text-indigo-800"
                  animate={{ 
                    scale: hoveredSection === 'location' ? [1, 1.03, 1] : 1
                  }}
                  transition={{ duration: 1.5, repeat: hoveredSection === 'location' ? Infinity : 0 }}
                >
                  {country.region || "Unknown"}
                </motion.p>
                
                {country.subregion && (
                  <motion.p 
                    className="mt-1 text-indigo-600 flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.span 
                      className="inline-block"
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                    {country.subregion}
                  </motion.p>
                )}
                
                <motion.div 
                  className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden"
                  whileHover={{ height: "6px" }}
                >
                  <motion.div 
                    className="h-full bg-gradient-to-r from-indigo-400 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  >
                    <motion.div 
                      className="absolute right-0 top-0 h-full w-3 bg-white opacity-70"
                      animate={{ 
                        x: [-10, 10, -10],
                        opacity: [0.2, 0.6, 0.2]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-4 rounded-lg shadow-sm border border-indigo-50 overflow-hidden relative"
              whileHover={{ 
                scale: 1.03, 
                y: -3,
                boxShadow: "0 15px 30px -5px rgba(79, 70, 229, 0.2)",
                borderColor: "#818CF8"
              }}
              transition={{ type: "spring" }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-bl from-indigo-50/50 to-transparent"
                initial={{ x: '100%' }}
                whileHover={{ x: '-100%' }}
                transition={{ duration: 0.8 }}
              />
              
              <div className="relative">
                <p className="text-sm text-indigo-900 font-medium mb-2 flex items-center gap-2">
                  <motion.div 
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <FaCompass className="text-indigo-500" />
                  </motion.div>
                  <motion.span whileHover={{ x: 3 }}>Coordinates</motion.span>
                </p>
                <div className="font-medium">
                  {country.latlng ? (
                    <div className="flex flex-col gap-1">
                      <motion.div 
                        className="flex items-center gap-1.5 bg-indigo-50 px-3 py-1.5 rounded-lg w-fit"
                        whileHover={{ 
                          x: 5, 
                          backgroundColor: "#E0E7FF", 
                          scale: 1.03 
                        }}
                      >
                        <span className="text-indigo-800 font-semibold">Latitude:</span> 
                        <motion.span 
                          className="font-bold"
                          animate={{
                            color: ["#6366F1", "#4338CA", "#6366F1"] 
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          {country.latlng[0].toFixed(2)}°
                        </motion.span>
                        <span className="text-xs px-1.5 py-0.5 bg-indigo-100 text-indigo-600 rounded-full">
                          {country.latlng[0] >= 0 ? 'North' : 'South'}
                        </span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center gap-1.5 bg-indigo-50 px-3 py-1.5 rounded-lg w-fit"
                        whileHover={{ 
                          x: 5, 
                          backgroundColor: "#E0E7FF", 
                          scale: 1.03 
                        }}
                      >
                        <span className="text-indigo-800 font-semibold">Longitude:</span> 
                        <motion.span 
                          className="font-bold"
                          animate={{
                            color: ["#6366F1", "#4338CA", "#6366F1"] 
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          {country.latlng[1].toFixed(2)}°
                        </motion.span>
                        <span className="text-xs px-1.5 py-0.5 bg-indigo-100 text-indigo-600 rounded-full">
                          {country.latlng[1] >= 0 ? 'East' : 'West'}
                        </span>
                      </motion.div>
                      
                      {/* Interactive globe position indicator */}
                      <motion.div 
                        className="mt-3 relative h-24 bg-indigo-50 rounded-lg overflow-hidden border border-indigo-100"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="absolute inset-0 grid place-items-center">
                          <motion.div 
                            className="w-20 h-20 rounded-full border-2 border-indigo-200 grid place-items-center"
                            animate={{ 
                              rotate: [0, 360],
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          >
                            <motion.div 
                              className="absolute w-2 h-2 bg-red-500 rounded-full shadow-md"
                              style={{
                                top: `${50 - (country.latlng[0] / 90) * 50}%`,
                                left: `${50 + (country.latlng[1] / 180) * 50}%`
                              }}
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    "Coordinates not available"
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Terrain & Environment */}
      <motion.div 
        custom={1}
        variants={cardVariants}
        className="bg-blue-50 p-5 rounded-xl border border-blue-100 relative overflow-hidden"
        onHoverStart={() => setHoveredSection('terrain')}
        onHoverEnd={() => setHoveredSection(null)}
        whileHover="hover"
      >
        {/* Animated background patterns */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 70% 40%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              custom="bounce"
              variants={iconVariants}
              animate={hoveredSection === 'terrain' ? "hover" : "idle"}
              className="bg-blue-100 p-2.5 rounded-full shadow-md"
            >
              <FaMountain className="text-blue-600" size={20} />
            </motion.div>
            <motion.h3 
              className="text-xl font-semibold text-blue-700"
              animate={{
                color: hoveredSection === 'terrain' ? 
                  ["#1E40AF", "#3B82F6", "#1E40AF"] : 
                  "#1E40AF"
              }}
              transition={{ duration: 2, repeat: hoveredSection === 'terrain' ? Infinity : 0 }}
            >
              Terrain & Environment
            </motion.h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div 
              className="bg-white p-4 rounded-lg shadow-sm border border-blue-50 overflow-hidden relative"
              whileHover={{ 
                scale: 1.03, 
                y: -3,
                boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.2)",
                borderColor: "#93C5FD"
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8 }}
              />
              
              <div className="relative">
                <p className="text-sm text-blue-900 font-medium mb-2 flex items-center gap-2">
                  <FaTree className="text-blue-500" />
                  <motion.span whileHover={{ x: 3 }}>Area</motion.span>
                </p>
                <motion.p 
                  className="font-bold text-xl text-blue-800"
                  animate={{ 
                    scale: hoveredSection === 'terrain' ? [1, 1.03, 1] : 1
                  }}
                  transition={{ duration: 1.5, repeat: hoveredSection === 'terrain' ? Infinity : 0 }}
                >
                  {country?.area?.toLocaleString() || "Unknown"} km²
                </motion.p>
                
                <motion.div 
                  className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden"
                  whileHover={{ height: "10px" }}
                  transition={{ type: "spring" }}
                >
                  {country?.area && (
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 relative"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (country.area / 9000000) * 100)}%` }}
                      transition={{ duration: 1.5 }}
                    >
                      <motion.div 
                        className="absolute right-0 top-0 h-full w-3 bg-white opacity-70"
                        animate={{ 
                          x: [-10, 10, -10],
                          opacity: [0.2, 0.7, 0.2]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.div>
                  )}
                </motion.div>
                
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <motion.span 
                    whileHover={{ scale: 1.1, color: "#3B82F6" }}
                    className="bg-blue-50 px-1.5 rounded"
                  >
                    9M km²
                  </motion.span>
                </div>
                
                {/* Add a comparison element */}
                <motion.div
                  className="mt-3 text-xs text-blue-600 flex items-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <FaInfo size={12} />
                  {country?.area && country.area > 1000000 ? 
                    `${(country.area / 9000000 * 100).toFixed(1)}% of earth's land area` : 
                    country?.area ? 
                    `${(country.area / 100000).toFixed(1)}× the size of Iceland` :
                    'Size comparison not available'}
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-4 rounded-lg shadow-sm border border-blue-50 overflow-hidden relative"
              whileHover={{ 
                scale: 1.03, 
                y: -3,
                boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.2)",
                borderColor: "#93C5FD"
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-bl from-blue-50/50 to-transparent"
                initial={{ x: '100%' }}
                whileHover={{ x: '-100%' }}
                transition={{ duration: 0.8 }}
              />
              
              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-blue-900 font-medium flex items-center gap-2">
                    <FaBorderAll className="text-blue-500" />
                    <motion.span whileHover={{ x: 3 }}>Terrain Type</motion.span>
                  </p>
                  <motion.button
                    className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setExpandedSection(expandedSection === 'terrain' ? null : 'terrain')}
                  >
                    <FaInfo size={10} />
                    Details
                  </motion.button>
                </div>

                <motion.div 
                  className="font-medium text-lg text-blue-800 flex items-center gap-2"
                  animate={{ 
                    scale: hoveredSection === 'terrain' ? [1, 1.03, 1] : 1
                  }}
                  transition={{ duration: 3, repeat: hoveredSection === 'terrain' ? Infinity : 0 }}
                >
                  {getTerrainType()}
                  <motion.div
                    className="text-lg h-6"
                    animate={{
                      rotate: [0, 10, 0, -10, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FaMountain className="text-blue-500 inline-block" />
                  </motion.div>
                </motion.div>
                
                <AnimatePresence>
                  {expandedSection === 'terrain' && (
                    <motion.div
                      variants={expandVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="bg-blue-50 p-3 rounded-lg border-l-2 border-blue-300 text-sm text-blue-700"
                    >
                      <p>The typical terrain is characterized by {getTerrainType().toLowerCase()} with diverse ecosystems found throughout the {country.region || "region"}. Elevation varies across the country, creating a rich tapestry of natural environments.</p>
                      <div className="mt-2 bg-white p-2 rounded-md">
                        <p className="text-xs text-blue-500 font-semibold">Notable Features:</p>
                        <ul className="list-disc list-inside text-xs text-blue-800 mt-1 space-y-1">
                          <motion.li whileHover={{ x: 2 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                            Diverse ecosystems and biomes
                          </motion.li>
                          <motion.li whileHover={{ x: 2 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                            Varied elevation and topography
                          </motion.li>
                          <motion.li whileHover={{ x: 2 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                            Regional climate adaptations
                          </motion.li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="mt-3 border-t border-blue-100 pt-2">
                  <p className="text-sm text-blue-900 font-medium flex items-center gap-2 mb-2">
                    <FaBorderAll className="text-blue-500" />
                    <motion.span whileHover={{ x: 3 }}>Bordering Countries</motion.span>
                  </p>
                  <div className="flex items-center gap-2">
                    <motion.span 
                      className="font-bold text-xl text-blue-800"
                      animate={{ 
                        scale: hoveredSection === 'terrain' ? [1, 1.1, 1] : 1
                      }}
                      transition={{ duration: 2, repeat: hoveredSection === 'terrain' ? Infinity : 0 }}
                    >
                      {country.borders?.length || 0}
                    </motion.span>
                    <span className="text-sm text-gray-500">
                      {country.borders?.length 
                        ? `countr${country.borders.length === 1 ? 'y' : 'ies'}` 
                        : "Island nation"}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {getNearbyCountries().map((border, idx) => (
                      <motion.span 
                        key={idx}
                        className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-100"
                        whileHover={{ scale: 1.1, backgroundColor: "#DBEAFE", borderColor: "#93C5FD" }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: idx * 0.1 + 0.4,
                          type: "spring",
                          stiffness: 300
                        }}
                      >
                        {border}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Climate & Time Section */}
      <motion.div 
        custom={2}
        variants={cardVariants}
        className="bg-purple-50 p-5 rounded-xl border border-purple-100 relative overflow-hidden"
        onHoverStart={() => setHoveredSection('climate')}
        onHoverEnd={() => setHoveredSection(null)}
        whileHover="hover"
      >
        {/* Animated background patterns */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 60%, rgba(168, 85, 247, 0.3) 0%, transparent 60%)`
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              custom="shake"
              variants={iconVariants}
              animate={hoveredSection === 'climate' ? "hover" : "idle"}
              className="bg-purple-100 p-2.5 rounded-full shadow-md"
            >
              <FaTemperatureLow className="text-purple-600" size={20} />
            </motion.div>
            <motion.h3 
              className="text-xl font-semibold text-purple-700"
              animate={{
                color: hoveredSection === 'climate' ? 
                  ["#6D28D9", "#A855F7", "#6D28D9"] : 
                  "#6D28D9"
              }}
              transition={{ duration: 2, repeat: hoveredSection === 'climate' ? Infinity : 0 }}
            >
              Climate & Timezone
            </motion.h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div 
              className="bg-white p-4 rounded-lg shadow-sm border border-purple-50 overflow-hidden relative"
              whileHover={{ 
                scale: 1.03, 
                y: -3,
                boxShadow: "0 15px 30px -5px rgba(168, 85, 247, 0.2)",
                borderColor: "#C4B5FD"
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-purple-50/50 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8 }}
              />
              
              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-purple-900 font-medium flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [-5, 5, -5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <FaTemperatureLow className="text-purple-500" />
                    </motion.div>
                    <motion.span whileHover={{ x: 3 }}>Climate Zone</motion.span>
                  </p>
                  <motion.button
                    className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setExpandedSection(expandedSection === 'climate' ? null : 'climate')}
                  >
                    <FaInfo size={10} />
                    Details
                  </motion.button>
                </div>
                
                <motion.div 
                  className="flex items-center gap-2"
                  animate={{ 
                    scale: hoveredSection === 'climate' ? [1, 1.03, 1] : 1
                  }}
                  transition={{ duration: 2, repeat: hoveredSection === 'climate' ? Infinity : 0 }}
                >
                  <motion.span className="font-bold text-xl text-purple-800">
                    {getClimate()}
                  </motion.span>
                  <motion.div 
                    className="flex items-center"
                    animate={{ 
                      y: [0, -2, 0, 2, 0],
                      scale: [1, 1.08, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {getClimate() === "Tropical" && "🌴"}
                    {getClimate() === "Polar" && "❄️"}
                    {getClimate() === "Temperate" && "🍂"}
                    {getClimate() === "Subtropical" && "🌡️"}
                  </motion.div>
                </motion.div>
                
                <AnimatePresence>
                  {expandedSection === 'climate' && (
                    <motion.div
                      variants={expandVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="bg-purple-50 p-3 rounded-lg border-l-2 border-purple-300 text-sm text-purple-700"
                    >
                      {getClimateDescription()}
                      
                      <motion.div 
                        className="mt-2 bg-white p-2 rounded-md text-xs text-purple-900 flex items-center gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <FaWater className="text-purple-500" />
                        Climate based on latitude: {country.latlng ? country.latlng[0].toFixed(1) + "°" : "N/A"}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <motion.div
                  className="mt-4 h-3 bg-gray-100 rounded-full overflow-hidden relative"
                  whileHover={{ height: "8px" }}
                >
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 relative"
                    style={{ 
                      width: country.latlng ? 
                        `${Math.abs((country.latlng[0] + 90) / 180 * 100)}%` : 
                        "50%" 
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: country.latlng ? 
                      `${Math.abs((country.latlng[0] + 90) / 180 * 100)}%` : 
                      "50%" }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  />
                </motion.div>
                
                <div className="flex justify-between text-xs text-gray-500 mt-1.5">
                  <span>South Pole</span>
                  <span>Equator</span>
                  <span>North Pole</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-4 rounded-lg shadow-sm border border-purple-50 overflow-hidden relative"
              whileHover={{ 
                scale: 1.03, 
                y: -3,
                boxShadow: "0 15px 30px -5px rgba(168, 85, 247, 0.2)",
                borderColor: "#C4B5FD"
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-bl from-purple-50/50 to-transparent"
                initial={{ x: '100%' }}
                whileHover={{ x: '-100%' }}
                transition={{ duration: 0.8 }}
              />
              
              <div className="relative">
                <p className="text-sm text-purple-900 font-medium mb-2 flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <FaClock className="text-purple-500" />
                  </motion.div>
                  <motion.span whileHover={{ x: 3 }}>Timezones</motion.span>
                </p>
                
                <motion.p className="text-sm text-gray-500 mb-2">
                  {country?.timezones?.length > 0 ? (
                    `${country.timezones.length} timezone${country.timezones.length === 1 ? "" : "s"}`
                  ) : (
                    "Timezone data not available"
                  )}
                </motion.p>
                
                <div className="max-h-28 overflow-y-auto custom-scrollbar rounded-lg">
                  {country?.timezones?.length > 0 ? (
                    <div className="space-y-2">
                      {country.timezones.map((timezone, idx) => (
                        <motion.div 
                          key={timezone}
                          className="text-sm bg-purple-50 p-2.5 rounded-lg border border-purple-100 flex items-center"
                          whileHover={{ 
                            x: 3, 
                            backgroundColor: "#F3E8FF",
                            borderColor: "#E9D5FF" 
                          }}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: idx * 0.1,
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                          }}
                        >
                          <motion.div 
                            className="mr-2 text-purple-600"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          >
                            <FaClock size={14} />
                          </motion.div>
                          
                          <div>
                            <span className="text-purple-900 font-medium">{timezone}</span>
                            <motion.div 
                              className="text-xs text-purple-600"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 + idx * 0.1 }}
                            >
                              {timezone.includes('UTC+') ? 
                                `${parseInt(timezone.split('UTC+')[1])} hours ahead of GMT` : 
                                timezone.includes('UTC-') ? 
                                `${parseInt(timezone.split('UTC-')[1])} hours behind GMT` : 
                                'GMT timezone'}
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Timezone data not available</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Add custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F5F3FF;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #C4B5FD;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #A78BFA;
        }
      `}</style>
    </motion.div>
  );
};

export default GeographyTab;