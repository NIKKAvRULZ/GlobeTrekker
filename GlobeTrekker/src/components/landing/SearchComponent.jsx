import { useState } from 'react';
import api from '../../services/api';

const SearchComponent = ({ onSearchResults = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length < 2) {
      setResults([]);
      onSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await api.countries.search(value);
      setResults(searchResults);
      onSearchResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      onSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search countries by name, capital, or region..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
        </div>
      )}

      {/* Search Results Dropdown */}
      {results.length > 0 && searchTerm && (
        <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {results.map((country) => (
            <div
              key={country.cca3}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-3"
              onClick={() => {
                // Handle country selection here
                setSearchTerm('');
                setResults([]);
              }}
            >
              <img
                src={country.flags.svg}
                alt={`${country.name.common} flag`}
                className="w-8 h-6 object-cover rounded"
              />
              <div>
                <div className="font-medium">{country.name.common}</div>
                <div className="text-sm text-gray-500">
                  {country.capital?.[0] || 'No capital'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;