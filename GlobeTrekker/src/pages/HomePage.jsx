import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CountryOverview from "../components/home/CountryOverview";
import GlobalStatistics from "../components/home/GlobalStatistics";
import RegionalData from "../components/home/RegionalData";
import CountryComparison from "../components/home/CountryComparison";

const HomePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  
  // Create refs for each section
  const overviewRef = useRef(null);
  const statsRef = useRef(null);
  const regionalRef = useRef(null);
  const comparisonRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      // Clear any local state if needed
      setCountryData(null);
      setLoading(true);
      setSelectedRegion('all');
      setSelectedCountry(null);
      // Navigate to landing page
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
  
  // Close the navigation menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navButton = document.getElementById('nav-button');
      const navMenu = document.getElementById('nav-menu');
      
      if (
        isNavMenuOpen && 
        navButton && 
        navMenu && 
        !navButton.contains(event.target) && 
        !navMenu.contains(event.target)
      ) {
        setIsNavMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNavMenuOpen]);

  // Function to scroll to a section
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      setIsNavMenuOpen(false);
      ref.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Add Logout Button in the top right corner */}
      <motion.button
        className="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
      >
        Logout
      </motion.button>

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
        <div ref={overviewRef}>
          <CountryOverview countryData={countryData} loading={loading} />
        </div>
        <div ref={statsRef}>
          <GlobalStatistics data={countryData} />
        </div>
        <div ref={regionalRef}>
          <RegionalData 
            data={countryData} 
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          />
        </div>
        <div ref={comparisonRef}>
          <CountryComparison data={countryData} />
        </div>
      </div>

      {/* Floating Action Button with Navigation Menu */}
      <motion.div className="fixed bottom-8 right-8 z-50">
        {/* Navigation Menu */}
        <AnimatePresence>
          {isNavMenuOpen && (
            <motion.div
              id="nav-menu"
              className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col w-48">
                <button 
                  onClick={() => scrollToSection(overviewRef)}
                  className="py-3 px-4 hover:bg-blue-50 text-left text-gray-700 flex items-center gap-2"
                >
                  <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Overview
                </button>
                <button 
                  onClick={() => scrollToSection(statsRef)}
                  className="py-3 px-4 hover:bg-blue-50 text-left text-gray-700 flex items-center gap-2"
                >
                  <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Global Stats
                </button>
                <button 
                  onClick={() => scrollToSection(regionalRef)}
                  className="py-3 px-4 hover:bg-blue-50 text-left text-gray-700 flex items-center gap-2"
                >
                  <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Regional Data
                </button>
                <button 
                  onClick={() => scrollToSection(comparisonRef)}
                  className="py-3 px-4 hover:bg-blue-50 text-left text-gray-700 flex items-center gap-2"
                >
                  <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                  Comparison
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Quick Navigation Button */}
        <motion.button
          id="nav-button"
          className={`bg-blue-600 text-white p-4 rounded-full shadow-lg ${isNavMenuOpen ? 'bg-blue-700' : 'bg-blue-600'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
        >
          <span className="sr-only">Quick Navigation</span>
          {isNavMenuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;