import { motion } from "framer-motion";

const CountryOverview = ({ countryData, loading }) => {
  if (loading) return <div>Loading...</div>;

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h2 className="text-2xl font-bold mb-6">Country Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {countryData?.slice(0, 6).map((country) => (
              <motion.div
                key={country.cca3}
                className="bg-white rounded-lg shadow p-4"
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src={country.flags.svg} 
                  alt={`Flag of ${country.name.common}`}
                  className="w-full h-32 object-cover rounded mb-4"
                />
                <h3 className="font-bold text-lg mb-2">{country.name.common}</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Capital:</span> {country.capital?.[0]}</p>
                  <p><span className="font-medium">Region:</span> {country.region}</p>
                  <p><span className="font-medium">Population:</span> {country.population.toLocaleString()}</p>
                  <p><span className="font-medium">Languages:</span> {Object.values(country.languages || {}).join(', ')}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CountryOverview;