import { motion, AnimatePresence } from 'framer-motion';
import { memo, useState, useEffect } from 'react';
import CountryHeader from './CountryHeader';
import CountryStats from './CountryStats';
import CountryDetailsModal from './CountryDetailsModal';

const CountryInfoPanel = memo(({ country, onClose }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateStats(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {country && (
        <>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: { 
                type: 'spring',
                stiffness: 150,
                damping: 20,
                when: "beforeChildren",
                staggerChildren: 0.1
              }
            }}
            exit={{ 
              opacity: 0, 
              x: -100,
              transition: { 
                ease: 'easeInOut',
                duration: 0.3
              }
            }}
            className="fixed top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl 
                   max-w-md w-full md:w-[400px] overflow-hidden z-50 border border-gray-100"
          >
            <CountryHeader country={country} onClose={onClose} />
            <CountryStats 
              country={country} 
              animateStats={animateStats} 
              setShowDetails={setShowDetails} 
            />
          </motion.div>

          <CountryDetailsModal 
            country={country} 
            showDetails={showDetails} 
            setShowDetails={setShowDetails} 
          />
        </>
      )}
    </AnimatePresence>
  );
});

CountryInfoPanel.displayName = 'CountryInfoPanel';
export default CountryInfoPanel;