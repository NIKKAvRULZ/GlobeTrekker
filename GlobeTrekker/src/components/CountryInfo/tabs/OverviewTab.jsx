import { motion } from 'framer-motion';
import { FaGlobe, FaUsers, FaLanguage, FaMoneyBillWave, FaMapMarkedAlt, FaClock, FaPhone } from 'react-icons/fa';

const OverviewTab = ({ country }) => {
  const detailedInfo = [
    { label: "Official Name", value: country?.name.official, icon: <FaGlobe /> },
    { label: "Capital", value: country?.capital?.[0], icon: <FaMapMarkedAlt /> },
    { label: "Region", value: country?.region, icon: <FaGlobe /> },
    { label: "Subregion", value: country?.subregion, icon: <FaGlobe /> },
    { label: "Population", value: country?.population?.toLocaleString(), icon: <FaUsers /> },
    { label: "Languages", value: country?.languages ? Object.values(country.languages).join(", ") : "N/A", icon: <FaLanguage /> },
    { label: "Currencies", value: country?.currencies ? 
      Object.values(country.currencies)
        .map(curr => `${curr.name} (${curr.symbol})`)
        .join(", ") : "N/A",
      icon: <FaMoneyBillWave />     
    },
    { label: "Area", value: `${country?.area?.toLocaleString()} km²`, icon: <FaMapMarkedAlt /> },
    { label: "Timezone(s)", value: country?.timezones?.join(", "), icon: <FaClock /> },
    { label: "Calling Code", value: country?.idd?.root + (country?.idd?.suffixes?.[0] || ""), icon: <FaPhone /> }
  ];

  return (
    <>
      <div className="relative">
        <motion.img
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          className="w-full h-40 object-cover rounded-lg shadow-md"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        {country.coatOfArms?.svg && (
          <motion.div
            className="absolute -bottom-8 right-4 bg-white p-2 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <img 
              src={country.coatOfArms.svg} 
              alt="Coat of Arms" 
              className="h-16 w-16 object-contain"
            />
          </motion.div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {detailedInfo.slice(0, 6).map(({ label, value, icon }, index) => (
          <motion.div 
            key={label} 
            className="bg-gray-50 rounded-lg p-4 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-2 text-indigo-600 mb-1">
              {icon}
              <div className="text-sm font-medium">{label}</div>
            </div>
            <div className="text-gray-900 font-medium">{value || "N/A"}</div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default OverviewTab;