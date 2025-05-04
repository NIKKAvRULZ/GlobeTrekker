import { useState, useEffect, useMemo, useRef } from "react";
import GlobeComponent from "../globe/GlobeComponent";
import CountryInfoPanel from "../globe/CountryInfoPanel";
import SearchComponent from "../globe/SearchComponent";
import GlobeControls from "../globe/GlobeControls";
import '../globe/styles.css';

const CountryOverview = ({ countryData, loading }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const globeRef = useRef();

  const markers = useMemo(() => {
    if (!countryData) return [];
    return countryData.map(country => ({
      ...country,
      lat: country.latlng?.[0],
      lng: country.latlng?.[1]
    })).filter(country => country.lat && country.lng);
  }, [countryData]);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
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
    setSearchResults(results?.slice(0, 5) || []);
  };

  const focusOnCountry = (country) => {
    // Set selected country to show the pin
    setSelectedCountry(country);
    
    // Animate globe to focus on the selected country
    if (globeRef.current && country?.latlng) {
      // Stop auto-rotation
      globeRef.current.controls().autoRotate = false;
      
      // Focus on the country with animation
      globeRef.current.pointOfView({
        lat: country.latlng[0],
        lng: country.latlng[1],
        altitude: 1.5
      }, 1000);
    }
    
    // Clear search
    setSearchTerm("");
    setSearchResults([]);
  };

  // Set up initial controls
  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.enableZoom = true;
      controls.zoomSpeed = 1.0;
      controls.enableDamping = true;
      controls.dampingFactor = 0.1;
      controls.rotateSpeed = 0.7;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
    }
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <GlobeComponent
        globeRef={globeRef}
        markers={markers}
        handleCountryClick={handleCountryClick}
        selectedCountry={selectedCountry}
      />
      
      <SearchComponent 
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        searchResults={searchResults}
        onCountrySelect={focusOnCountry}
      />
      
      <GlobeControls 
        globeRef={globeRef}
        selectedCountry={selectedCountry}
        onCountrySelect={handleCountryClick}
      />

      {selectedCountry && (
        <CountryInfoPanel 
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </div>
  );
};

export default CountryOverview;