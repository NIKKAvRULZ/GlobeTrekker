import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaGlobeAmericas, FaUsers, FaLanguage, FaMapMarkedAlt } from "react-icons/fa";
import CountUp from 'react-countup';

const GlobalStatistics = ({ data }) => {
  const [hoveredStat, setHoveredStat] = useState(null);
  const [isInView, setIsInView] = useState(false);

  // Fun facts for each statistic
  const funFacts = [
    "The United Nations recognizes 193 member states, plus 2 observer states (Vatican City and Palestine).",
    "The world's population reached 8 billion people in November 2022!",
    "There are over 7,000 living languages in the world today.",
    "Asia is the largest region by both land area and population, containing 60% of the world's population."
  ];

  const getGlobalStats = () => {
    if (!data) return null;
    
    return {
      totalCountries: data.length,
      totalPopulation: data.reduce((acc, country) => acc + (country.population || 0), 0),
      totalLanguages: new Set(data.flatMap(country => 
        country.languages ? Object.values(country.languages) : []
      )).size,
      totalRegions: new Set(data.map(country => country.region)).size
    };
  };

  const stats = getGlobalStats();

  // Load world map SVG paths when component mounts
  const [worldMap, setWorldMap] = useState(null);
  
  useEffect(() => {
    // Simple world map path (simplified for performance)
    setWorldMap("M10,50 Q50,30 90,50 T170,50");
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-700 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full"
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Globe lines animation in background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-10">
        <motion.div 
          className="w-[600px] h-[600px] border-2 border-white/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute w-[500px] h-[500px] border-2 border-white/15 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute w-[400px] h-[400px] border-2 border-white/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
            className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center mx-auto mb-6"
          >
            <FaGlobeAmericas className="text-4xl text-blue-300" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-200">Statistics</span>
          </h2>
          
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-blue-300 to-teal-200 rounded-full mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          
          <p className="mt-6 text-blue-100 max-w-2xl mx-auto text-lg">
            Discover fascinating statistics about our diverse world
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          onViewportEnter={() => setIsInView(true)}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {[
            { 
              label: "Total Countries", 
              value: stats?.totalCountries, 
              icon: <FaGlobeAmericas />,
              color: "from-blue-400 to-blue-600"
            },
            { 
              label: "Global Population", 
              value: stats?.totalPopulation, 
              formattedValue: stats?.totalPopulation?.toLocaleString(),
              icon: <FaUsers />,
              color: "from-teal-400 to-teal-600" 
            },
            { 
              label: "Languages", 
              value: stats?.totalLanguages, 
              icon: <FaLanguage />,
              color: "from-purple-400 to-purple-600" 
            },
            { 
              label: "Regions", 
              value: stats?.totalRegions,
              icon: <FaMapMarkedAlt />,
              color: "from-pink-400 to-pink-600" 
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`relative rounded-2xl overflow-hidden group`}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { type: "spring", stiffness: 100 }
                }
              }}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" 
              }}
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              {/* Background gradient that animates on hover */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-70`}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: hoveredStat === index ? 0.9 : 0.7 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Main content */}
              <div className="relative z-10 p-8 pt-10 backdrop-blur-sm h-full">
                <motion.div 
                  className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 text-white text-2xl"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: index * 0.1 + 0.2 }}
                >
                  {stat.icon}
                </motion.div>
                
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 text-center">
                  {isInView ? (
                    stat.formattedValue ? (
                      stat.formattedValue
                    ) : (
                      <CountUp 
                        end={stat.value || 0} 
                        duration={2.5}
                        separator="," 
                        className="text-shadow"
                      />
                    )
                  ) : (
                    0
                  )}
                </h3>
                
                <p className="text-white/80 text-center font-medium text-lg">
                  {stat.label}
                </p>
                
                {/* Fun fact that reveals on hover */}
                <motion.div 
                  className="absolute bottom-0 inset-x-0 bg-black/30 backdrop-blur-md p-4 text-sm text-white"
                  initial={{ y: '100%' }}
                  animate={{ y: hoveredStat === index ? 0 : '100%' }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="font-medium mb-1">Did you know?</p>
                  <p>{funFacts[index]}</p>
                </motion.div>
              </div>
              
              {/* Interactive particle effect on hover */}
              {hoveredStat === index && (
                <motion.div 
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      initial={{ 
                        x: Math.random() * 100 - 50 + '%', 
                        y: Math.random() * 100 - 50 + '%', 
                        opacity: 0,
                        scale: 0
                      }}
                      animate={{ 
                        x: (Math.random() * 200 - 100) + '%', 
                        y: (Math.random() * 200 - 100) + '%',
                        opacity: [0, 1, 0],
                        scale: [0, Math.random() * 2 + 1, 0]
                      }}
                      transition={{ 
                        duration: Math.random() * 2 + 1,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
        
        {/* Interactive explore button */}
        <motion.button
          className="mt-16 mx-auto flex items-center gap-2 px-8 py-4 bg-white text-blue-900 rounded-full font-medium text-lg shadow-lg shadow-blue-900/20 group relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <span className="relative z-10">Explore Detailed Statistics</span>
          
          {/* Button hover effect */}
          <motion.span 
            className="absolute inset-0 bg-gradient-to-r from-blue-300 to-teal-200"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ type: "tween" }}
          />
          
          {/* Arrow icon */}
          <motion.span 
            className="relative z-10"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.button>
      </div>

      {/* World map SVG with tracing animation in background */}
      {worldMap && (
        <div className="absolute bottom-0 left-0 right-0 opacity-20 h-40 overflow-hidden">
          <motion.svg 
            viewBox="0 0 180 60" 
            className="w-full h-full" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d={worldMap}
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 5, ease: "easeInOut" }}
            />
          </motion.svg>
        </div>
      )}
    </section>
  );
};

export default GlobalStatistics;