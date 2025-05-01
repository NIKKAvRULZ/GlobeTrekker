import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountryOverview from "../components/home/CountryOverview";
import GlobalStatistics from "../components/home/GlobalStatistics";
import RegionalData from "../components/home/RegionalData";
import CountryComparison from "../components/home/CountryComparison";

const HomePage = () => {
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountryData(data);
      } catch (error) {
        console.error('Error fetching country data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"
          animate={{
            background: [
              "radial-gradient(circle, rgba(59,130,246,0.05) 0%, rgba(147,51,234,0.05) 100%)",
              "radial-gradient(circle, rgba(147,51,234,0.05) 0%, rgba(59,130,246,0.05) 100%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        <CountryOverview countryData={countryData} loading={loading} />
        <GlobalStatistics data={countryData} />
        <RegionalData 
          data={countryData} 
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />
        <CountryComparison data={countryData} />

      </div>

      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="sr-only">Quick Navigation</span>
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </motion.button>
    </motion.div>
  );
};

export default HomePage;