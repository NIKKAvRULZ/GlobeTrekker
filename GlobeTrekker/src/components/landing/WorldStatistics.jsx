import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const WorldStatistics = ({ loading, countryStats }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">World at a Glance</h2>
          <p className="text-gray-600">Fascinating statistics about our planet</p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Countries", value: loading ? "..." : countryStats.total },
            { label: "Continents", value: loading ? "..." : countryStats.continents.length },
            { label: "Languages", value: "2,000+" },
            { label: "Global Population", value: loading ? "..." : `${Math.round(countryStats.population / 1000000000)}B+` }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <motion.div 
                className="text-4xl font-bold text-blue-600 mb-1"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                {stat.value}
              </motion.div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="relative h-80 mt-12 rounded-xl overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90" />
          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-center bg-no-repeat bg-contain opacity-10" />
          <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
            <h3 className="text-3xl font-bold mb-4 text-center">Ready to explore the world?</h3>
            <p className="text-lg mb-8 text-center max-w-xl">
              Sign up now to access detailed information about every country on Earth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-blue-600 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-50 transition"
                >
                  Sign Up Now
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-blue-500/30 backdrop-blur-sm text-white border border-white/30 rounded-full text-lg font-semibold hover:bg-blue-500/40 transition"
                >
                  Log In
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorldStatistics;