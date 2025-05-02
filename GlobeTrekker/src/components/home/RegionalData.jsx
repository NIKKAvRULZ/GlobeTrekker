import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import RegionSelection from "../RegionalData/RegionSelection";
import RegionCards from "../RegionalData/RegionCards";
// Fix the import by using default import instead of named import
import RegionDetailsModal from "../RegionalData/RegionDetailsModal";
import { calculateRegionalStats, getRegionColorClass, getRegionIcon } from "../RegionalData/utils/regionUtils";

const RegionalData = ({ data }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [showRegionDetails, setShowRegionDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const regionalStats = calculateRegionalStats(data);

  // Get unique regions from data
  const regions = useMemo(() => {
    if (!data) return [];
    return [...new Set(data.map(country => country.region).filter(Boolean))].sort();
  }, [data]);

  // To use the icon:
  const renderRegionIcon = (region) => {
    const IconComponent = getRegionIcon(region);
    return <IconComponent />;
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Regional Analysis</h2>
          <div className="h-1 w-24 bg-blue-500 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explore statistics and information for different regions around the world
          </p>
        </motion.div>

        <RegionSelection 
          regions={regions} 
          selectedRegion={selectedRegion} 
          setSelectedRegion={setSelectedRegion} 
          getRegionIcon={getRegionIcon}
        />

        <RegionCards 
          data={data} 
          selectedRegion={selectedRegion}
          hoveredRegion={hoveredRegion}
          setHoveredRegion={setHoveredRegion}
          setShowRegionDetails={setShowRegionDetails}
          getRegionColorClass={getRegionColorClass}
          getRegionIcon={getRegionIcon}
        />

        <AnimatePresence>
          {showRegionDetails && (
            <RegionDetailsModal 
              data={data}
              showRegionDetails={showRegionDetails}
              setShowRegionDetails={setShowRegionDetails}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setSelectedRegion={setSelectedRegion}
              getRegionColorClass={getRegionColorClass}
              getRegionIcon={getRegionIcon}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RegionalData;