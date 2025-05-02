import { motion } from 'framer-motion';

const GeographyTab = ({ country }) => {
  return (
    <div className="space-y-6">
      <motion.div 
        className="bg-indigo-50 p-4 rounded-lg border border-indigo-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-lg font-semibold text-indigo-700 mb-2">Geographic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Region</p>
            <p className="font-medium">{country.region || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Subregion</p>
            <p className="font-medium">{country.subregion || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Area</p>
            <p className="font-medium">{country?.area?.toLocaleString() || "N/A"} km²</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Bordering Countries</p>
            <p className="font-medium">
              {country.borders?.length 
                ? `${country.borders.length} countries` 
                : "Island nation"}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="bg-purple-50 p-4 rounded-lg border border-purple-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-purple-700 mb-2">Climate & Timezone</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Timezones</p>
            <p className="font-medium">{country?.timezones?.join(", ") || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Coordinates</p>
            <p className="font-medium">
              Lat: {country.latlng?.[0] || "N/A"}, 
              Lng: {country.latlng?.[1] || "N/A"}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GeographyTab;