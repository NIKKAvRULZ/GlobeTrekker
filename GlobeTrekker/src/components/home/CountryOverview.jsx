import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlobeComponent from "../globe/GlobeComponent";
import GlobeControls from "../globe/GlobeControls";
import CountryInfoPanel from "../globe/CountryInfoPanel";
import SearchComponent from "../globe/SearchComponent";
import FlagPin from "../globe/FlagPin";
import '../globe/styles.css'; // Assuming you have a CSS file for styles

const CountryOverview = ({ countryData, loading }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const globeRef = useRef();

  const markers = useMemo(() => {
    return countryData?.map(country => ({
      ...country,
      lat: country.latlng?.[0],
      lng: country.latlng?.[1],
      size: 1,
      color: 'transparent',
      flagUrl: country.flags.svg,
    })) || [];
  }, [countryData]);

  const handleCountryClick = (marker) => {
    setSelectedCountry(marker);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    const results = countryData?.filter(country => 
      country.name.common.toLowerCase().includes(term.toLowerCase()) ||
      country.capital?.[0]?.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results || []);
  };

  const focusOnCountry = (country) => {
    setSelectedCountry(country);
    setSearchTerm("");
    setSearchResults([]);
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
    <div className="relative h-screen w-full overflow-hidden">
      {/* Container for the Globe with centered positioning */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          <GlobeComponent
            globeRef={globeRef}
            markers={markers}
            handleCountryClick={handleCountryClick}
            selectedCountry={selectedCountry}
          />
        </div>
      </div>

      {/* Search bar with fixed positioning */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
        <SearchComponent 
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          searchResults={searchResults}
          onCountrySelect={focusOnCountry}
        />
      </div>

      {/* Controls with fixed positioning */}
      <div className="fixed bottom-8 right-8 z-50">
        <GlobeControls 
          globeRef={globeRef}
          selectedCountry={selectedCountry}
          onCountrySelect={handleCountryClick}
        />
      </div>

      {/* Country Info Panel with fixed positioning */}
      <AnimatePresence>
        {selectedCountry && (
          <div className="fixed top-4 left-4 z-50">
            <CountryInfoPanel 
              country={selectedCountry}
              onClose={() => setSelectedCountry(null)}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountryOverview;