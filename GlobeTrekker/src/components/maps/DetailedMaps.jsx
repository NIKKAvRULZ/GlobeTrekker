import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import { motion } from 'framer-motion';
import api from '../../services/api';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const DetailedMaps = ({ country }) => {
  const [geoJson, setGeoJson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState([0, 0]);

  useEffect(() => {
    const fetchGeoJson = async () => {
      if (!country) return;
      
      try {
        setLoading(true);
        const geoJsonData = await api.maps.getGeoJSON(country.name.common);
        setGeoJson(geoJsonData);
        if (country.latlng) {
          setMapCenter(country.latlng);
        }
      } catch (error) {
        console.error('Error fetching map data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGeoJson();
  }, [country]);

  const mapStyle = {
    fillColor: '#3B82F6',
    weight: 2,
    opacity: 1,
    color: '#1D4ED8',
    fillOpacity: 0.3
  };

  if (loading) {
    return (
      <motion.div 
        className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="animate-pulse">Loading map...</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="h-[600px] rounded-xl overflow-hidden">
        <MapContainer
          center={mapCenter}
          zoom={4}
          className="h-full w-full"
          style={{ background: '#1F2937' }}
        >
          <TileLayer {...api.maps.getTileLayer()} />
          {geoJson && (
            <GeoJSON 
              data={geoJson} 
              style={mapStyle}
            />
          )}
          {country && (
            <Marker position={mapCenter}>
              <Popup>
                <div className="text-sm">
                  <h3 className="font-bold">{country.name.common}</h3>
                  <p>Capital: {country.capital?.[0]}</p>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </motion.div>
  );
};

export default DetailedMaps;