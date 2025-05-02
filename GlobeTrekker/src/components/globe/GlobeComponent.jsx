import { useRef, useEffect, useState, useMemo } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import './styles.css';

const GlobeComponent = ({ 
  globeRef, 
  markers, 
  handleCountryClick, 
  selectedCountry,
  searchedCountry // Add this prop to handle searched country
}) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  // Force re-render of HTML elements when selected country changes
  const [key, setKey] = useState(0);
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  const [isDayTime, setIsDayTime] = useState(true);
  const [sunPosition, setSunPosition] = useState({ lat: 0, lng: 0 });
  
  // Calculate sun position based on current time
  useEffect(() => {
    const calculateSunPosition = () => {
      const now = new Date();
      // Simple sun position calculation based on time of day
      // For accurate calculations, you would need astronomical formulas
      const hours = now.getUTCHours();
      const minutes = now.getUTCMinutes();
      
      // Convert time to longitude (24 hours = 360 degrees)
      const lng = -180 + (hours + minutes / 60) * 15;
      
      // Adjust for seasonal tilt (simplified)
      const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
      const tilt = 23.5 * Math.sin((dayOfYear - 80) / 365 * 2 * Math.PI);
      
      // Update sun position
      setSunPosition({ lat: tilt, lng });
      
      // Determine if it's daytime at the center of the view
      if (globeRef.current) {
        const pov = globeRef.current.pointOfView();
        const distanceFromDay = Math.abs((pov.lng + 180) % 360 - (lng + 180) % 360);
        setIsDayTime(distanceFromDay < 90);
      }
    };
    
    calculateSunPosition();
    const interval = setInterval(calculateSunPosition, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
      
      if (globeRef.current) {
        globeRef.current.camera().aspect = window.innerWidth / window.innerHeight;
        globeRef.current.camera().updateProjectionMatrix();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update when selected or searched country changes
  useEffect(() => {
    const countryToFocus = searchedCountry || selectedCountry;
    
    if (countryToFocus) {
      setKey(prevKey => prevKey + 1);
      
      // This will force the animation to re-render when country changes
      setIsSearchTriggered(!!searchedCountry); // Only true when it's from search
      
      // Animate to the country with animation
      if (globeRef.current && countryToFocus.latlng) {
        const [lat, lng] = countryToFocus.latlng;
        
        // Stop auto-rotation
        globeRef.current.controls().autoRotate = false;
        
        // Focus on the country with animation
        globeRef.current.pointOfView({
          lat,
          lng,
          altitude: 1.5
        }, 1000);
      }
    }
  }, [selectedCountry, searchedCountry]);

  // Prepare highlighted points for searched country
  const highlightedPoints = useMemo(() => {
    if (!searchedCountry) return [];
    
    const [lat, lng] = searchedCountry.latlng || [0, 0];
    
    // Create a series of rings around the searched country
    return [
      { lat, lng, altitude: 0.01, radius: 2, color: 'rgba(255, 215, 0, 0.9)' },
      { lat, lng, altitude: 0.01, radius: 1.5, color: 'rgba(255, 215, 0, 0.7)' },
      { lat, lng, altitude: 0.01, radius: 1, color: 'rgba(255, 215, 0, 1)' }
    ];
  }, [searchedCountry]);

  // Globe controls component
  const GlobeControls = () => (
    <div className="globe-controls">
      <button 
        className="globe-control-btn" 
        title="Zoom In"
        onClick={() => {
          if (globeRef.current) {
            const controls = globeRef.current.controls();
            const newDistance = controls.getDistance() * 0.8;
            controls.dollyIn(1.25);
            controls.update();
          }
        }}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12M6 12h12" />
        </svg>
      </button>
      
      <button 
        className="globe-control-btn" 
        title="Zoom Out"
        onClick={() => {
          if (globeRef.current) {
            const controls = globeRef.current.controls();
            const newDistance = controls.getDistance() * 1.2;
            controls.dollyOut(1.25);
            controls.update();
          }
        }}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12h12" />
        </svg>
      </button>
      
      <button 
        className="globe-control-btn" 
        title="Toggle Auto-Rotation"
        onClick={() => {
          if (globeRef.current) {
            const controls = globeRef.current.controls();
            controls.autoRotate = !controls.autoRotate;
          }
        }}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-6-6m0 0l6-6m-6 6h12" />
        </svg>
      </button>
      
      <button 
        className="globe-control-btn" 
        title="Reset View"
        onClick={() => {
          if (globeRef.current) {
            globeRef.current.pointOfView({
              lat: 20,
              lng: 0,
              altitude: 2.5
            }, 1000);
            
            globeRef.current.controls().autoRotate = true;
          }
        }}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>
  );
  
  // Create ring effect for searched country
  const SearchHighlighter = () => {
    if (!searchedCountry) return null;
    
    return (
      <div className="search-highlight-container">
        <div className="search-highlight-label">
          <img 
            src={searchedCountry.flags.svg} 
            alt={`${searchedCountry.name.common} flag`} 
            className="search-highlight-flag"
          />
          <span>{searchedCountry.name.common}</span>
        </div>
        <div className="search-highlight-pointer"></div>
      </div>
    );
  };

  return (
    <div className="globe-wrapper">
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl={isDayTime ? 
          "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg" : 
          "//unpkg.com/three-globe/example/img/earth-night.jpg"}
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        backgroundColor="rgba(5, 8, 29, 1)"
        
        // Globe initialization
        onGlobeReady={() => {
          if (globeRef.current) {
            const controls = globeRef.current.controls();
            controls.enableZoom = true;
            controls.zoomSpeed = 1.0;
            controls.enableDamping = true;
            controls.dampingFactor = 0.1;
            controls.rotateSpeed = 0.7;
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.5;
            controls.minDistance = 200;
            controls.maxDistance = 800;
            
            // Initial position
            globeRef.current.pointOfView({
              lat: 20,
              lng: 0,
              altitude: 2.5
            });
          }
        }}
        
        // Basic points for all countries
        pointsData={markers}
        pointAltitude={0.01}
        pointRadius={d => searchedCountry && d.cca3 === searchedCountry.cca3 ? 2.0 : 0.5}
        pointColor={d => searchedCountry && d.cca3 === searchedCountry.cca3 ? 
          'rgba(255, 215, 0, 0.9)' : 'rgba(255, 255, 255, 0.8)'}
        pointLabel={d => `
          <div class="hover-tooltip">
            <img src="${d.flags.svg}" class="hover-flag" />
            <span class="hover-name">${d.name.common}</span>
          </div>
        `}
        onPointClick={handleCountryClick}
        
        // HTML elements for selected country pin
        // Using key to force re-render when selected country changes
        key={`html-elements-${key}`}
        htmlElementsData={selectedCountry ? [selectedCountry] : []}
        htmlElement={d => {
          const el = document.createElement('div');
          
          // Create the animation class based on whether this was triggered by search
          const animationClass = isSearchTriggered ? "search-drop-animation" : "drop-animation";
          
          el.innerHTML = `
            <div class="selected-marker ${animationClass}">
              <div class="marker-pin"></div>
              <div class="marker-content">
                <div class="flag-container">
                  <img src="${d.flags.svg}" alt="${d.name.common}" />
                </div>
                <div class="country-info">
                  <span class="country-name">${d.name.common}</span>
                  <span class="country-capital">${d.capital?.[0] || ''}</span>
                </div>
              </div>
            </div>
          `;
          
          // Reset the search trigger after rendering
          setTimeout(() => {
            setIsSearchTriggered(false);
          }, 100);
          
          return el;
        }}
        htmlAltitude={1}
        
        // Rings for searched country highlight
        ringsData={searchedCountry ? [
          {
            lat: searchedCountry.latlng[0],
            lng: searchedCountry.latlng[1],
            maxR: 5,
            propagationSpeed: 3,
            repeatPeriod: 1000,
            color: 'rgba(255, 215, 0, 0.6)'
          }
        ] : []}
        ringColor="color"
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"
        
        // Enhanced atmosphere
        atmosphereColor={isDayTime ? "#4B91F7" : "#192a4d"}
        atmosphereAltitude={0.25}
        atmosphereGlow={5}
      />
      
      {/* Add Sun and Moon visualization */}
      <div 
        className="sun-visualization"
        style={{
          transform: `translate(${sunPosition.lng}px, ${sunPosition.lat}px)`
        }}
      >
        <div className="sun-glow"></div>
      </div>
      
      <div className={`moon-visualization ${!isDayTime ? 'active' : ''}`}>
        <div className="moon-glow"></div>
      </div>
      
      {/* Show search highlight if there's a searched country */}
      {searchedCountry && <SearchHighlighter />}
      
      {/* Add Globe Controls */}
      <GlobeControls />
    </div>
  );
};

export default GlobeComponent;