import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const GlobeControls = ({ globeRef, onCountrySelect, selectedCountry }) => {
  const [isRotating, setIsRotating] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(0.5);
  
  // Toggle auto rotation
  const toggleRotation = () => {
    setIsRotating(!isRotating);
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = !isRotating;
    }
  };
  
  // Zoom controls
  const handleZoom = (delta) => {
    if (!globeRef.current) return;
    
    const controls = globeRef.current.controls();
    const distance = controls.getDistance();
    
    // Calculate new altitude based on zoom direction
    const newAltitude = delta > 0 ? distance * 0.8 : distance * 1.2;
    
    // Apply zoom effect
    globeRef.current.pointOfView({ altitude: newAltitude }, 500);
  };
  
  // Reset view to default
  const resetView = () => {
    if (!globeRef.current) return;
    
    globeRef.current.pointOfView({
      lat: 20,
      lng: 0,
      altitude: 2.5
    }, 1000);
    
    setIsRotating(true);
    globeRef.current.controls().autoRotate = true;
  };
  
  // Focus on current location
  const focusOnCurrentLocation = () => {
    if (!globeRef.current) return;
    
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        
        globeRef.current.pointOfView({
          lat: latitude,
          lng: longitude,
          altitude: 1.5
        }, 1000);
        
        // Disable rotation when focusing on location
        setIsRotating(false);
        globeRef.current.controls().autoRotate = false;
      },
      error => {
        console.error("Error getting location:", error.message);
        alert("Couldn't access your location. Check browser permissions.");
      }
    );
  };
  
  // Focus on selected country
  const focusOnSelectedCountry = () => {
    if (!globeRef.current || !selectedCountry?.latlng) return;
    
    const [lat, lng] = selectedCountry.latlng;
    globeRef.current.pointOfView({
      lat,
      lng,
      altitude: 1.5
    }, 1000);
  };
  
  // Update rotation state when selected country changes
  useEffect(() => {
    if (selectedCountry) {
      setIsRotating(false);
      if (globeRef.current) {
        globeRef.current.controls().autoRotate = false;
      }
    }
  }, [selectedCountry]);
  
  // Set initial controls when component mounts
  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = isRotating;
      controls.autoRotateSpeed = rotationSpeed;
    }
  }, []);
  
  return (
    <motion.div
      className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-40"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      {/* Zoom In */}
      <motion.button
        className="w-12 h-12 bg-black/80 backdrop-blur-md text-white rounded-full 
                 shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleZoom(1)}
        title="Zoom In"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </motion.button>
      
      {/* Zoom Out */}
      <motion.button
        className="w-12 h-12 bg-black/80 backdrop-blur-md text-white rounded-full 
                 shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleZoom(-1)}
        title="Zoom Out"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
        </svg>
      </motion.button>
      
      {/* Auto Rotation Toggle */}
      <motion.button
        className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center 
                  ${isRotating ? 'bg-blue-600 text-white' : 'bg-black/80 backdrop-blur-md text-white hover:bg-blue-600'} 
                  transition-colors`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleRotation}
        title="Toggle Auto-Rotate"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </motion.button>
      
      {/* Current Location */}
      <motion.button
        className="w-12 h-12 bg-black/80 backdrop-blur-md text-white rounded-full 
                 shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={focusOnCurrentLocation}
        title="Go to Current Location"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </motion.button>
      
      {/* Reset View */}
      <motion.button
        className="w-12 h-12 bg-black/80 backdrop-blur-md text-white rounded-full 
                 shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={resetView}
        title="Reset View"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M3 12a9 9 0 1018 0 9 9 0 00-18 0z" />
        </svg>
      </motion.button>
      
      {/* Focus Selected Country (only visible when a country is selected) */}
      {selectedCountry && (
        <motion.button
          className="w-12 h-12 bg-blue-600 text-white rounded-full 
                   shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={focusOnSelectedCountry}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          title={`Focus on ${selectedCountry.name.common}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </motion.button>
      )}
    </motion.div>
  );
};

export default GlobeControls;