import axios from 'axios';

// Base API functions using fetch
export const getAllCountries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};

export const searchCountries = async (term) => {
  if (!term) return [];
  
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${term}`);
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching countries:', error);
    return [];
  }
};

export const getWeatherData = async (city) => {
  const API_KEY = 'f4e503abc6e6763fe78d8a6d37196196'; // Normally would be in .env
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

export const getCountryStatistics = async () => {
  try {
    const countries = await getAllCountries();
    
    const continents = [...new Set(countries.map(country => country.region).filter(Boolean))];
    const population = countries.reduce((sum, country) => sum + (country.population || 0), 0);
    
    const allLanguages = countries
      .flatMap(country => country.languages ? Object.values(country.languages) : [])
      .filter(Boolean);
    
    const uniqueLanguages = [...new Set(allLanguages)];
    
    return {
      total: countries.length,
      continents,
      population,
      languages: uniqueLanguages.length
    };
  } catch (error) {
    console.error('Error calculating statistics:', error);
    return {
      total: 0,
      continents: [],
      population: 0,
      languages: 0
    };
  }
};

// Namespaced API using axios
export const countries = {
  search: async (term) => {
    if (!term) return [];
    
    try {
      const { data } = await axios.get(`https://restcountries.com/v3.1/name/${term}`);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return [];
      }
      throw error;
    }
  },
  
  getByCode: async (code) => {
    const { data } = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
    return data[0];
  },
  
  getByRegion: async (region) => {
    const { data } = await axios.get(`https://restcountries.com/v3.1/region/${region}`);
    return data;
  }
};

// Maps API utilities
export const maps = {
  getTileLayer: () => ({
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }),
  
  getGeoJSON: async (countryName) => {
    const { data } = await axios.get('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson');
    
    if (!countryName) {
      return data;
    }
    
    // Filter features to only include the requested country
    const countryFeature = data.features.find(feature => 
      feature.properties.ADMIN.toLowerCase() === countryName.toLowerCase()
    );
    
    return countryFeature || null;
  }
};

export default {
  getAllCountries,
  searchCountries,
  getWeatherData,
  getCountryStatistics,
  countries,
  maps
};