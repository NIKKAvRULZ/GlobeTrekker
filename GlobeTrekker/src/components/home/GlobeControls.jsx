import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const GlobeControls = ({ globeRef, onCountrySelect, selectedCountry }) => {
  const [isRotating, setIsRotating] = useState(true);

  const handleZoom = (delta) => {
    const distance = globeRef.current.controls().getDistance();
    globeRef.current.pointOfView({ altitude: delta > 0 ? distance * 0.8 : distance * 1.2 });
  };

  const toggleRotation = () => {
    setIsRotating(!isRotating);
    globeRef.current.controls().autoRotate = !isRotating;
  };

  const focusOnCountry = () => {
    if (selectedCountry && selectedCountry.latlng) {
      const [lat, lng] = selectedCountry.latlng;
      globeRef.current.pointOfView({
        lat,
        lng,
        altitude: 1.5
      }, 1000);
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      focusOnCountry();
      setIsRotating(false);
      globeRef.current.controls().autoRotate = false;
    }
  }, [selectedCountry]);

  return (
    <motion.div
      className="absolute bottom-8 right-8 flex flex-col gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {/* Zoom Controls */}
      <motion.button
        className="p-3 bg-white/80 rounded-full shadow-lg hover:bg-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleZoom(1)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </motion.button>
      <motion.button
        className="p-3 bg-white/80 rounded-full shadow-lg hover:bg-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleZoom(-1)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
        </svg>
      </motion.button>

      {/* Rotation Toggle */}
      <motion.button
        className={`p-3 rounded-full shadow-lg ${isRotating ? 'bg-blue-500 text-white' : 'bg-white/80'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleRotation}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </motion.button>

      {/* Reset View */}
      <motion.button
        className="p-3 bg-white/80 rounded-full shadow-lg hover:bg-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          globeRef.current.pointOfView({ lat: 0, lng: 0, altitude: 2.5 }, 1000);
          setIsRotating(true);
          globeRef.current.controls().autoRotate = true;
        }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </motion.button>
    </motion.div>
  );
};

export default GlobeControls;