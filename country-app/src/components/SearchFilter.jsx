import { useState } from 'react';
import { useCountries } from '../context/CountryContext';

const SearchFilter = () => {
  const { searchCountries, filterByRegion } = useCountries();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const regions = ['all', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  const handleSearch = (e) => {
    e.preventDefault();
    searchCountries(searchTerm);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    filterByRegion(region);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <form onSubmit={handleSearch} className="w-full md:w-1/2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a country..."
            className="w-full py-3 px-4 pl-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </form>
      
      <div className="w-full md:w-auto">
        <select
          className="w-full py-3 px-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          value={selectedRegion}
          onChange={(e) => handleRegionChange(e.target.value)}
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {region === 'all' ? 'Filter by Region' : region}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;