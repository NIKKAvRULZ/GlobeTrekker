import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SearchComponent from "./SearchComponent";

const HeroSection = ({ loading, countryStats, searchTerm, setSearchTerm, searchResults, isSearching, formatNumber }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-x-hidden">
      {/* Enhanced background decorations */}
      <motion.div 
        className="absolute w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Improved World Map Pattern Overlay with better opacity */}
        <div className="absolute inset-0 opacity-8 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-center bg-no-repeat bg-contain" />
        
        {/* Enhanced decorative floating elements with more variety */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-blue-500/15 backdrop-blur-sm"
          animate={{ 
            y: [0, -25, 0],
            x: [0, 15, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-28 h-28 rounded-full bg-green-400/15 backdrop-blur-sm"
          animate={{ 
            y: [0, 35, 0],
            x: [0, -20, 0],
            scale: [1, 0.85, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hidden md:block absolute bottom-1/4 left-1/3 w-16 h-16 rounded-full bg-yellow-300/15 backdrop-blur-sm"
          animate={{ 
            y: [0, -20, 0],
            x: [0, -25, 0],
            rotate: [0, 15, 0]
          }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Additional floating element */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-12 h-12 rounded-full bg-purple-400/15 backdrop-blur-sm"
          animate={{ 
            y: [0, 15, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Grid lines for depth */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
      </motion.div>
      
      {/* Enhanced 3D Globe Effect with improved gradient */}
      <div 
        className="absolute w-[140vw] h-[140vw] md:w-[800px] md:h-[800px] rounded-full 
                  bg-gradient-to-r from-blue-400/15 via-cyan-400/15 to-blue-500/10 
                  opacity-75 blur-md transition-all duration-300"
        style={{ 
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          transform: 'translateZ(0) rotateX(10deg)'
        }}
      >
        {/* Enhanced world map overlay on globe with better opacity */}
        <div className="absolute inset-0 rounded-full overflow-hidden bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-center bg-no-repeat bg-contain opacity-40" />
        
        {/* Subtle pulse animation for the globe */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-blue-400/5"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Content with improved transitions */}
      <motion.div
        className="relative z-20 text-center w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent"
          animate={{ 
            textShadow: [
              "0 0 10px rgba(59, 130, 246, 0.2)",
              "0 0 20px rgba(59, 130, 246, 0.4)",
              "0 0 10px rgba(59, 130, 246, 0.2)",
            ]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          GlobeTrekker
        </motion.h1>
        
        <motion.p className="text-xl md:text-2xl text-gray-700 mb-10 font-light">
          {loading ? (
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Loading global data...
            </motion.span>
          ) : (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Discover the world's {countryStats.total} countries with comprehensive data
            </motion.span>
          )}
        </motion.p>
        
        {/* Improved Search Component container with better positioning */}
        <motion.div 
          className="relative z-50 w-full max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="relative">
            <SearchComponent 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchResults={searchResults}
              isSearching={isSearching}
            />
            {/* Search Results Container with improved styling */}
            <div className="absolute left-0 right-0 mt-2 mb-8 landscape:max-h-[40vh] portrait:max-h-[60vh] overflow-y-auto 
                           bg-white/80 backdrop-blur-md rounded-lg shadow-lg">
              {/* SearchResults component will render here */}
            </div>
          </div>
        </motion.div>
        
        {/* Enhanced CTA buttons with staggered animation */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
            >
              Start Exploring
            </motion.button>
          </Link>
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="w-full sm:w-auto px-8 py-3.5 bg-white/90 backdrop-blur-sm text-blue-600 border-2 border-blue-200 rounded-full text-lg font-semibold shadow-sm hover:shadow-md transition-all duration-300"
            >
              Sign In
            </motion.button>
          </Link>
        </motion.div>
        
        {/* Enhanced Features Pills with improved animation */}
        <motion.div
          className="mt-14 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          {['Flags', 'Maps', 'Capitals', 'Languages', 'Demographics', 'Currencies'].map((feature, i) => (
            <motion.div 
              key={feature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
              className="px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-blue-600 shadow-sm border border-blue-100"
            >
              {feature}
            </motion.div>
          ))}
        </motion.div>
        
        {/* Improved scroll indicator with better animation */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-sm text-gray-600 font-medium mb-2">Scroll to explore</p>
          <motion.svg 
            className="w-6 h-6 text-blue-500 mx-auto"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;