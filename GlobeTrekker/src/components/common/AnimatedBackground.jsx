import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute -top-20 -left-20 w-[40vw] h-[40vw] bg-blue-400/20 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-[45vw] h-[45vw] bg-cyan-400/20 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -30, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
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

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]" />
      
      {/* Glass Effect */}
      <div className="absolute inset-0 backdrop-blur-[100px]" />
    </div>
  );
};

export default AnimatedBackground;