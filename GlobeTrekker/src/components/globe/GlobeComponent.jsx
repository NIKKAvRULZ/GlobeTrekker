import { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';

const GlobeComponent = ({ 
  globeRef, 
  markers, 
  handleCountryClick, 
  selectedCountry,
  atmosphereColor = "rgba(59, 130, 246, 0.3)"
}) => {
  const [defaultPins] = useState([
    { lat: 51.5074, lng: -0.1278, name: "London", country: "United Kingdom" },
    { lat: 40.7128, lng: -74.0060, name: "New York", country: "United States" },
    { lat: 35.6762, lng: 139.6503, name: "Tokyo", country: "Japan" },
    { lat: 28.6139, lng: 77.2090, name: "New Delhi", country: "India" },
    { lat: -33.8688, lng: 151.2093, name: "Sydney", country: "Australia" },
    { lat: 55.7558, lng: 37.6173, name: "Moscow", country: "Russia" },
    { lat: -1.2921, lng: 36.8219, name: "Nairobi", country: "Kenya" },
    { lat: -15.7975, lng: -47.8919, name: "Brasília", country: "Brazil" },
    { lat: 30.0444, lng: 31.2357, name: "Cairo", country: "Egypt" },
    { lat: 39.9042, lng: 116.4074, name: "Beijing", country: "China" }
  ]);

  useEffect(() => {
    if (globeRef.current) {
      // Center the globe initially
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 });
      
      // Adjust controls
      const controls = globeRef.current.controls();
      controls.enableZoom = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enablePan = true;
      controls.minDistance = 200;
      controls.maxDistance = 400;
      controls.maxPolarAngle = Math.PI * 0.85;
    }
  }, []);

  useEffect(() => {
    if (globeRef.current && selectedCountry?.latlng) {
      globeRef.current.pointOfView({
        lat: selectedCountry.latlng[0],
        lng: selectedCountry.latlng[1],
        altitude: 1.5
      }, 1000);
    }
  }, [selectedCountry, globeRef]);

  return (
    <Globe
      ref={globeRef}
      width={window.innerWidth}
      height={window.innerHeight}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      pointsData={[...markers, ...defaultPins.map(pin => ({
        ...pin,
        size: 1.2,
        color: 'transparent',
        highlighted: true
      }))]}
      pointAltitude={0.05}
      pointRadius="size"
      pointColor="color"
      htmlElement={marker => {
        const el = document.createElement('div');
        const isDefaultPin = defaultPins.some(pin => 
          pin.lat === marker.lat && pin.lng === marker.lng
        );

        el.innerHTML = `
          <div class="flag-pin-wrapper ${isDefaultPin ? 'default-pin' : ''}">
            <div class="pin-pulse"></div>
            <div class="pin-stem"></div>
            <div class="pin-flag">
              ${isDefaultPin ? `
                <div class="default-pin-label">
                  ${marker.name}
                </div>
              ` : `
                <img src="${marker.flagUrl}" alt="${marker.name?.common || marker.country} flag" />
              `}
            </div>
          </div>
        `;
        return el;
      }}
      pointLabel={marker => `
        <div class="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-2 text-sm">
          ${marker.name?.common || marker.name}
          <div class="text-gray-600">
            ${marker.capital?.[0] || marker.country || ''}
          </div>
        </div>
      `}
      onPointClick={handleCountryClick}
      atmosphereColor={atmosphereColor}
      atmosphereAltitude={0.1}
    />
  );
};

export default GlobeComponent;