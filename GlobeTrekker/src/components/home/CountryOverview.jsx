import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useMemo } from "react";
import Globe from 'react-globe.gl';
import * as d3 from 'd3';
import GlobeControls from './GlobeControls';

const CountryOverview = ({ countryData, loading }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [globeData, setGlobeData] = useState({ features: [] });
  const globeRef = useRef();
  const [highlightedPolygon, setHighlightedPolygon] = useState(null);

  // Convert country data to markers format
  const markers = useMemo(() => {
    return countryData?.map(country => ({
      ...country,
      lat: country.latlng?.[0],
      lng: country.latlng?.[1],
      size: 20,
      color: 'rgba(59, 130, 246, 0.8)',
    })) || [];
  }, [countryData]);

  useEffect(() => {
    // Load your GeoJSON data
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(world => {
        setGlobeData(world);
        if (globeRef.current) {
          globeRef.current.controls().enableZoom = true;
          globeRef.current.controls().autoRotate = true;
          globeRef.current.controls().autoRotateSpeed = 0.5;
        }
      });
  }, []);

  const handleCountryClick = (marker) => {
    setSelectedCountry(marker);
    if (marker.latlng) {
      globeRef.current.pointOfView({
        lat: marker.latlng[0],
        lng: marker.latlng[1],
        altitude: 1.5
      }, 1000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={markers}
        pointAltitude={0.01}
        pointRadius="size"
        pointColor="color"
        pointLabel={marker => `
          <div class="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 text-sm">
            <div class="flex items-center gap-2">
              <img src="${marker.flags.svg}" alt="${marker.name.common} flag" class="w-6 h-4 object-cover rounded" />
              <b>${marker.name.common}</b>
            </div>
            <div class="text-gray-600 mt-1">${marker.capital?.[0] || ''}</div>
          </div>
        `}
        onPointClick={handleCountryClick}
        pointsMerge={false}
        atmosphereColor="rgba(59, 130, 246, 0.3)"
        atmosphereAltitude={0.1}
      />

      <GlobeControls 
        globeRef={globeRef}
        selectedCountry={selectedCountry}
        onCountrySelect={handleCountryClick}
      />

      {/* Enhanced Country Info Overlay */}
      <AnimatePresence>
        {selectedCountry && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-md"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedCountry.flags.svg}
                alt={`${selectedCountry.name.common} flag`}
                className="w-20 h-12 object-cover rounded-md shadow-md"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedCountry.name.common}</h2>
                <p className="text-gray-600">{selectedCountry.capital?.[0]}</p>
              </div>
            </div>

            {/* Additional Country Details */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-500">Population</p>
                <p className="font-medium">{selectedCountry.population.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Region</p>
                <p className="font-medium">{selectedCountry.region}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Languages</p>
                <p className="font-medium">
                  {selectedCountry.languages ? 
                    Object.values(selectedCountry.languages).join(', ') : 
                    'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Currency</p>
                <p className="font-medium">
                  {selectedCountry.currencies ?
                    Object.values(selectedCountry.currencies)
                      .map(curr => `${curr.name} (${curr.symbol})`)
                      .join(', ') :
                    'N/A'}
                </p>
              </div>
            </div>

            {/* View More Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-green-500 
                         text-white rounded-lg font-medium shadow-lg"
              onClick={() => {
                // Add your navigation or detailed view logic here
              }}
            >
              View Detailed Information
            </motion.button>
            
            <button
              onClick={() => setSelectedCountry(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountryOverview;