import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import GlobalStatsCards from "../GlobalStatistics/GlobalStatsCards";
import DetailedStatsModal from "../GlobalStatistics/DetailedStatsModal";

const GlobalStatistics = ({ data }) => {
  const [showDetailedStats, setShowDetailedStats] = useState(false);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-700 to-indigo-900 relative overflow-hidden">
      {/* Background animations... */}
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        {/* Existing background animations */}
      </div>

      {/* Globe lines animation in background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-10">
        {/* Existing globe animations */}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            World Statistics at a Glance
          </motion.h2>
          <motion.p 
            className="text-xl text-blue-200 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Explore fascinating global data about countries, populations, languages and more.
          </motion.p>
        </motion.div>

        <GlobalStatsCards data={data} />
        
        <motion.button
          className="mt-16 mx-auto flex items-center gap-2 px-8 py-4 bg-white text-blue-900 rounded-full font-medium text-lg shadow-lg shadow-blue-900/20 group relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          onClick={() => setShowDetailedStats(true)}
        >
          <span className="relative z-10">Explore Detailed Statistics</span>
          <motion.span 
            className="absolute inset-0 bg-gradient-to-r from-blue-300 to-teal-200"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ type: "tween" }}
          />
          <motion.span 
            className="relative z-10"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.button>
      </div>

      <AnimatePresence>
        {showDetailedStats && (
          <DetailedStatsModal 
            data={data} 
            onClose={() => setShowDetailedStats(false)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default GlobalStatistics;