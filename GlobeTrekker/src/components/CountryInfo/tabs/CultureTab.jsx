import { motion } from 'framer-motion';

const CultureTab = ({ country }) => {
  return (
    <div className="space-y-6">
      <motion.div 
        className="bg-amber-50 p-4 rounded-lg border border-amber-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-lg font-semibold text-amber-700 mb-2">Culture & Language</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Languages</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {country.languages ? 
                Object.entries(country.languages).map(([code, name]) => (
                  <div 
                    key={code} 
                    className="bg-white px-2 py-1 rounded border border-amber-100 text-sm"
                  >
                    {name}
                  </div>
                )) : 
                "N/A"
              }
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Calling Code</p>
            <p className="font-medium">
              {country?.idd?.root}{country?.idd?.suffixes?.[0] || ""}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Common Greeting</p>
            <p className="font-medium">Hello / {
              country.languages ? 
                Object.values(country.languages)[0] === 'English' ? 
                  'Hello' : 
                  {
                    'Spanish': '¡Hola!',
                    'French': 'Bonjour!',
                    'German': 'Hallo!',
                    'Chinese': '你好!',
                    'Arabic': 'مرحبا!',
                    'Hindi': 'नमस्ते!',
                    'Portuguese': 'Olá!',
                    'Russian': 'Привет!'
                  }[Object.values(country.languages)[0]] || '...'
                : '...'
            }</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CultureTab;