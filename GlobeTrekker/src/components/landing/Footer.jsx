import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">GlobeTrekker</h3>
            <p className="text-gray-400 max-w-xs">Your complete guide to the countries of the world, with comprehensive data and fascinating insights.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-4 text-blue-300">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>API Access</li>
                <li>Documentation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-blue-300">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-blue-300">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Data Sources</li>
              </ul>
            </div>
          </div>
        </div>
        
        <hr className="my-8 border-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} GlobeTrekker. All rights reserved.</p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            {['Twitter', 'Facebook', 'Instagram', 'GitHub'].map(social => (
              <motion.a 
                key={social} 
                href="#" 
                className="text-gray-400 hover:text-white transition"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {social[0]}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;