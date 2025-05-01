import { motion } from "framer-motion";

const CountryInfoPanel = ({ country, onClose }) => {
  if (!country) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="fixed top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl 
                 max-w-md w-full md:w-[400px] overflow-hidden"
    >
      {/* Header with flag and name */}
      <div className="relative p-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <motion.img
            src={country.flags.svg}
            alt={`${country.name.common} flag`}
            className="w-20 h-12 object-cover rounded-md shadow-md"
            whileHover={{ scale: 1.05 }}
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-gray-800 truncate">
              {country.name.common}
            </h2>
            <p className="text-gray-600 truncate">{country.capital?.[0]}</p>
          </div>
        </div>

        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 
                     rounded-full hover:bg-gray-100"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      </div>

      {/* Country details grid */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {[
            { label: "Population", value: country.population.toLocaleString() },
            { label: "Region", value: country.region },
            { label: "Languages", value: country.languages ? 
              Object.values(country.languages).join(', ') : 'N/A' },
            { label: "Currency", value: country.currencies ?
              Object.values(country.currencies)
                .map(curr => `${curr.name} (${curr.symbol})`)
                .join(', ') : 'N/A' }
          ].map(({ label, value }) => (
            <div key={label} className="min-w-0">
              <p className="text-sm font-medium text-gray-500">{label}</p>
              <p className="mt-1 text-gray-800 truncate">{value}</p>
            </div>
          ))}
        </div>

        {/* View details button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-500 
                     text-white rounded-lg font-medium shadow-lg 
                     hover:shadow-blue-500/25 transition-shadow"
        >
          View Detailed Information
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CountryInfoPanel;