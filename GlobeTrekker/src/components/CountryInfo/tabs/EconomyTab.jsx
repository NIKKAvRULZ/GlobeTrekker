import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';

const EconomyTab = ({ country }) => {
  const [gdpData, setGdpData] = useState({
    value: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    // Reset state when country changes
    setGdpData({ value: null, loading: true, error: null });
    
    const fetchGDPData = async () => {
      try {
        // Option 1: World Bank API
        const countryCode = country.cca3 || country.cca2;
        const response = await fetch(
          `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.PCAP.CD?date=2020:2022&format=json`
        );
        const data = await response.json();
        
        // World Bank API returns an array where index 1 contains the actual data
        if (data && Array.isArray(data) && data.length > 1 && data[1] && data[1].length > 0) {
          // Find most recent non-null value
          const gdpValue = data[1].find(item => item.value !== null);
          if (gdpValue) {
            setGdpData({
              value: gdpValue.value,
              year: gdpValue.date,
              loading: false,
              error: null
            });
          } else {
            // Fallback to option 2 if no data found
            throw new Error('No GDP data found');
          }
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        try {
          // Option 2: Alternative API (restcountries.com v2 or v3.1 with extended fields)
          const response = await fetch(`https://restcountries.com/v3.1/alpha/${country.cca3}?fields=capitalInfo,population,area,flags,name,gdp`);
          const data = await response.json();
          
          if (data && data.gdp) {
            setGdpData({
              value: data.gdp.capita,
              loading: false,
              error: null
            });
          } else {
            // If all APIs fail, use an estimation based on region averages (very approximate)
            const regionGDPEstimates = {
              'Europe': 34000,
              'North America': 45000,
              'Asia': 7500, 
              'South America': 9000,
              'Oceania': 27000,
              'Africa': 3500
            };
            
            const estimatedGDP = regionGDPEstimates[country.region] || 10000;
            setGdpData({
              value: estimatedGDP,
              loading: false,
              estimated: true,
              error: null
            });
          }
        } catch (secondError) {
          setGdpData({
            value: null,
            loading: false,
            error: 'Could not fetch GDP data'
          });
        }
      }
    };

    if (country && (country.cca3 || country.cca2)) {
      fetchGDPData();
    } else {
      setGdpData({
        value: null, 
        loading: false,
        error: 'Country code not available'
      });
    }
  }, [country.cca3, country.cca2]);

  return (
    <div className="space-y-6">
      <motion.div 
        className="bg-emerald-50 p-4 rounded-lg border border-emerald-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-lg font-semibold text-emerald-700 mb-2">Economy & Currency</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Currencies</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {country.currencies ? 
                Object.entries(country.currencies).map(([code, { name, symbol }]) => (
                  <div 
                    key={code} 
                    className="bg-white px-2 py-1 rounded border border-emerald-100 text-sm"
                  >
                    <span className="font-medium">{code}</span>: {name} ({symbol})
                  </div>
                )) : 
                "N/A"
              }
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">GDP Per Capita</p>
            {gdpData.loading ? (
              <div className="flex items-center gap-2 text-emerald-600">
                <FaSpinner className="animate-spin" />
                <p className="font-medium">Loading GDP data...</p>
              </div>
            ) : gdpData.error ? (
              <p className="font-medium text-gray-500">Data not available</p>
            ) : (
              <div>
                <p className="font-medium">${gdpData.value.toLocaleString()} USD 
                  {gdpData.year && <span className="text-sm text-gray-500 ml-1">({gdpData.year})</span>}
                  {gdpData.estimated && <span className="text-xs text-amber-500 ml-1">(estimated)</span>}
                </p>
                {gdpData.value && (
                  <div className="mt-1 bg-gray-100 h-2 rounded-full overflow-hidden w-full">
                    <motion.div 
                      className="h-full bg-emerald-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (gdpData.value / 60000) * 100)}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm text-gray-500">Car Side</p>
            <p className="font-medium">{country.car?.side || "N/A"}</p>
          </div>
          
          {/* You could add more economic indicators here */}
          <div>
            <p className="text-sm text-gray-500">Main Industries</p>
            <p className="font-medium">
              {country.region === 'Europe' ? 'Services, Manufacturing, Technology' :
               country.region === 'Asia' ? 'Manufacturing, Technology, Agriculture' :
               country.region === 'North America' ? 'Services, Technology, Manufacturing' :
               country.region === 'South America' ? 'Agriculture, Mining, Manufacturing' :
               country.region === 'Africa' ? 'Agriculture, Mining, Services' :
               country.region === 'Oceania' ? 'Services, Agriculture, Tourism' :
               'Data not available'}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EconomyTab;