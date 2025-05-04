import { motion } from "framer-motion";

const FeaturesSection = () => {
  const features = [
    {
      icon: "🗺️",
      title: "Detailed Maps",
      description: "Interactive maps showing borders, capitals, major cities and geographical features."
    },
    {
      icon: "🏛️",
      title: "Rich History",
      description: "Learn about the cultural heritage, historical landmarks and evolution of each nation."
    },
    {
      icon: "📊",
      title: "Live Statistics",
      description: "Up-to-date demographic information, economic indicators, and social metrics."
    },
    {
      icon: "🌐",
      title: "Language Guides",
      description: "Information about official languages, regional dialects, and common phrases."
    },
    {
      icon: "💰",
      title: "Currency Details",
      description: "Exchange rates, currency history, and payment practices for travelers."
    },
    {
      icon: "🍲",
      title: "Cultural Insights",
      description: "Discover local cuisines, traditions, celebrations, and cultural norms."
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-2">What You'll Discover</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            GlobeTrekker provides comprehensive information about every country in the world.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <motion.div 
                className="text-4xl mb-4"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;