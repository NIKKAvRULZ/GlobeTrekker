import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const FeatureCard = ({ title, icon, description, children }) => {
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg"
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-100 rounded-lg">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
      </div>
      <div className="mt-4">
        {children}
      </div>
    </motion.div>
  );
};

const DetailedFeatures = ({ country }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Detailed Maps */}
      <FeatureCard
        title="Interactive Map"
        icon={<span className="text-2xl">🗺️</span>}
        description="Explore detailed geographic information"
      >
        <div className="h-48 rounded-lg overflow-hidden mt-4">
          <MapContainer
            center={[country?.latlng?.[0] || 0, country?.latlng?.[1] || 0]}
            zoom={4}
            className="h-full w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
        </div>
      </FeatureCard>

      {/* Rich History */}
      <FeatureCard
        title="Historical Timeline"
        icon={<span className="text-2xl">📚</span>}
        description="Discover rich cultural heritage"
      >
        <motion.div className="space-y-3 mt-4">
          {/* Add timeline content */}
        </motion.div>
      </FeatureCard>

      {/* Live Statistics */}
      <FeatureCard
        title="Live Statistics"
        icon={<span className="text-2xl">📊</span>}
        description="Real-time country data"
      >
        {/* Add statistics content */}
      </FeatureCard>

      {/* Language Guides */}
      <FeatureCard
        title="Language Insights"
        icon={<span className="text-2xl">🗣️</span>}
        description="Explore local languages"
      >
        {/* Add language content */}
      </FeatureCard>

      {/* Currency Details */}
      <FeatureCard
        title="Currency Information"
        icon={<span className="text-2xl">💰</span>}
        description="Exchange rates and details"
      >
        {/* Add currency content */}
      </FeatureCard>

      {/* Cultural Insights */}
      <FeatureCard
        title="Cultural Heritage"
        icon={<span className="text-2xl">🎭</span>}
        description="Traditions and customs"
      >
        {/* Add cultural content */}
      </FeatureCard>
    </div>
  );
};

export default DetailedFeatures;