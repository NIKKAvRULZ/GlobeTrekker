import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const API_BASE = 'https://restcountries.com/v3.1';

const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const fetchAllCountries = async () => {
    try {
      const response = await axios.get(`${API_BASE}/all`);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch countries:', err);
      throw new Error('Failed to load countries. Please try again later.');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAllCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const searchCountries = async (name) => {
    if (!name.trim()) {
      setFilteredCountries(countries);
      return;
    }
    try {
      const response = await axios.get(`${API_BASE}/name/${name}`);
      setFilteredCountries(response.data);
    } catch (err) {
      setFilteredCountries([]);
      setError(new Error('No countries found matching your search'));
    }
  };

  const filterByRegion = async (region) => {
    if (region === 'all') {
      setFilteredCountries(countries);
      return;
    }
    try {
      const response = await axios.get(`${API_BASE}/region/${region}`);
      setFilteredCountries(response.data);
    } catch (err) {
      setError(new Error('Failed to filter by region'));
    }
  };

  return (
    <CountryContext.Provider
      value={{
        countries,
        filteredCountries,
        loading,
        error,
        selectedCountry,
        searchCountries,
        filterByRegion,
        setSelectedCountry,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export const useCountries = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountries must be used within a CountryProvider');
  }
  return context;
};