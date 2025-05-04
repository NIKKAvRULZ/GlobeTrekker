import { motion } from "framer-motion";
import { useState } from "react"; // Add this import
import { FaGlobeAmericas, FaUsers, FaLanguage, FaMapMarkedAlt } from "react-icons/fa";
import CountUp from 'react-countup';
import { getGlobalStats } from "./utils/statsUtils";

const GlobalStatsCards = ({ data }) => {
  // Now useState will be defined
  const [hoveredStat, setHoveredStat] = useState(null);
  const stats = getGlobalStats(data);

  const statsData = [
    {
      id: 'countries',
      title: 'Countries',
      value: stats?.totalCountries,
      icon: <FaGlobeAmericas className="text-3xl" />,
      color: 'bg-blue-500'
    },
    {
      id: 'population',
      title: 'Population',
      value: stats?.totalPopulation,
      icon: <FaUsers className="text-3xl" />,
      color: 'bg-green-500'
    },
    {
      id: 'languages',
      title: 'Languages',
      value: stats?.totalLanguages,
      icon: <FaLanguage className="text-3xl" />,
      color: 'bg-purple-500'
    },
    {
      id: 'regions',
      title: 'Regions',
      value: stats?.totalRegions,
      icon: <FaMapMarkedAlt className="text-3xl" />,
      color: 'bg-amber-500'
    }
  ];

  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {statsData.map((stat) => (
        <motion.div
          key={stat.id}
          className={`${stat.color} rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group`}
          onHoverStart={() => setHoveredStat(stat.id)}
          onHoverEnd={() => setHoveredStat(null)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="absolute inset-0 bg-black/10"
            animate={{ opacity: hoveredStat === stat.id ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-lg font-medium opacity-90">{stat.title}</p>
                <h3 className="text-3xl font-bold mt-2">
                  {stat.value ? (
                    <CountUp 
                      end={stat.value} 
                      duration={2.5} 
                      separator=","
                    />
                  ) : (
                    '--'
                  )}
                </h3>
              </div>
              <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                {stat.icon}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GlobalStatsCards;