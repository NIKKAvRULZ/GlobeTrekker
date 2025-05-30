import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const FeaturedCountries = () => {
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchWeather = async (capital) => {
    try {
      const data = await api.getWeatherData(capital);
      setWeather(prev => ({
        ...prev,
        [capital]: data
      }));
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  useEffect(() => {
    const fetchFeaturedCountries = async () => {
      try {
        const featured = ['USA', 'Japan', 'France', 'Brazil', 'Australia', 'Egypt'];
        const promises = featured.map(country => 
          api.countries.search(country).then(data => data[0])
        );
        const results = await Promise.all(promises);
        setCountries(results);
        
        // Fetch weather for each capital
        results.forEach(country => {
          if (country.capital?.[0]) {
            fetchWeather(country.capital[0]);
          }
        });
      } catch (error) {
        console.error('Error fetching featured countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCountries();
  }, []);

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <section className="py-20 px-4 bg-white/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Featured Countries</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore these fascinating destinations and discover what makes them unique.</p>
        </motion.div>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countries.slice(0, 6).map((country, index) => (
              <motion.div
                key={country.cca3}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative h-48">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img 
                      src={country.flags.svg} 
                      alt={`Flag of ${country.name.common}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </motion.div>
                  <motion.div 
                    className="absolute bottom-0 w-full p-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-white text-2xl font-bold">{country.name.common}</h3>
                    <div className="flex items-center text-white/90 text-sm space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>{country.capital?.[0] || 'N/A'}</span>
                    </div>
                  </motion.div>
                </div>
                <div className="p-6 relative z-10">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: "🌍", label: "Region", value: country.region },
                      { icon: "👥", label: "Population", value: formatNumber(country.population) },
                      { icon: "🗣", label: "Languages", value: country.languages ? Object.values(country.languages).slice(0, 2).join(', ') : 'N/A' },
                      { icon: "💰", label: "Currency", value: country.currencies ? Object.values(country.currencies)[0].name : 'N/A' }
                    ].map((detail, i) => (
                      <motion.div
                        key={detail.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        className="group cursor-pointer"
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-lg">{detail.icon}</span>
                          <p className="text-sm font-medium text-blue-600">{detail.label}</p>
                        </div>
                        <p className="text-gray-800 font-medium truncate group-hover:text-blue-600 transition-colors">
                          {detail.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                  {weather[country.capital?.[0]] && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg shadow-sm">
                      <h4 className="text-blue-600 font-medium">Weather in {country.capital?.[0]}</h4>
                      <p className="text-gray-700 text-sm">Temperature: {weather[country.capital[0]].temperature}°C</p>
                      <p className="text-gray-700 text-sm">Condition: {weather[country.capital[0]].condition}</p>
                    </div>
                  )}
                  <motion.button
                    className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-medium 
                              transform transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>Explore Details</span>
                      <motion.svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </motion.svg>
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition shadow-lg"
            >
              Explore All {!loading && countries.length} Countries
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCountries;