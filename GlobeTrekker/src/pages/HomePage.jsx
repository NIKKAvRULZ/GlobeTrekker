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
  const { logout, user } = useAuth();
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [logoutAnimation, setLogoutAnimation] = useState(false);
  const [goodbyeMessage, setGoodbyeMessage] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Create refs for each section
  const overviewRef = useRef(null);
  const statsRef = useRef(null);
  const regionalRef = useRef(null);
  const comparisonRef = useRef(null);

  // Welcome greetings in different languages
  const welcomeGreetings = [
    "Welcome",
    "Bienvenido",
    "Bienvenue",
    "Benvenuto",
    "Willkommen",
    "Youkoso",
    "환영합니다"
  ];
  
  // Random greeting selection
  const [greeting, setGreeting] = useState(
    welcomeGreetings[Math.floor(Math.random() * welcomeGreetings.length)]
  );

  useEffect(() => {
    // Hide welcome animation after 3.5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutAnimation(true);
    
    // Random goodbye messages in different languages
    const goodbyes = [
      "Goodbye! See you soon!",
      "Adiós! ¡Hasta pronto!",
      "Au revoir! À bientôt!",
      "Arrivederci! A presto!",
      "Auf Wiedersehen!",
      "Sayōnara! Mata ne!",
      "Annyeong! Jal gayo!"
    ];
    
    setGoodbyeMessage(goodbyes[Math.floor(Math.random() * goodbyes.length)]);
    
    try {
      // First wait for animation
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      // Then perform logout
      await logout();
      
      // Clear any local state
      setCountryData(null);
      setLoading(true);
      setSelectedRegion('all');
      setSelectedCountry(null);
      
      // Add a small delay for final animation before redirect
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Navigate to landing page
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
      setLogoutAnimation(false);
    }
  };
  
  const toggleLogoutConfirm = () => {
    setShowLogoutConfirm(!showLogoutConfirm);
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
      {/* Welcome Animation */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center z-[100] bg-gradient-to-b from-blue-600 to-indigo-900"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.8, ease: "easeOut" } 
            }}
          >
            <div className="relative w-full h-full overflow-hidden">
              {/* Animated background elements */}
              <motion.div 
                className="absolute w-[600px] h-[600px] rounded-full bg-blue-400/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ 
                  scale: [1, 1.2, 1.5],
                  opacity: [0.3, 0.5, 0] 
                }}
                transition={{ duration: 2.5, ease: "easeOut" }}
              />
              <motion.div 
                className="absolute w-[400px] h-[400px] rounded-full bg-indigo-400/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ 
                  scale: [1, 1.3, 1.7],
                  opacity: [0.3, 0.5, 0] 
                }}
                transition={{ duration: 2.5, delay: 0.2, ease: "easeOut" }}
              />
              <motion.div 
                className="absolute w-[300px] h-[300px] rounded-full bg-cyan-400/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ 
                  scale: [1, 1.4, 1.9],
                  opacity: [0.3, 0.5, 0] 
                }}
                transition={{ duration: 2.5, delay: 0.4, ease: "easeOut" }}
              />
              
              {/* World map background */}
              <motion.div 
                className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-center bg-no-repeat bg-contain"
                animate={{
                  opacity: [0.05, 0.15, 0.05]
                }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
              
              {/* Flying elements */}
              <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-200 rounded-full"
                    initial={{ 
                      x: Math.random() * window.innerWidth, 
                      y: Math.random() * window.innerHeight,
                      opacity: 0 
                    }}
                    animate={{ 
                      x: Math.random() * window.innerWidth, 
                      y: Math.random() * window.innerHeight,
                      opacity: [0, 0.8, 0] 
                    }}
                    transition={{ 
                      duration: 2 + Math.random() * 2,
                      delay: Math.random() * 0.5
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Main greeting */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.h1 
                  className="text-6xl md:text-7xl text-white font-bold mb-2"
                  animate={{ 
                    textShadow: [
                      "0 0 8px rgba(255,255,255,0.3)",
                      "0 0 16px rgba(255,255,255,0.5)",
                      "0 0 8px rgba(255,255,255,0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: 1 }}
                >
                  {greeting}
                </motion.h1>
                
                <motion.h2 
                  className="text-2xl md:text-3xl text-blue-100 font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {user?.displayName || user?.email?.split('@')[0] || 'Explorer'}
                </motion.h2>
              </motion.div>
              
              {/* Animated globe icon */}
              <motion.div 
                className="mt-12 text-white/80"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0,
                  opacity: [1, 1, 0] 
                }}
                transition={{ 
                  scale: { delay: 0.8, duration: 0.5, type: "spring" },
                  rotate: { delay: 0.8, duration: 0.5 },
                  opacity: { delay: 2, duration: 1.2 }
                }}
              >
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </motion.div>
              
              {/* Prepare to explore text */}
              <motion.p
                className="absolute bottom-12 text-white/60 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                Preparing your exploration...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Logout Button with confirmation overlay */}
      <div className="fixed top-4 right-4 z-50">
        <motion.button
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg shadow-lg flex items-center gap-2 overflow-hidden relative group"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleLogoutConfirm}
        >
          <span className="relative z-10">Logout</span>
          <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            style={{ zIndex: 0 }}
          />
        </motion.button>
      </div>

      {/* Logout confirmation modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleLogoutConfirm}
          >
            <motion.div 
              className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <motion.div 
                  className="inline-block mb-4 text-blue-600"
                  animate={{ 
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 0.5, repeat: isLoggingOut ? Infinity : 0 }}
                >
                  <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800">Ready to leave?</h3>
                <p className="text-gray-600 mt-2">Your exploration session will end and you'll be logged out.</p>
              </div>
              
              <div className="flex gap-3">
                <motion.button
                  className="w-1/2 py-3 rounded-lg bg-gray-200 text-gray-700 font-medium"
                  whileHover={{ scale: 1.03, backgroundColor: "#e5e7eb" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={toggleLogoutConfirm}
                  disabled={isLoggingOut}
                >
                  Stay
                </motion.button>
                
                <motion.button
                  className={`w-1/2 py-3 rounded-lg font-medium relative overflow-hidden ${isLoggingOut ? 'cursor-not-allowed' : ''}`}
                  whileHover={{ scale: isLoggingOut ? 1 : 1.03 }}
                  whileTap={{ scale: isLoggingOut ? 1 : 0.97 }}
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  <span className="relative z-10 text-white">
                    {isLoggingOut ? goodbyeMessage || 'Goodbye...' : 'Logout'}
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"
                    animate={{ 
                      background: isLoggingOut 
                        ? ["linear-gradient(to right, #2563eb, #4f46e5)", "linear-gradient(to right, #4f46e5, #2563eb)"]
                        : "linear-gradient(to right, #2563eb, #4f46e5)"
                    }}
                    transition={{ duration: 1.5, repeat: isLoggingOut ? Infinity : 0 }}
                  />
                  
                  {isLoggingOut && (
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div 
                        className="w-5 h-5 border-3 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showWelcome ? 0 : 1
        }}
        transition={{ 
          duration: 0.8,
          delay: 0.3
        }}
      >
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
      </motion.div>

      {/* Floating Action Button with Navigation Menu */}
      <motion.div 
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showWelcome ? 0 : 1
        }}
        transition={{ 
          duration: 0.5,
          delay: 0.5
        }}
      >
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