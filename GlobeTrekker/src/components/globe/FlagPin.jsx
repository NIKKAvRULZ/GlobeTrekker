import { motion } from 'framer-motion';

const FlagPin = ({ flagUrl, countryName }) => {
  return (
    <motion.div 
      className="flag-pin-wrapper"
      initial={{ y: -10 }}
      animate={{ y: 0 }}
      whileHover={{ scale: 1.1 }}
    >
      {/* Outer pulse animation */}
      <motion.div
        className="pin-pulse outer"
        animate={{
          scale: [1, 2],
          opacity: [0.3, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />

      {/* Inner pulse animation */}
      <motion.div
        className="pin-pulse inner"
        animate={{
          scale: [1, 1.5],
          opacity: [0.5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.3
        }}
      />

      {/* Pin stem with shadow */}
      <motion.div
        className="pin-stem"
        animate={{
          height: ["8px", "10px", "8px"]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Flag container with hover effects */}
      <motion.div
        className="pin-flag"
        whileHover={{ 
          scale: 1.2,
          rotate: [0, -5, 5, 0],
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300,
          rotate: {
            duration: 0.5
          }
        }}
      >
        <img 
          src={flagUrl} 
          alt={`${countryName} flag`}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
};

export default FlagPin;