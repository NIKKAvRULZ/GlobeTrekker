import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import { gsap } from 'gsap';

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

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle country selection and camera animation
  useEffect(() => {
    if (globeRef.current && selectedCountry?.latlng) {
      const [lat, lng] = selectedCountry.latlng;
      
      // Stop auto-rotation and center on country
      globeRef.current.controls().autoRotate = false;
      
      globeRef.current.pointOfView({
        lat,
        lng,
        altitude: 2.5
      }, 1000);
    }
  }, [selectedCountry]);

  const customThreeObject = useCallback((d) => {
    if (!d.isSelected) return null;

    const group = new THREE.Group();

    // Create pin
    const pin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0, 8, 16),
      new THREE.MeshPhongMaterial({ color: '#4B91F7' })
    );
    pin.position.y = 4;
    group.add(pin);

    return group;
  }, []);

  return (
    <div className="globe-wrapper">
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        backgroundColor="rgba(5, 8, 29, 1)"
        
        // Points for all countries
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
        
        // HTML elements for selected country
        htmlElementsData={selectedCountry ? [selectedCountry] : []}
        htmlElement={d => {
          const el = document.createElement('div');
          el.innerHTML = `
            <div class="selected-marker">
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