import { useRef, useEffect, useState, useMemo } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

const GlobeComponent = ({ 
  globeRef, 
  markers, 
  handleCountryClick, 
  selectedCountry,
}) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  // Force re-render of HTML elements when selected country changes
  const [key, setKey] = useState(0);
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  
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

  // Update when selected country changes
  useEffect(() => {
    if (selectedCountry) {
      setKey(prevKey => prevKey + 1);
      
      // This will force the animation to re-render when country changes
      setIsSearchTriggered(true);
      
      // Animate to the selected country
      if (globeRef.current && selectedCountry.latlng) {
        const [lat, lng] = selectedCountry.latlng;
        
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
  }, [selectedCountry]);

  return (
    <div className="globe-wrapper">
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
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
        pointRadius={0.5}
        pointColor={() => 'rgba(255, 255, 255, 0.8)'}
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
        
        // Enhanced atmosphere
        atmosphereColor="#4B91F7"
        atmosphereAltitude={0.25}
        atmosphereGlow={5}
      />
    </div>
  );
};

export default GlobeComponent;