import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SearchComponent from "./SearchComponent";

const HeroSection = ({ loading, countryStats, searchTerm, setSearchTerm, searchResults, isSearching, formatNumber }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-x-hidden">
      {/* Background decorations */}
      <motion.div 
        className="absolute w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* World Map Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-center bg-no-repeat bg-contain" />
        
        {/* Decorative floating elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-blue-500/20"
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-green-400/20"
          animate={{ 
            y: [0, 30, 0],
            x: [0, -15, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="hidden md:block absolute bottom-1/4 left-1/3 w-12 h-12 rounded-full bg-yellow-300/20"
          animate={{ 
            y: [0, -15, 0],
            x: [0, -20, 0]
          }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </motion.div>
      
      {/* Interactive 3D Globe Effect */}
      <div 
        className="absolute w-[140vw] h-[140vw] md:w-[800px] md:h-[800px] rounded-full bg-gradient-to-r from-blue-400/10 to-cyan-400/10 
                  opacity-70 blur-md transition-all duration-100"
        style={{ 
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          transform: 'translateZ(0)'
        }}
      >
        {/* World map overlay on globe */}
        <div className="absolute inset-0 rounded-full overflow-hidden bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-center bg-no-repeat bg-contain opacity-30" />
      </div>
      
      {/* Content */}
      <motion.div
        className="relative z-20 text-center w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
          animate={{ 
            textShadow: [
              "0 0 10px rgba(59, 130, 246, 0.3)",
              "0 0 20px rgba(59, 130, 246, 0.5)",
              "0 0 10px rgba(59, 130, 246, 0.3)",
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          GlobeTrekker
        </motion.h1>
        
        <motion.p className="text-xl md:text-2xl text-gray-700 mb-10">
          {loading ? (
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading...
            </motion.span>
          ) : (
            `Discover the world's ${countryStats.total} countries with comprehensive data`
          )}
        </motion.p>
        
        {/* Updated Search Component container with improved spacing */}
        <div className="relative z-50 w-full max-w-2xl mx-auto mb-16">
          <div className="relative">
            <SearchComponent 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchResults={searchResults}
              isSearching={isSearching}
            />
            {/* Search Results Container with increased bottom margin */}
            <div className="absolute left-0 right-0 mt-2 mb-8 landscape:max-h-[40vh] portrait:max-h-[60vh] overflow-y-auto">
              {/* SearchResults component will render here */}
            </div>
          </div>
        </div>
        
        {/* Increased top margin for CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
            >
              Start Exploring
            </motion.button>
          </Link>
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-3 bg-white text-blue-600 border-2 border-blue-200 rounded-full text-lg font-semibold shadow-sm hover:shadow-md transition-all duration-300"
            >
              Sign In
            </motion.button>
          </Link>
        </motion.div>
        
        {/* Features Pills */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {['Flags', 'Maps', 'Capitals', 'Languages', 'Demographics', 'Currencies'].map((feature, i) => (
            <motion.div 
              key={feature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
              className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-blue-600 shadow-sm"
            >
              {feature}
            </motion.div>
          ))}
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-sm text-gray-500 mb-2">Scroll to explore</p>
          <svg className="w-6 h-6 text-gray-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;