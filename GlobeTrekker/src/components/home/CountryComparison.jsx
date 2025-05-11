import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const CountryComparison = ({ data }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMetric, setActiveMetric] = useState(null);
  const [activeCountry, setActiveCountry] = useState(null);
  const [detailsView, setDetailsView] = useState(null); // {country: Object, metric: String}
  const [animationComplete, setAnimationComplete] = useState(false);
  const detailsRef = useRef(null);

  // For interactive background effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Close details panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (detailsRef.current && !detailsRef.current.contains(e.target)) {
        setDetailsView(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Subtle parallax effect
  const bgX = useTransform(mouseX, [0, 1], [-10, 10]);
  const bgY = useTransform(mouseY, [0, 1], [-10, 10]);

  const filteredCountries = useMemo(() => {
    if (!searchTerm) return [];
    return data?.filter(country => 
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5) || [];
  }, [data, searchTerm]);

  const handleCountrySelect = (country) => {
    if (selectedCountries.length < 3 && 
        !selectedCountries.find(c => c.cca3 === country.cca3)) {
      setSelectedCountries([...selectedCountries, country]);
    }
    setSearchTerm("");
  };

  const removeCountry = (countryCode) => {
    setSelectedCountries(selectedCountries.filter(c => c.cca3 !== countryCode));
    if (activeCountry === countryCode) {
      setActiveCountry(null);
    }
    if (detailsView?.country?.cca3 === countryCode) {
      setDetailsView(null);
    }
  };

  // Reveal animation when component loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Show country details panel
  const showDetails = (country, metric) => {
    setDetailsView({ country, metric });
    setActiveCountry(country.cca3);
    setActiveMetric(metric);
  };

  // Format big numbers
  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1)}B`;
    } else if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  // Enhanced metric component with eye-catching animations
  const ComparisonMetric = ({ label, getValue, icon }) => {
    const isActive = activeMetric === label;
    
    return (
      <motion.div 
        className={`mb-8 ${isActive ? 'z-10 relative' : ''}`}
        initial={false}
        animate={{ 
          y: isActive ? -4 : 0,
        }}
        whileHover={{ y: -2, transition: { duration: 0.2 } }}
        onClick={() => setActiveMetric(isActive ? null : label)}
      >
        <motion.div 
          className={`flex items-center gap-3 mb-3 ${isActive ? 'pb-2' : ''} relative`}
          layout
        >
          {icon && (
            <motion.div
              className={`p-2 rounded-full ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500'} transition-colors duration-300`}
              whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
              animate={isActive ? { 
                scale: [1, 1.15, 1],
                transition: { repeat: 0, duration: 0.5 }
              } : { scale: 1 }}
            >
              {icon}
            </motion.div>
          )}
          <h3 className={`text-sm font-medium uppercase tracking-wider ${isActive ? 'text-indigo-700' : 'text-slate-600'} transition-colors duration-300`}>
            {label}
          </h3>
          
          {/* More visible animated underline */}
          <div className="flex-grow h-px bg-slate-100 relative">
            {isActive && (
              <motion.div 
                className="h-0.5 bg-gradient-to-r from-indigo-500 to-indigo-200 absolute -top-px left-0 rounded-full"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{ boxShadow: "0 1px 2px rgba(99, 102, 241, 0.15)" }}
              />
            )}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-3 gap-4">
          {selectedCountries.map((country, index) => {
            const isActiveCountry = activeCountry === country.cca3;
            
            return (
              <motion.div 
                key={country.cca3}
                className={`p-4 rounded-lg ${
                  isActive || isActiveCountry
                    ? 'bg-white shadow-md border border-slate-100' 
                    : 'bg-transparent hover:bg-white hover:shadow-sm transition-all'
                } cursor-pointer`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                onClick={() => showDetails(country, label)}
                whileHover={{ 
                  y: -3, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02)"
                }}
                layout
              >
                <div className="flex items-center gap-2 mb-2.5 relative">
                  <motion.div 
                    className="w-5 h-4 overflow-hidden rounded-sm flex-shrink-0 relative shadow-sm"
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <img 
                      src={country.flags.svg} 
                      alt={`${country.name.common} flag`}
                      className="w-full h-full object-cover"
                    />
                    {/* Shine effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                      initial={{ x: -100 }}
                      animate={{ x: 100 }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.5,
                        repeatDelay: 3 + index
                      }}
                      style={{ filter: "blur(1px)" }}
                    />
                  </motion.div>
                  
                  <p className="text-xs text-slate-600 font-medium truncate flex-1">
                    {country.name.common}
                  </p>
                  
                  {isActiveCountry && (
                    <motion.div
                      className="absolute -right-1 -top-1 w-2 h-2 bg-indigo-400 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      layoutId={`indicator-${country.cca3}`}
                    />
                  )}
                </div>
                
                <motion.div
                  className="relative"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                >
                  <p className={`text-base ${isActive || isActiveCountry ? 'text-slate-800 font-medium' : 'text-slate-600'} transition-colors`}>
                    {getValue(country)}
                  </p>
                  {(isActive || isActiveCountry) && (
                    <motion.div 
                      className="absolute left-0 bottom-0 w-1/4 h-0.5 bg-indigo-300 rounded-full" 
                      layoutId={`underline-${country.cca3}-${label}`}
                    />
                  )}
                </motion.div>
              </motion.div>
            );
          })}
          
          {Array(3 - selectedCountries.length).fill(null).map((_, i) => (
            <motion.div 
              key={i}
              className="p-4 rounded-lg bg-slate-50/80"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.3, 0.2],
                transition: { delay: i * 0.1 + 0.5, duration: 0.8 }
              }}
              whileHover={{ backgroundColor: "#F9FAFB" }}
            >
              <div className="h-4 mb-2.5"></div>
              <div className="h-5 w-16 bg-slate-100 rounded animate-pulse"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  // This component renders the detailed view when a card is clicked
  const DetailPanel = ({ country, metric }) => {
    const getMetricDetails = () => {
      switch (metric) {
        case "Population":
          return (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-3xl font-semibold text-slate-800">
                  {country.population.toLocaleString()}
                </div>
                <div className="text-sm text-slate-500">Total Population</div>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-300"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 1 }}
                />
              </div>
            </div>
          );

        case "Region":
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-sm text-slate-500 mb-1">Region</div>
                  <div className="font-medium text-slate-800">{country.region}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-sm text-slate-500 mb-1">Subregion</div>
                  <div className="font-medium text-slate-800">{country.subregion || 'N/A'}</div>
                </div>
              </div>
            </div>
          );

        case "Capital":
          return (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-500 mb-1">Capital City</div>
                <div className="text-xl font-medium text-slate-800">
                  {country.capital?.[0] || 'N/A'}
                </div>
              </div>
            </div>
          );

        case "Languages":
          return (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {Object.values(country.languages || {}).map((language, index) => (
                  <motion.div
                    key={language}
                    className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {language}
                  </motion.div>
                ))}
              </div>
            </div>
          );

        case "Area":
          return (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-3xl font-semibold text-slate-800">
                  {country.area.toLocaleString()} km²
                </div>
                <div className="text-sm text-slate-500">Total Area</div>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-300"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 1 }}
                />
              </div>
            </div>
          );

        case "Currencies":
          return (
            <div className="space-y-4">
              <div className="grid gap-3">
                {Object.entries(country.currencies || {}).map(([code, currency], index) => (
                  <motion.div
                    key={code}
                    className="p-4 bg-slate-50 rounded-lg flex items-center justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div>
                      <div className="text-sm text-slate-500 mb-1">
                        {currency.name}
                      </div>
                      <div className="font-medium text-slate-800">
                        {currency.symbol} ({code})
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );

        default:
          return (
            <div className="text-slate-500 text-sm">
              No detailed information available
            </div>
          );
      }
    };

    return (
      <motion.div 
        className="p-5 space-y-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        {/* Enhanced header with animated gradient border */}
        <motion.div 
          className="flex items-center gap-4 border-b border-slate-200 pb-4 relative"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className="w-12 h-8 overflow-hidden rounded-lg shadow-lg relative"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <img 
              src={country.flags.svg} 
              alt={`${country.name.common} flag`}
              className="w-full h-full object-cover"
            />
            {/* Animated shine effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              initial={{ x: -100 }}
              animate={{ x: 100 }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                repeatDelay: 1
              }}
            />
          </motion.div>

          <div className="flex-1">
            <motion.h2 
              className="text-2xl font-semibold text-slate-800 mb-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {country.name.common}
            </motion.h2>
            <motion.div 
              className="flex items-center gap-2 text-sm text-slate-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span>{country.region}</span>
              <span>•</span>
              <span className="text-indigo-500 font-medium">{metric}</span>
            </motion.div>
          </div>

          {/* Animated underline */}
          <motion.div 
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        {/* Metric specific content with staggered animation */}
        <motion.div 
          className="py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {getMetricDetails()}
        </motion.div>

        {/* Enhanced quick facts section */}
        <motion.div 
          className="pt-6 border-t border-slate-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.h3 
            className="text-sm font-medium text-slate-700 mb-4 flex items-center gap-2"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
            </svg>
            Quick Facts
          </motion.h3>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Country Code", value: country.cca2 },
              { label: "Capital", value: country.capital?.[0] || "N/A" },
              { label: "Region", value: country.region },
              { label: "Subregion", value: country.subregion || "N/A" }
            ].map((fact, index) => (
              <motion.div
                key={fact.label}
                className="p-3 bg-gradient-to-br from-slate-50 to-white rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + (index * 0.1) }}
                whileHover={{ y: -2 }}
              >
                <div className="text-xs text-slate-500 mb-1">{fact.label}</div>
                <div className="font-medium text-slate-800">{fact.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced close button */}
        <motion.div 
          className="pt-4 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            onClick={() => setDetailsView(null)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-indigo-600 hover:text-indigo-800 rounded-full hover:bg-indigo-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Close Details</span>
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </motion.svg>
          </motion.button>
        </motion.div>

        {/* Decorative elements */}
        <motion.div 
          className="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-full opacity-20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-32 h-32 bg-purple-50 rounded-full opacity-20 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 270, 180, 90, 0]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>
    );
  };

  const metrics = [
    { 
      label: "Population", 
      getValue: (c) => c.population.toLocaleString(),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      label: "Region", 
      getValue: (c) => c.region,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      label: "Capital", 
      getValue: (c) => c.capital?.[0] || 'N/A',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    { 
      label: "Languages", 
      getValue: (c) => Object.values(c.languages || {}).join(', '),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      )
    },
    { 
      label: "Area", 
      getValue: (c) => `${c.area.toLocaleString()} km²`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    { 
      label: "Currencies", 
      getValue: (c) => Object.values(c.currencies || {}).map(curr => curr.name).join(', '),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Decorative background elements */}
      <motion.div 
        className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-50 rounded-full opacity-40 blur-3xl"
        style={{ x: bgX, y: bgY }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-50 rounded-full opacity-40 blur-3xl"
        style={{ x: useTransform(mouseX, [0, 1], [10, -10]), y: useTransform(mouseY, [0, 1], [10, -10]) }}
      />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: "linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "40px 40px" 
        }} />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Enhanced header with animated line */}
        <div className="relative mb-16">
          <motion.div
            className="absolute -left-8 top-1/2 w-6 h-[2px] bg-indigo-300"
            initial={{ width: 0 }}
            animate={{ width: 24 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          />
          <motion.h2 
            className="text-2xl md:text-3xl font-light text-slate-800 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Country Comparison
            <motion.div 
              className="absolute -bottom-2 left-0 h-[2px] w-full bg-gradient-to-r from-indigo-400 to-indigo-100"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.7, duration: 0.7 }}
            />
          </motion.h2>
        </div>

        {/* Enhanced search with focus animations */}
        <motion.div 
          className="relative mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="relative">
            <motion.div 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.div>
            
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search countries to compare (max 3)"
              className="w-full py-3.5 pl-12 pr-4 rounded-lg bg-white border border-slate-200 shadow-sm focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 text-slate-700"
            />
            
            {selectedCountries.length > 0 && (
              <motion.div 
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-indigo-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {selectedCountries.length}
              </motion.div>
            )}
          </div>

          {/* Animated search results with better transitions */}
          <AnimatePresence>
            {searchTerm && (
              <motion.div 
                className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg mt-2 overflow-hidden z-10 border border-slate-100"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: "top center", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }}
              >
                {filteredCountries.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {filteredCountries.map((country, idx) => (
                      <motion.button
                        key={country.cca3}
                        className="w-full px-5 py-3 text-left flex items-center gap-3 text-sm hover:bg-indigo-50 transition-colors group border-b border-slate-100 last:border-none relative overflow-hidden"
                        onClick={() => handleCountrySelect(country)}
                        whileHover={{ x: 4 }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08, type: "spring", stiffness: 200 }}
                      >
                        {/* Flag with shine effect */}
                        <div className="relative w-7 h-5 overflow-hidden rounded-sm shadow-sm">
                          <img 
                            src={country.flags.svg} 
                            alt={`${country.name.common} flag`}
                            className="w-full h-full object-cover"
                          />
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                            initial={{ x: -40 }}
                            animate={{ x: 40 }}
                            transition={{ repeat: Infinity, duration: 1, repeatDelay: 2 + idx }}
                          />
                        </div>
                        
                        <div className="flex-1">
                          <span className="font-medium text-slate-700">{country.name.common}</span>
                          {country.capital && (
                            <span className="text-xs text-slate-400 block">
                              {country.capital[0]}
                            </span>
                          )}
                        </div>
                        
                        <motion.span 
                          className="text-xs text-indigo-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                          whileHover={{ scale: 1.05 }}
                        >
                          <span>Select</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </motion.span>
                      </motion.button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    className="p-6 text-center text-sm text-slate-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div 
                      className="inline-block mb-2 text-slate-300"
                      animate={{ 
                        rotate: [0, -10, 0, 10, 0],
                        transition: { repeat: Infinity, duration: 5, repeatDelay: 1 }
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </motion.div>
                    <div>No countries found</div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced selected countries pill design */}
        <motion.div 
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <AnimatePresence>
            {selectedCountries.map((country, idx) => (
              <motion.div
                key={country.cca3}
                className="flex items-center gap-2 bg-white py-2.5 pl-3 pr-4 rounded-full border border-indigo-100 shadow-sm group relative"
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.8, 
                  x: -20,
                  transition: { duration: 0.2 }
                }}
                whileHover={{ 
                  y: -3, 
                  boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.1), 0 4px 6px -2px rgba(99, 102, 241, 0.05)",
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                transition={{ 
                  delay: idx * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                layout
              >
                {/* Pulse dot */}
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-400 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 2,
                    delay: idx * 0.3
                  }}
                />
                
                <div className="relative w-6 h-6 rounded-full overflow-hidden shadow-md">
                  <img 
                    src={country.flags.svg} 
                    alt={`${country.name.common} flag`} 
                    className="w-full h-full object-cover"
                  />
                  {/* Flag shine effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    initial={{ x: -30 }}
                    animate={{ x: 30 }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5,
                      repeatDelay: 3 + idx
                    }}
                  />
                </div>
                
                <span className="text-sm text-slate-700 font-medium">{country.name.common}</span>
                
                <motion.button 
                  onClick={() => removeCountry(country.cca3)}
                  className="ml-1 w-5 h-5 flex items-center justify-center rounded-full text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>

          {selectedCountries.length === 0 && (
            <motion.div 
              className="w-full text-center py-6 text-slate-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div 
                className="mb-3 inline-block text-slate-300"
                animate={{ 
                  y: [0, -5, 0],
                  transition: { repeat: Infinity, duration: 2, repeatDelay: 0.5 }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
              </motion.div>
              <div>Search and select countries to compare</div>
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced comparison metrics with staggered animations */}
        {selectedCountries.length > 0 && (
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-md border border-slate-100 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                type: "spring",
                stiffness: 300,
                damping: 30
              }
            }}
            whileHover={{ 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.01)"
            }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {/* Background accent shape */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-50 rounded-full opacity-50" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-50 rounded-full opacity-30" />

            {/* Detailed view panel */}
            <AnimatePresence>
              {detailsView && (
                <motion.div 
                  className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 rounded-xl shadow-inner overflow-y-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  ref={detailsRef}
                >
                  <DetailPanel country={detailsView.country} metric={detailsView.metric} />
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="relative z-10">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.6 + (index * 0.1),
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                >
                  <ComparisonMetric
                    label={metric.label}
                    getValue={metric.getValue}
                    icon={metric.icon}
                  />
                </motion.div>
              ))}
            </div>

            {/* Interactive helper indicator */}
            <motion.div 
              className="absolute bottom-4 right-4 text-xs text-slate-400 flex items-center gap-2 bg-slate-50 py-1.5 px-3 rounded-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 1.5, type: "spring" }
              }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 2 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              <span>Click on rows and cards for more details</span>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CountryComparison;