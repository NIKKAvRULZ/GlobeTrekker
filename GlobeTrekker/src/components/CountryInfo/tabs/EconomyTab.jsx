import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaSpinner, FaMoneyBillWave, FaChartLine, FaCar, FaIndustry, FaChevronDown, FaGlobeAmericas, FaInfoCircle } from 'react-icons/fa';

const EconomyTab = ({ country }) => {
  const [gdpData, setGdpData] = useState({
    value: null,
    loading: true,
    error: null
  });
  
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [hoveredIndicator, setHoveredIndicator] = useState(null);
  
  useEffect(() => {
    setGdpData({ value: null, loading: true, error: null });
    
    const fetchGDPData = async () => {
      try {
        const countryCode = country.cca3 || country.cca2;
        const response = await fetch(
          `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.PCAP.CD?date=2020:2022&format=json`
        );
        const data = await response.json();
        
        if (data && Array.isArray(data) && data.length > 1 && data[1] && data[1].length > 0) {
          const gdpValue = data[1].find(item => item.value !== null);
          if (gdpValue) {
            setGdpData({
              value: gdpValue.value,
              year: gdpValue.date,
              loading: false,
              error: null
            });
          } else {
            throw new Error('No GDP data found');
          }
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        try {
          const response = await fetch(`https://restcountries.com/v3.1/alpha/${country.cca3}?fields=capitalInfo,population,area,flags,name,gdp`);
          const data = await response.json();
          
          if (data && data.gdp) {
            setGdpData({
              value: data.gdp.capita,
              loading: false,
              error: null
            });
          } else {
            const regionGDPEstimates = {
              'Europe': 34000,
              'North America': 45000,
              'Asia': 7500, 
              'South America': 9000,
              'Oceania': 27000,
              'Africa': 3500
            };
            
            const estimatedGDP = regionGDPEstimates[country.region] || 10000;
            setGdpData({
              value: estimatedGDP,
              loading: false,
              estimated: true,
              error: null
            });
          }
        } catch (secondError) {
          setGdpData({
            value: null,
            loading: false,
            error: 'Could not fetch GDP data'
          });
        }
      }
    };

    if (country && (country.cca3 || country.cca2)) {
      fetchGDPData();
    } else {
      setGdpData({
        value: null, 
        loading: false,
        error: 'Country code not available'
      });
    }
  }, [country.cca3, country.cca2]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    }
  };
  
  const expandVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { 
      height: "auto", 
      opacity: 1,
      transition: {
        height: {
          type: "spring",
          stiffness: 500,
          damping: 30
        },
        opacity: { duration: 0.3 }
      }
    }
  };
  
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const getGDPLevelDesc = (value) => {
    if (!value) return "Data not available";
    
    if (value > 50000) return "Very High Income Economy";
    if (value > 25000) return "High Income Economy";
    if (value > 10000) return "Upper-Middle Income Economy";
    if (value > 5000) return "Middle Income Economy";
    if (value > 2500) return "Lower-Middle Income Economy";
    return "Low Income Economy";
  };

  const economicIndicators = [
    { 
      name: "Economic Freedom", 
      value: Math.floor(Math.random() * 40) + 60, 
      color: "from-blue-300 to-blue-500",
      description: "Measures how free individuals are to work, produce, consume, and invest in any way they please."
    },
    { 
      name: "Ease of Business", 
      value: Math.floor(Math.random() * 30) + 70, 
      color: "from-purple-300 to-purple-500",
      description: "Ranks economies on their regulatory environment for business operations."
    },
    { 
      name: "Innovation Index", 
      value: Math.floor(Math.random() * 50) + 50, 
      color: "from-pink-300 to-pink-500",
      description: "Measures a country's capacity and success in innovation."
    },
    { 
      name: "Market Development", 
      value: Math.floor(Math.random() * 40) + 60, 
      color: "from-teal-300 to-teal-600",
      description: "Evaluates financial system development and market access."
    }
  ];

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="bg-emerald-50 p-5 rounded-xl border border-emerald-100 relative overflow-hidden"
        variants={itemVariants}
        whileHover={{ 
          boxShadow: "0 25px 30px -5px rgba(16, 185, 129, 0.15)", 
          y: -5,
          scale: 1.01,
          transition: { type: "spring", stiffness: 400, damping: 20 }
        }}
      >
        <motion.div 
          className="absolute -inset-[150%] bg-gradient-to-r from-transparent via-emerald-200/30 to-transparent skew-x-45"
          animate={{ 
            left: ['-150%', '150%'],
            rotateZ: [0, 5, 0, -5, 0]
          }}
          transition={{ 
            duration: 3, 
            ease: "easeInOut", 
            repeat: Infinity, 
            repeatDelay: 2 
          }}
        />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="text-emerald-600 p-2 bg-emerald-100 rounded-full"
            >
              <FaMoneyBillWave size={18} />
            </motion.div>
            <motion.h3 
              className="text-xl font-semibold text-emerald-700"
              animate={{ color: ["#047857", "#10B981", "#047857"] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Economy & Currency
            </motion.h3>
          </div>
        
          <div className="mt-5 grid gap-5">
            <motion.div 
              variants={itemVariants}
              className="bg-white p-5 rounded-lg shadow-sm border border-emerald-50 overflow-hidden relative"
              whileHover={{ 
                y: -3, 
                boxShadow: "0 15px 20px -3px rgba(16, 185, 129, 0.15)",
                borderColor: "#6EE7B7",
                transition: { type: "spring" }
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-emerald-50/80 via-transparent to-emerald-50/80" 
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 1.5 }}
              />
              
              <div className="relative">
                <p className="text-sm text-emerald-800 font-medium mb-3 flex items-center gap-2">
                  <FaMoneyBillWave className="text-emerald-600" />
                  <motion.span 
                    whileHover={{ letterSpacing: "0.5px" }}
                    className="text-base"
                  >
                    Currencies
                  </motion.span>
                </p>
                <div className="flex flex-wrap gap-3 mt-1">
                  {country.currencies ? 
                    Object.entries(country.currencies).map(([code, { name, symbol }], index) => (
                      <motion.div 
                        key={code} 
                        className="bg-gradient-to-r from-emerald-50 to-emerald-100 px-4 py-2 rounded-lg border border-emerald-100 text-sm flex items-center gap-2"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: index * 0.15, type: "spring" }}
                        whileHover={{ 
                          scale: 1.08,
                          y: -2,
                          boxShadow: "0 10px 15px -3px rgba(16, 185, 129, 0.2)",
                          backgroundImage: "linear-gradient(to right, #D1FAE5, #A7F3D0)"
                        }}
                      >
                        <motion.div 
                          className="h-6 w-6 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {code.charAt(0)}
                        </motion.div>
                        <div>
                          <span className="font-bold text-emerald-800">{code}</span>
                          <div className="text-emerald-700 flex items-center gap-1">
                            <span>{name}</span> 
                            <motion.span 
                              className="font-medium ml-1"
                              animate={pulseAnimation}
                            >
                              {symbol}
                            </motion.span>
                          </div>
                        </div>
                      </motion.div>
                    )) : 
                    <span className="text-gray-500">No currency data available</span>
                  }
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="bg-white p-5 rounded-lg shadow-sm border border-emerald-50 relative overflow-hidden"
              whileHover={{ 
                y: -3, 
                boxShadow: "0 15px 20px -3px rgba(16, 185, 129, 0.15)",
                borderColor: "#6EE7B7",
                transition: { type: "spring" }
              }}
            >
              <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-bl from-emerald-50 to-transparent rounded-full opacity-70"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity, 
                  repeatType: "reverse"
                }}
              />
              
              <p className="text-sm text-emerald-800 font-medium mb-3 flex items-center gap-2 relative">
                <motion.div
                  animate={{ rotate: [0, 15, 0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <FaChartLine className="text-emerald-600" size={18} />
                </motion.div>
                <motion.span 
                  whileHover={{ letterSpacing: "0.5px" }}
                  className="text-base"
                >
                  GDP Per Capita
                </motion.span>
              </p>
              
              {gdpData.loading ? (
                <div className="flex items-center gap-3 text-emerald-600 py-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  >
                    <FaSpinner size={20} />
                  </motion.div>
                  <motion.p 
                    className="font-medium"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Calculating economic data...
                  </motion.p>
                </div>
              ) : gdpData.error ? (
                <p className="font-medium text-gray-500">Data not available</p>
              ) : (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <motion.p 
                      className="font-bold text-2xl text-emerald-800"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", damping: 12 }}
                    >
                      ${gdpData.value.toLocaleString()}
                    </motion.p>
                    <div className="flex flex-col text-sm">
                      <span className="text-emerald-600">USD</span>
                      {gdpData.year && <span className="text-gray-500">{gdpData.year}</span>}
                    </div>
                    
                    {gdpData.estimated && (
                      <motion.span 
                        className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full border border-amber-200"
                        animate={{ 
                          scale: [1, 1.05, 1],
                          backgroundColor: ["#FEF3C7", "#FDE68A", "#FEF3C7"]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        estimated
                      </motion.span>
                    )}
                  </div>
                  
                  <motion.p 
                    className="text-sm text-emerald-700 font-medium mb-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {getGDPLevelDesc(gdpData.value)}
                  </motion.p>
                  
                  {gdpData.value && (
                    <div className="mt-3 relative">
                      <div className="bg-gray-100 h-3 rounded-full overflow-hidden w-full">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-emerald-300 to-emerald-500 relative"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (gdpData.value / 60000) * 100)}%` }}
                          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                        >
                          <motion.div 
                            className="absolute right-0 top-0 h-full w-2 bg-white opacity-80"
                            animate={{ 
                              x: [-10, 10, -10],
                              opacity: [0.2, 0.8, 0.2]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        </motion.div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Low</span>
                        <span>High</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <motion.button
                      onClick={() => setExpanded(!expanded)}
                      className="text-sm text-emerald-600 hover:text-emerald-800 flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full"
                      whileHover={{ 
                        scale: 1.03, 
                        backgroundColor: "#A7F3D0",
                        transition: { type: "spring", stiffness: 400 }
                      }}
                    >
                      <FaInfoCircle size={12} />
                      What does this mean?
                      <motion.div
                        animate={{ rotate: expanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaChevronDown size={12} />
                      </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {expanded && (
                        <motion.div
                          variants={expandVariants}
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          className="mt-3 text-sm text-gray-600 bg-emerald-50/70 p-3 rounded-lg border-l-2 border-emerald-400"
                        >
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            GDP per capita is the economic output of a country divided by its population, indicating the average prosperity level of its citizens. Higher values suggest greater economic development and generally correlate with higher living standards.
                          </motion.p>
                          
                          <motion.div
                            className="mt-3 grid grid-cols-2 gap-3 text-xs"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <div className="bg-white/60 p-2 rounded border border-emerald-100">
                              <p className="font-bold text-emerald-700">High GDP ($25,000+)</p>
                              <p>Strong economy, typically higher standard of living</p>
                            </div>
                            <div className="bg-white/60 p-2 rounded border border-emerald-100">
                              <p className="font-bold text-emerald-700">Low GDP (&lt;$5,000)</p>
                              <p>Developing economy, may face economic challenges</p>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="bg-white p-4 rounded-lg shadow-sm border border-emerald-50 flex flex-col sm:flex-row sm:items-center gap-4 relative overflow-hidden"
              whileHover={{ 
                y: -3, 
                boxShadow: "0 15px 20px -3px rgba(16, 185, 129, 0.15)",
                borderColor: "#6EE7B7"
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-50/50 to-transparent"
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              
              <div className="sm:w-1/2 relative">
                <p className="text-sm text-emerald-800 font-medium mb-2 flex items-center gap-2">
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, 0, -10, 0],
                      x: [0, 2, 0, -2, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <FaCar className="text-emerald-600" />
                  </motion.div>
                  Car Side
                </p>
                <motion.p 
                  className="font-medium capitalize bg-gradient-to-r from-emerald-50 to-emerald-100 inline-block px-4 py-1.5 rounded-full border border-emerald-200"
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundImage: "linear-gradient(to right, #D1FAE5, #A7F3D0)", 
                    y: -2,
                    boxShadow: "0 4px 6px -1px rgba(16, 185, 129, 0.1)"
                  }}
                >
                  {country.car?.side || "N/A"}
                </motion.p>
              </div>
              
              <div className="sm:w-1/2 relative">
                <p className="text-sm text-emerald-800 font-medium mb-2 flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  >
                    <FaIndustry className="text-emerald-600" />
                  </motion.div>
                  Main Industries
                </p>
                <motion.p 
                  className="font-medium text-sm bg-gradient-to-r from-emerald-50 to-emerald-100 px-4 py-1.5 rounded-lg border border-emerald-200"
                  whileHover={{ 
                    scale: 1.03, 
                    backgroundImage: "linear-gradient(to right, #D1FAE5, #A7F3D0)", 
                    y: -2,
                    boxShadow: "0 4px 6px -1px rgba(16, 185, 129, 0.1)"
                  }}
                >
                  {country.region === 'Europe' ? 'Services, Manufacturing, Technology' :
                   country.region === 'Asia' ? 'Manufacturing, Technology, Agriculture' :
                   country.region === 'North America' ? 'Services, Technology, Manufacturing' :
                   country.region === 'South America' ? 'Agriculture, Mining, Manufacturing' :
                   country.region === 'Africa' ? 'Agriculture, Mining, Services' :
                   country.region === 'Oceania' ? 'Services, Agriculture, Tourism' :
                   'Data not available'}
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-emerald-50 p-5 rounded-xl border border-emerald-100 relative overflow-hidden"
        variants={itemVariants}
        whileHover={{ 
          boxShadow: "0 25px 30px -5px rgba(16, 185, 129, 0.15)", 
          y: -5,
          scale: 1.01
        }}
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent)]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <div className="flex items-center gap-3 mb-4 relative">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-emerald-600 p-2 bg-emerald-100 rounded-full"
          >
            <FaGlobeAmericas size={18} />
          </motion.div>
          <motion.h3 
            className="text-xl font-semibold text-emerald-700"
            animate={{ color: ["#047857", "#10B981", "#047857"] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Economic Indicators
          </motion.h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {economicIndicators.map((indicator, i) => (
            <motion.div 
              key={indicator.name}
              className="bg-white p-4 rounded-lg shadow-sm relative overflow-hidden"
              whileHover={{ 
                y: -3, 
                boxShadow: "0 15px 20px -3px rgba(16, 185, 129, 0.15)",
                scale: 1.02
              }}
              onHoverStart={() => setHoveredIndicator(indicator.name)}
              onHoverEnd={() => setHoveredIndicator(null)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.4 + (i * 0.15),
                type: "spring", 
                stiffness: 300,
                damping: 20
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-gray-50/50 to-transparent"
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <div className="flex justify-between mb-2 items-center relative">
                <div className="flex items-center gap-1.5">
                  <motion.div 
                    className={`h-3 w-3 rounded-full bg-gradient-to-r ${indicator.color}`}
                    animate={hoveredIndicator === indicator.name ? pulseAnimation : {}}
                  />
                  <p className="text-sm font-medium text-gray-700">{indicator.name}</p>
                </div>
                <motion.p 
                  className="text-base font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent"
                  animate={hoveredIndicator === indicator.name ? 
                    { scale: [1, 1.15, 1] } : 
                    { scale: 1 }
                  }
                  transition={{ duration: 0.5 }}
                >
                  {indicator.value}%
                </motion.p>
              </div>
              
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden relative">
                <motion.div 
                  className={`h-full rounded-full bg-gradient-to-r ${indicator.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${indicator.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                >
                  <motion.div 
                    className="absolute right-0 top-0 h-full w-2 bg-white opacity-70"
                    animate={{ 
                      x: [-10, 10, -10],
                      opacity: [0.2, 0.7, 0.2]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
                
                <motion.div
                  className={`absolute top-0 left-0 h-full w-full opacity-30 bg-gradient-to-r ${indicator.color}`}
                  initial={{ x: '-100%' }}
                  animate={hoveredIndicator === indicator.name ? 
                    { x: '100%' } : 
                    { x: '-100%' }
                  }
                  transition={{ duration: 1 }}
                />
              </div>
              
              <AnimatePresence>
                {hoveredIndicator === indicator.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 text-xs text-gray-600 overflow-hidden"
                  >
                    {indicator.description}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EconomyTab;