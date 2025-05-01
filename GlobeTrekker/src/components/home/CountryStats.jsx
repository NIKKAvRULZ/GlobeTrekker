import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const CountryStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Fetch country statistics
    // Add your API call here
  }, []);

  return (
    <section className="py-16 px-4 bg-white/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-gray-800 mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Global Statistics
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Total Countries", value: "195" },
            { label: "Total Population", value: "7.8B" },
            { label: "Languages", value: "6,500+" },
            { label: "Time Zones", value: "24" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white/80 rounded-xl p-6 text-center shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountryStats;