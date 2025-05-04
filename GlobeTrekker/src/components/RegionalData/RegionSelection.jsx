import { motion } from "framer-motion";

const RegionSelection = ({ regions, selectedRegion, setSelectedRegion, getRegionIcon }) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-hide">
      {regions.map((region, index) => {
        const IconComponent = getRegionIcon(region);
        return (
          <motion.button
            key={region}
            className={`px-6 py-2 rounded-full whitespace-nowrap ${
              selectedRegion === region
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white/80 text-gray-600 hover:bg-blue-50 shadow'
            } transition-colors duration-200`}
            onClick={() => setSelectedRegion(region)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <span className="flex items-center gap-2">
              <IconComponent /> {/* Use it as a component */}
              {region}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default RegionSelection;