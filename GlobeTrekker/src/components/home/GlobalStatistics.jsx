import { motion } from "framer-motion";

const GlobalStatistics = ({ data }) => {
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

  return (
    <section className="py-16 px-4 bg-blue-600">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-white mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Global Statistics
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: "Total Countries", value: stats?.totalCountries },
            { label: "Global Population", value: stats?.totalPopulation?.toLocaleString() },
            { label: "Languages", value: stats?.totalLanguages },
            { label: "Regions", value: stats?.totalRegions }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-white/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalStatistics;