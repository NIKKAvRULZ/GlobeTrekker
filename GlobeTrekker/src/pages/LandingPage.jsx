import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const LandingPage = () => {
  const controls = useAnimation();
  const [currentCountry, setCurrentCountry] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);
  
  const countries = [
    { name: "France", emoji: "🇫🇷", color: "bg-blue-100", landmark: "Eiffel Tower", fact: "Has the most time zones of any country (12)" },
    { name: "Japan", emoji: "🇯🇵", color: "bg-red-100", landmark: "Mount Fuji", fact: "Has over 5 million vending machines" },
    { name: "Brazil", emoji: "🇧🇷", color: "bg-green-100", landmark: "Christ the Redeemer", fact: "Home to 60% of the Amazon rainforest" },
    { name: "Egypt", emoji: "🇪🇬", color: "bg-yellow-100", landmark: "Great Pyramid of Giza", fact: "The Nile is the world's longest river" },
  ];

  // Plane animation sequence
  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        x: [0, 200, 200, 0, -200, -200, 0],
        y: [0, -100, 100, 0, -100, 100, 0],
        rotate: [0, 15, -15, 0, -15, 15, 0],
        transition: { duration: 8, ease: "easeInOut" }
      });
      
      // Landing animation
      await controls.start({
        scale: [1, 1.2, 1],
        transition: { duration: 1 }
      });
    };
    sequence();
    
    // Country rotation
    const interval = setInterval(() => {
      setCurrentCountry((prev) => (prev + 1) % countries.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [controls, countries.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-50 overflow-x-hidden">
      {/* Animated Plane */}
      <div className="relative h-64 overflow-hidden">
        <motion.div
          animate={controls}
          className="absolute top-1/2 left-1/2 text-5xl z-20"
        >
          ✈️
        </motion.div>
        
        {/* Cloud background */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, 100 * (i % 2 === 0 ? 1 : -1)],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className={`absolute text-4xl opacity-30 ${i % 2 === 0 ? 'text-gray-400' : 'text-white'}`}
              style={{
                top: `${20 + i * 15}%`,
                left: `${i * 15}%`
              }}
            >
              ☁️
            </motion.div>
          ))}
        </div>
      </div>

      {/* Landing Zone */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 8, duration: 1 }}
        className="text-center px-4 py-12"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
          Global Explorer
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your passport to the world's most fascinating destinations
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-block"
        >
          <Link 
            to="/signup" 
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full text-lg font-semibold shadow-lg block"
          >
            Start Your Journey
          </Link>
        </motion.div>
      </motion.div>

      {/* Interactive Pre-Login Content */}
      <div ref={ref} className="px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-center">Featured Destination</h2>
          <motion.div
            key={currentCountry}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-lg ${countries[currentCountry].color} text-center`}
          >
            <div className="text-6xl mb-4">{countries[currentCountry].emoji}</div>
            <h3 className="text-2xl font-bold mb-2">{countries[currentCountry].name}</h3>
            <p className="text-lg mb-2">🏛️ {countries[currentCountry].landmark}</p>
            <p className="text-sm">💡 Did you know? {countries[currentCountry].fact}</p>
          </motion.div>
          
          <div className="flex justify-center mt-4 space-x-2">
            {countries.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCountry(index)}
                className={`w-3 h-3 rounded-full ${currentCountry === index ? 'bg-blue-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
        >
          {['🗺️ Interactive Maps', '📚 Cultural Guides', '🍽️ Local Cuisine'].map((feature, i) => (
            <motion.div
              key={feature}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="text-4xl mb-3">{feature.split(' ')[0]}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.substring(2)}</h3>
              <p className="text-gray-600">Explore detailed information about each destination</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Explore?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full text-lg font-semibold shadow-lg"
              >
                Login
              </motion.button>
            </Link>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full text-lg font-semibold shadow-lg"
              >
                Sign Up
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;