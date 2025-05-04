  import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaLanguage, FaPhone, FaHandshake, FaMusic, FaUtensils, FaBook, FaCalendarAlt, FaPray, FaGlobe, FaDrumSteelpan, FaTheaterMasks, FaPalette } from 'react-icons/fa';
import { RiCakeLine, RiSwordLine, RiDoorOpenLine } from 'react-icons/ri';
import axios from 'axios';

const CultureTab = ({ country }) => {
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState({});
  const [wikiData, setWikiData] = useState(null);
  const [flagColors, setFlagColors] = useState([]);
  const [holidayData, setHolidayData] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [hoverEffect, setHoverEffect] = useState(null);

  // Extract flag colors for design elements
  useEffect(() => {
    if (country.flags?.svg) {
      setLoading(prev => ({ ...prev, flagColors: true }));
      setTimeout(() => {
        // In a real app, you'd use an API or image processing to extract actual colors
        const randomColors = [
          `hsl(${Math.random() * 360}, 70%, 60%)`,
          `hsl(${Math.random() * 360}, 70%, 50%)`,
          `hsl(${Math.random() * 360}, 60%, 70%)`
        ];
        setFlagColors(randomColors);
        setLoading(prev => ({ ...prev, flagColors: false }));
      }, 300);
    }
  }, [country.flags?.svg]);

  // Fetch Wikipedia data with enhanced fallbacks
  useEffect(() => {
    const fetchWikiData = async () => {
      if (!country.name.common) return;
      setLoading(prev => ({ ...prev, wiki: true }));
      
      const searchTerms = [
        `${country.name.common} culture`,
        `Culture of ${country.name.common}`,
        `${country.name.common}`,
        `${country.name.common} traditions`,
        `${country.name.common} history and culture`
      ];
      
      let foundData = false;
      
      for (const term of searchTerms) {
        if (foundData) break;
        
        try {
          const response = await axios.get(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`,
            { timeout: 5000 }
          );
          
          if (response.data && response.data.extract && !response.data.type.includes('disambiguation')) {
            setWikiData(response.data);
            foundData = true;
            break;
          }
        } catch (error) {
          console.warn(`Could not fetch Wikipedia data for: ${term}`, error);
        }
      }
      
      if (!foundData) {
        console.log("Using fallback culture data for", country.name.common);
        
        if (country.region) {
          try {
            const regionResponse = await axios.get(
              `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(country.region + " culture")}`,
              { timeout: 5000 }
            );
            
            if (regionResponse.data && regionResponse.data.extract) {
              setWikiData({
                extract: `${country.name.common} is located in ${country.region}${country.subregion ? ` (${country.subregion})` : ''} and shares many cultural aspects with neighboring countries. ${regionResponse.data.extract.split('.')[0]}.`,
                content_urls: regionResponse.data.content_urls,
                thumbnail: regionResponse.data.thumbnail
              });
            }
          } catch (error) {
            setWikiData({
              extract: `${country.name.common} has a unique cultural heritage shaped by its geographic location in ${country.region || 'its region'}${country.subregion ? ` (${country.subregion})` : ''}, historical influences, and local traditions.`,
            });
          }
        } else {
          setWikiData({
            extract: `${country.name.common} has a distinct cultural identity with unique traditions, cuisine, arts, and social customs that reflect its history and environment.`,
          });
        }
      }
      
      setLoading(prev => ({ ...prev, wiki: false }));
    };
    
    fetchWikiData();
  }, [country.name.common, country.region, country.subregion]);

  // Fetch holiday data
  useEffect(() => {
    const fetchHolidays = async () => {
      if (!country.cca2) return;
      
      setLoading(prev => ({ ...prev, holidays: true }));
      try {
        // Public-holidays API
        const response = await axios.get(
          `https://date.nager.at/api/v3/publicholidays/2023/${country.cca2}`,
          { timeout: 5000 }
        );
        
        if (response.data && response.data.length > 0) {
          setHolidayData(response.data.slice(0, 5)); // Limit to 5 holidays
        }
      } catch (error) {
        console.warn('Could not fetch holiday data:', error);
        // Generate some placeholder holiday data
        const placeholderHolidays = [
          {
            name: `${country.name.common} National Day`,
            date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
            type: 'Public'
          },
          {
            name: "New Year's Day",
            date: "2023-01-01",
            type: 'Public'
          },
          {
            name: "Cultural Festival",
            date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
            type: 'Cultural'
          }
        ];
        setHolidayData(placeholderHolidays);
      } finally {
        setLoading(prev => ({ ...prev, holidays: false }));
      }
    };
    
    fetchHolidays();
  }, [country.cca2, country.name.common]);

  const handleExpand = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  const getLanguageFamilies = () => {
    if (!country.languages) return ['Information not available'];
    
    const languageGroups = {
      'Germanic': ['English', 'German', 'Dutch', 'Danish', 'Swedish', 'Norwegian', 'Icelandic'],
      'Romance': ['Spanish', 'Portuguese', 'French', 'Italian', 'Romanian'],
      'Slavic': ['Russian', 'Ukrainian', 'Polish', 'Czech', 'Slovak', 'Bulgarian', 'Croatian', 'Serbian'],
      'Semitic': ['Arabic', 'Hebrew', 'Amharic'],
      'Indo-Iranian': ['Persian', 'Hindi', 'Urdu', 'Bengali', 'Punjabi'],
      'Sino-Tibetan': ['Chinese', 'Mandarin', 'Cantonese', 'Tibetan'],
      'Austronesian': ['Malay', 'Indonesian', 'Filipino', 'Tagalog', 'Hawaiian'],
      'Turkic': ['Turkish', 'Azerbaijani', 'Kazakh', 'Uzbek']
    };
    
    const families = new Set();
    
    Object.values(country.languages).forEach(language => {
      for (const [family, langs] of Object.entries(languageGroups)) {
        if (langs.some(lang => language.includes(lang))) {
          families.add(family);
        }
      }
    });
    
    return families.size > 0 ? Array.from(families) : ['Other'];
  };

  const getFallbackImage = () => {
    const imagePatterns = [
      "data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.4'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d97706' fill-opacity='0.4'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='24' viewBox='0 0 88 24'%3E%3Cg fill='%23d97706' fill-opacity='0.4'%3E%3Cpath d='M10 0l30 15 2 1V2.18A10 10 0 0 0 41.76 0H39.7a8 8 0 0 1 .3 2.18v10.58L14.47 0H10zm31.76 24a10 10 0 0 0-5.29-6.76L4 1 2 0v13.82a10 10 0 0 0 5.53 8.94L10 24h4.47l-6.05-3.02A8 8 0 0 1 4 13.82V3.24l31.58 15.78A8 8 0 0 1 39.7 24h2.06zM78 24l2.47-1.24A10 10 0 0 0 86 13.82V0l-2 1-32.47 16.24A10 10 0 0 0 46.24 24h2.06a8 8 0 0 1 4.12-4.98L84 3.24v10.58a8 8 0 0 1-4.42 7.16L73.53 24H78zm0-24L48 15l-2 1V2.18A10 10 0 0 1 46.24 0h2.06a8 8 0 0 0-.3 2.18v10.58L73.53 0H78z'/%3E%3C/g%3E%3C/svg%3E"
    ];
    
    const regionIndex = {
      'Africa': 0,
      'Americas': 1,
      'Asia': 2,
      'Europe': 0,
      'Oceania': 1
    }[country.region] || 0;
    
    return imagePatterns[regionIndex];
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const floatVariants = {
    hover: {
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Cultural Banner - Hero Section */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-xl border border-amber-200"
        whileHover={{
          borderColor: flagColors[0] || '#f59e0b',
          transition: { duration: 0.3 }
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/90 via-amber-50/80 to-white/70 backdrop-blur-sm z-10" />
        
        {wikiData && wikiData.thumbnail ? (
          <motion.img
            src={wikiData.thumbnail.source}
            alt={`Cultural image of ${country.name.common}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3 }}
          />
        ) : (
          <div 
            className="absolute inset-0 opacity-20" 
            style={{
              backgroundImage: `url("${getFallbackImage()}")`,
              backgroundRepeat: 'repeat'
            }}
          />
        )}
        
        <motion.div 
          className="relative z-20 p-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-3">
            <motion.h3 
              className="text-xl font-bold text-amber-800"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {country.name.common} Culture
            </motion.h3>

            {/* Decorative cultural icons with hoverable meanings */}
            <motion.div 
              className="mt-2 flex space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {[
                { icon: FaMusic, name: "Music", color: "bg-pink-100 text-pink-600" },
                { icon: FaUtensils, name: "Cuisine", color: "bg-green-100 text-green-600" },
                { icon: RiCakeLine, name: "Traditions", color: "bg-blue-100 text-blue-600" },
                { icon: FaPalette, name: "Art", color: "bg-purple-100 text-purple-600" },
                { icon: RiDoorOpenLine, name: "Architecture", color: "bg-amber-100 text-amber-600" }
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  className={`p-2 rounded-full ${item.color} cursor-help`}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.2,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  onHoverStart={() => setHoverEffect(item.name)}
                  onHoverEnd={() => setHoverEffect(null)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                >
                  <item.icon />
                  {hoverEffect === item.name && (
                    <motion.div 
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {item.name}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {wikiData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.p 
                className="text-sm text-gray-700 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {wikiData.extract.split('.').slice(0, 2).join('.')}. 
              </motion.p>
              
              {wikiData.content_urls?.desktop?.page && (
                <motion.a
                  href={wikiData.content_urls.desktop.page}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-sm font-medium text-amber-600 hover:text-amber-800 transition-colors"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Read more on Wikipedia →
                </motion.a>
              )}
            </motion.div>
          )}
          
          {/* Floating badge showing flag colors */}
          <motion.div
            className="absolute top-3 right-3 flex gap-1 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            {flagColors.map((color, index) => (
              <motion.div
                key={index}
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: color }}
                whileHover={{ scale: 1.3 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Languages & Communication Section - Enhanced */}
      <motion.div
        variants={itemVariants} 
        className="bg-amber-50 p-4 rounded-lg border border-amber-100 overflow-hidden"
        whileHover={{
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          borderColor: flagColors[1] || '#fbbf24',
          transition: { duration: 0.3 }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-3"
        >
          <motion.div 
            className="p-2 bg-amber-200 rounded-full text-amber-700"
            whileHover={{ rotate: 15, scale: 1.1 }}
          >
            <FaLanguage />
          </motion.div>
          <h3 className="text-lg font-semibold text-amber-700">
            Languages & Communication
          </h3>
        </motion.div>
        
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Languages with enhanced animations */}
          <div>
            <p className="text-sm text-gray-500">Languages</p>
            <motion.div 
              className="flex flex-wrap gap-2 mt-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {country.languages ? 
                Object.entries(country.languages).map(([code, name], index) => (
                  <motion.div 
                    key={code} 
                    className="bg-white px-3 py-1.5 rounded-full border border-amber-100 text-sm relative overflow-hidden"
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: flagColors[0] || '#FBBF24',
                      color: '#fff',
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.span className="relative z-10">{name}</motion.span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r"
                      style={{ background: `linear-gradient(to right, ${flagColors[0] || '#FBBF24'}, ${flagColors[1] || '#fcd34d'})` }}
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                )) : (
                  <motion.div
                    variants={itemVariants}
                    className="bg-white px-3 py-1.5 rounded-full border border-amber-100 text-sm"
                  >
                    Information not available
                  </motion.div>
                )
              }
            </motion.div>
          </div>
          
          {/* Language Families with pop animation */}
          <motion.div
            variants={itemVariants}
          >
            <p className="text-sm text-gray-500">Language Families</p>
            <motion.div 
              className="flex flex-wrap gap-1 mt-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {getLanguageFamilies().map((family, index) => (
                <motion.span 
                  key={family}
                  className="inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: flagColors[1] || '#fcd34d',
                    transition: { duration: 0.2, type: "spring" }
                  }}
                >
                  {family}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Calling Code with animated icon */}
          {country?.idd?.root && (
            <motion.div
              variants={itemVariants}
            >
              <p className="text-sm text-gray-500">Calling Code</p>
              <p className="font-medium flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, repeatDelay: 5, duration: 0.6 }}
                >
                  <FaPhone className="text-amber-500" />
                </motion.div>
                <span>{country.idd.root}{country.idd.suffixes?.[0] || ""}</span>
              </p>
            </motion.div>
          )}

          {/* Common greeting with animated speech bubble */}
          <motion.div
            variants={itemVariants}
            className="mt-4"
          >
            <p className="text-sm text-gray-500 mb-1">Common Greeting</p>
            <motion.div
              className="relative bg-white p-3 rounded-lg shadow-sm"
              whileHover={{
                y: -4,
                boxShadow: "0 12px 20px -5px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3, type: "spring" }
              }}
            >
              <div className="flex items-center gap-2">
                <FaHandshake className="text-amber-500" />
                <span className="font-medium">
                  {country.languages && Object.values(country.languages)[0] === 'English' ? 
                    'Hello!' : 
                    country.region === 'Europe' ? 'Bonjour / Hello / Hola!' :
                    country.region === 'Asia' ? 'Ni hao / Namaste / Konnichiwa!' :
                    country.region === 'Africa' ? 'Jambo / Salaam aleikum!' :
                    country.region === 'Americas' ? '¡Hola! / Hello!' :
                    'Hello!'
                  }
                </span>
              </div>
              <motion.div
                className="absolute -bottom-2 left-4 w-4 h-4 bg-white rotate-45 transform origin-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Cultural Elements Section - New Card Grid */}
      <motion.div
        variants={itemVariants}
        className="bg-amber-50 p-4 rounded-lg border border-amber-100"
        whileHover={{
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          borderColor: flagColors[2] || '#fcd34d',
          transition: { duration: 0.3 }
        }}
      >
        <motion.div 
          className="flex items-center gap-2 mb-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div 
            className="p-2 bg-amber-200 rounded-full text-amber-700"
            whileHover={{ rotate: 15, scale: 1.1 }}
          >
            <FaBook />
          </motion.div>
          <h3 className="text-lg font-semibold text-amber-700">Cultural Elements</h3>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Cuisine Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-lg overflow-hidden shadow-sm"
            whileHover={floatVariants.hover}
            onHoverStart={() => setActiveSection('cuisine')}
            onHoverEnd={() => setActiveSection(null)}
          >
            <div className="h-24 bg-gradient-to-br from-yellow-400 to-amber-600 overflow-hidden relative">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ 
                  scale: activeSection === 'cuisine' ? 1.2 : 1,
                  y: activeSection === 'cuisine' ? -5 : 0
                }}
                transition={{ duration: 0.4 }}
              >
                <FaUtensils className="text-white text-4xl" />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-yellow-600 mix-blend-multiply"
                initial={{ opacity: 0.1 }}
                animate={{ opacity: activeSection === 'cuisine' ? 0.3 : 0.1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="p-3">
              <h4 className="font-bold text-amber-800">Cuisine</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {country.region === 'Europe' ? 
                  `European cuisine featuring local produce, meats, and regional specialties.` :
                 country.region === 'Asia' ? 
                  `Asian cuisine known for its unique spices, rice dishes, and diverse cooking techniques.` :
                 country.region === 'Africa' ? 
                  `African cuisine highlighting stews, grains, and flavorful spice combinations.` :
                 country.region === 'Americas' ? 
                  `American cuisine featuring fusion elements, regional specialties, and diverse influences.` :
                 country.region === 'Oceania' ? 
                  `Oceanian cuisine showcasing fresh seafood, unique native ingredients, and multicultural influences.` :
                  `Local cuisine featuring traditional recipes unique to this region.`
                }
              </p>
            </div>
          </motion.div>
          
          {/* Religion Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-lg overflow-hidden shadow-sm"
            whileHover={floatVariants.hover}
            onHoverStart={() => setActiveSection('religion')}
            onHoverEnd={() => setActiveSection(null)}
          >
            <div className="h-24 bg-gradient-to-br from-indigo-400 to-purple-600 overflow-hidden relative">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ 
                  scale: activeSection === 'religion' ? 1.2 : 1,
                  y: activeSection === 'religion' ? -5 : 0
                }}
                transition={{ duration: 0.4 }}
              >
                <FaPray className="text-white text-4xl" />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-indigo-600 mix-blend-multiply"
                initial={{ opacity: 0.1 }}
                animate={{ opacity: activeSection === 'religion' ? 0.3 : 0.1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="p-3">
              <h4 className="font-bold text-amber-800">Religion</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {country.region === 'Europe' ? 
                  `Predominantly Christian with growing secular populations.` :
                 country.subregion === 'Western Asia' || country.subregion === 'Southern Asia' ? 
                  `Strong religious influences including Islam, Hinduism, and various Eastern traditions.` :
                 country.region === 'Africa' ? 
                  `Diverse religious practices including Christianity, Islam, and traditional beliefs.` :
                 country.region === 'Americas' ? 
                  `Primarily Christian with indigenous spiritual traditions.` :
                  `Diverse religious landscape with both traditional and modern influences.`
                }
              </p>
            </div>
          </motion.div>
          
          {/* Arts Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-lg overflow-hidden shadow-sm"
            whileHover={floatVariants.hover}
            onHoverStart={() => setActiveSection('arts')}
            onHoverEnd={() => setActiveSection(null)}
          >
            <div className="h-24 bg-gradient-to-br from-pink-400 to-red-600 overflow-hidden relative">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ 
                  scale: activeSection === 'arts' ? 1.2 : 1,
                  y: activeSection === 'arts' ? -5 : 0
                }}
                transition={{ duration: 0.4 }}
              >
                <FaTheaterMasks className="text-white text-4xl" />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-red-600 mix-blend-multiply"
                initial={{ opacity: 0.1 }}
                animate={{ opacity: activeSection === 'arts' ? 0.3 : 0.1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="p-3">
              <h4 className="font-bold text-amber-800">Arts & Music</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {country.region === 'Europe' ? 
                  `Classical traditions, folk music, and modern pop innovations.` :
                 country.region === 'Asia' ? 
                  `Rich musical heritage with unique instruments and vocal traditions.` :
                 country.region === 'Africa' ? 
                  `Rhythmic traditions with drums, string instruments, and vocal harmonies.` :
                 country.region === 'Americas' ? 
                  `Diverse influences including indigenous rhythms, European styles, and modern fusion.` :
                  `Musical styles blending traditional forms with contemporary influences.`
                }
              </p>
            </div>
          </motion.div>
          
          {/* Festivals Card - Interactive */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-lg overflow-hidden shadow-sm sm:col-span-2 md:col-span-1"
            whileHover={floatVariants.hover}
            onClick={() => handleExpand('holidays')}
            style={{ cursor: 'pointer' }}
          >
            <div className="h-24 bg-gradient-to-br from-green-400 to-emerald-600 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <FaCalendarAlt className="text-white text-4xl" />
              </div>
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0.1 }}
                whileHover={{ opacity: 0.3 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="p-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-amber-800">Holidays & Celebrations</h4>
                <motion.span
                  animate={{ rotate: expanded === 'holidays' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-500"
                >
                  ▼
                </motion.span>
              </div>
              
              <motion.div
                initial={false}
                animate={{ 
                  height: expanded === 'holidays' ? 'auto' : '40px',
                  opacity: 1
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {loading.holidays ? (
                  <div className="flex items-center justify-center h-12 mt-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-amber-500"></div>
                  </div>
                ) : holidayData && holidayData.length > 0 ? (
                  <div className="space-y-1 mt-2">
                    {holidayData.map((holiday, idx) => (
                      <motion.div 
                        key={holiday.name}
                        className="text-xs bg-amber-50 rounded px-2 py-1 flex justify-between"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: expanded === 'holidays' ? 1 : 0, y: expanded === 'holidays' ? 0 : -10 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <span className="font-medium">{holiday.name}</span>
                        <span className="text-amber-700">{new Date(holiday.date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}</span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {country.region === 'Europe' ? 
                      `Traditional Christian holidays, national days, and seasonal celebrations.` :
                     country.region === 'Asia' ? 
                      `Rich festival traditions based on lunar calendar and religious observances.` :
                     country.region === 'Africa' ? 
                      `Vibrant celebrations combining traditional customs with modern national holidays.` :
                     country.region === 'Americas' ? 
                      `A mix of religious, indigenous, and civic celebrations throughout the year.` :
                      `Annual celebrations highlighting cultural heritage and national identity.`
                    }
                  </p>
                )}
              </motion.div>
            </div>
          </motion.div>
          
          {/* Traditions Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-lg overflow-hidden shadow-sm"
            whileHover={floatVariants.hover}
            onHoverStart={() => setActiveSection('traditions')}
            onHoverEnd={() => setActiveSection(null)}
          >
            <div className="h-24 bg-gradient-to-br from-blue-400 to-sky-600 overflow-hidden relative">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ 
                  scale: activeSection === 'traditions' ? 1.2 : 1,
                  y: activeSection === 'traditions' ? -5 : 0
                }}
                transition={{ duration: 0.4 }}
              >
                <RiSwordLine className="text-white text-4xl" />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-blue-600 mix-blend-multiply"
                initial={{ opacity: 0.1 }}
                animate={{ opacity: activeSection === 'traditions' ? 0.3 : 0.1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="p-3">
              <h4 className="font-bold text-amber-800">Traditions</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {country.region === 'Europe' ? 
                  `Rich heritage of folklore, seasonal celebrations, and historical commemorations.` :
                 country.region === 'Asia' ? 
                  `Ancient traditions honoring ancestors, nature, and spiritual beliefs.` :
                 country.region === 'Africa' ? 
                  `Vibrant cultural practices celebrating community, storytelling, and rhythmic expression.` :
                 country.region === 'Americas' ? 
                  `Blend of indigenous customs, colonial influences, and modern adaptations.` :
                  `Unique local customs shaped by geography, history, and cultural exchange.`
                }
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Cultural Region Section - Interactive Maps approach */}
      {country.region && (
        <motion.div
          variants={itemVariants}
          className="bg-amber-50 p-4 rounded-lg border border-amber-100"
          whileHover={{
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            borderColor: flagColors[0] || '#fbbf24',
            transition: { duration: 0.3 }
          }}
        >
          <motion.div 
            className="flex items-center gap-2 mb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div 
              className="p-2 bg-amber-200 rounded-full text-amber-700"
              whileHover={{ rotate: 15, scale: 1.1 }}
            >
              <FaGlobe />
            </motion.div>
            <h3 className="text-lg font-semibold text-amber-700">Cultural Region</h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm text-gray-600 mb-3">
              {country.name.common} is located in <span className="font-medium">{country.region}</span>
              {country.subregion ? `, specifically in ${country.subregion}` : ''}.
              Countries in this region often share cultural influences, historical connections, and regional traditions.
            </p>
            
            <motion.div
              className="p-4 bg-white rounded-lg shadow-sm border-l-4"
              style={{ borderColor: flagColors[0] || '#f59e0b' }}
              whileHover={{ 
                y: -4,
                boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3">
                <FaDrumSteelpan className="text-amber-600 text-xl" />
                <h4 className="font-medium text-amber-800">Regional Cultural Influences</h4>
              </div>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Shared culinary traditions and ingredients</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Similar music styles and dance forms</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Common architectural elements and crafts</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Regional religious practices and beliefs</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
          
          {/* Interactive color strip showing region */}
          <motion.div 
            className="mt-4 h-2 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.div 
              className="h-full"
              style={{ 
                background: `linear-gradient(to right, ${flagColors[0] || '#f59e0b'}, ${flagColors[1] || '#fbbf24'}, ${flagColors[2] || '#f59e0b'})` 
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 0%'],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: 'reverse' 
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CultureTab;