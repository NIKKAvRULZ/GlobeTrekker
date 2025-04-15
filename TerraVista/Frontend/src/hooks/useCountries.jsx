import { useState, useEffect } from 'react';
import { 
  getAllCountries, 
  getCountryByName, 
  getCountriesByRegion 
} from '../services/api';

export const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [regionFilter, setRegionFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        let data;
        
        if (searchTerm) {
          data = await getCountryByName(searchTerm);
        } else if (regionFilter !== 'all') {
          data = await getCountriesByRegion(regionFilter);
        } else {
          data = await getAllCountries();
        }
        
        setCountries(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch countries. Please try again.');
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [regionFilter, searchTerm]);

  return {
    countries,
    loading,
    error,
    regionFilter,
    setRegionFilter,
    searchTerm,
    setSearchTerm
  };
};