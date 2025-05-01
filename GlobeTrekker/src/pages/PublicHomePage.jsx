import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';

const PublicHomePage = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('All');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await api.getAllCountries();
        setCountries(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  const filteredCountries = selectedRegion === 'All' 
    ? countries 
    : countries.filter(country => country.region === selectedRegion);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl font-bold mb-6"
            >
              Discover Our World
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl mb-8"
            >
              Explore countries, cultures, and facts from around the globe
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-x-4"
            >
              <Link
                to="/login"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Sign In for Full Access
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Region Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex overflow-x-auto gap-4 mb-8 pb-4">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-6 py-2 rounded-full whitespace-nowrap ${
                selectedRegion === region
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredCountries.map((country) => (
              <motion.div
                layout
                key={country.cca3}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={country.flags.svg}
                    alt={`${country.name.common} flag`}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{country.name.common}</h2>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>🏛️ Capital: {country.capital?.[0] || 'N/A'}</p>
                    <p>🌍 Region: {country.region}</p>
                    <p>👥 Population: {new Intl.NumberFormat().format(country.population)}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Link
                      to="/login"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Sign in to learn more →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PublicHomePage;