import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import api from '../services/api';
import HeroSection from "../components/landing/HeroSection";
import FeaturedCountries from "../components/landing/FeaturedCountries";
import WorldStatistics from "../components/landing/WorldStatistics";
import FeaturesSection from "../components/landing/FeaturesSection";
import Footer from "../components/landing/Footer";
import SearchComponent from "../components/landing/SearchComponent";

const LandingPage = () => {
  const [featuredCountries, setFeaturedCountries] = useState([]);
  const [countryStats, setCountryStats] = useState({ total: 0, continents: [] });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const { scrollYProgress } = useScroll();
  const mainRef = useRef(null);

  // Fetch initial data
  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [countries, stats] = await Promise.all([
        api.getAllCountries(),
        api.getCountryStatistics()
      ]);
      
      const featured = countries
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);
      
      setFeaturedCountries(featured);
      setCountryStats(stats);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleSearch = async (term) => {
    if (!term) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const results = await api.searchCountries(term);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching countries:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        handleSearch(searchTerm);
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Format large numbers
  const formatNumber = (num) => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(1) + 'B';
    }
    if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + 'M';
    }
    if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <motion.div 
      ref={mainRef}
      className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 to-cyan-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Enhanced Dynamic Background with parallax effect */}
      <motion.div 
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ['0%', '100%']), 
          opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]) 
        }}
      >
        {/* Animated gradient background with smoother transitions */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))",
              "linear-gradient(to right, rgba(14, 165, 233, 0.1), rgba(59, 130, 246, 0.1))",
              "linear-gradient(to right, rgba(37, 99, 235, 0.1), rgba(14, 165, 233, 0.1))",
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Enhanced floating particles with better size variation */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 
                ? "w-2 h-2 bg-blue-500/20" 
                : i % 3 === 1 
                  ? "w-3 h-3 bg-cyan-400/20" 
                  : "w-1.5 h-1.5 bg-indigo-400/20"
            }`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Improved Grid pattern with better visual integration */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
      </motion.div>

      {/* Main content with improved spacing */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection 
            loading={loading} 
            countryStats={countryStats} 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchResults={searchResults}
            isSearching={isSearching}
            formatNumber={formatNumber}
          />
        </motion.div>
        
        {/* Enhanced section transitions with improved spacing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <FeaturedCountries 
            loading={loading} 
            featuredCountries={featuredCountries} 
            formatNumber={formatNumber} 
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <WorldStatistics 
            loading={loading} 
            countryStats={countryStats} 
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <FeaturesSection />
        </motion.div>
        
        <Footer />
      </div>
    </motion.div>
  );
};

export default LandingPage;