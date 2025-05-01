import { motion, AnimatePresence } from 'framer-motion';
import { memo, useState } from 'react';

const CountryInfoPanel = memo(({ country, onClose }) => {
  const [showDetails, setShowDetails] = useState(false);

  const detailedInfo = [
    { label: "Official Name", value: country?.name.official },
    { label: "Capital", value: country?.capital?.[0] },
    { label: "Region", value: country?.region },
    { label: "Subregion", value: country?.subregion },
    { label: "Population", value: country?.population?.toLocaleString() },
    { label: "Languages", value: country?.languages ? Object.values(country.languages).join(", ") : "N/A" },
    { label: "Currencies", value: country?.currencies ? 
      Object.values(country.currencies)
        .map(curr => `${curr.name} (${curr.symbol})`)
        .join(", ") : "N/A"     
    },
    { label: "Area", value: `${country?.area?.toLocaleString()} km²` },
    { label: "Timezone(s)", value: country?.timezones?.join(", ") },
    { label: "Calling Code", value: country?.idd?.root + (country?.idd?.suffixes?.[0] || "") }
  ];

  return (
    <AnimatePresence>
      {country && (
        <>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl 
                   max-w-md w-full md:w-[400px] overflow-hidden z-50"
          >
            <div className="relative p-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <motion.img
                  src={country.flags.svg}
                  alt={`${country.name.common} flag`}
                  className="w-20 h-12 object-cover rounded-md shadow-md"
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-gray-800 truncate">
                    {country.name.common}
                  </h2>
                  <p className="text-gray-600 truncate">{country.capital?.[0]}</p>
                </div>
              </div>

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

              <motion.button
                onClick={() => setShowDetails(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 
                       text-white rounded-lg font-medium shadow-lg 
                       hover:shadow-blue-500/25 transition-shadow"
              >
                View Detailed Information
              </motion.button>
            </div>
          </motion.div>

          {showDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowDetails(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white px-6 py-4 border-b flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{country.name.common}</h2>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <img
                    src={country.flags.svg}
                    alt={`${country.name.common} flag`}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {detailedInfo.map(({ label, value }) => (
                      <div key={label} className="space-y-1">
                        <div className="text-sm font-medium text-gray-500">{label}</div>
                        <div className="text-gray-900">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
});

CountryInfoPanel.displayName = 'CountryInfoPanel';
export default CountryInfoPanel;