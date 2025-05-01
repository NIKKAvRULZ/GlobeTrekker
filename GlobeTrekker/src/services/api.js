import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';
const WEATHER_API_KEY = 'f4e503abc6e6763fe78d8a6d37196196'; // Replace with your OpenWeatherMap API key

const api = {
  getAllCountries: async () => {
    try {
      const response = await fetch(`${BASE_URL}/all`);
      if (!response.ok) throw new Error('Failed to fetch countries');
      return await response.json();
    } catch (error) {
      console.error('Error fetching all countries:', error);
      return [];
    }
  },

  getCountryStatistics: async () => {
    try {
      const countries = await api.getAllCountries();
      const continents = [...new Set(countries.map(country => country.region))];
      const population = countries.reduce((acc, country) => acc + (country.population || 0), 0);
      
      return {
        total: countries.length,
        continents,
        population,
        languages: new Set(countries.flatMap(country => 
          country.languages ? Object.values(country.languages) : []
        )).size
      };
    } catch (error) {
      console.error('Error getting country statistics:', error);
      return { total: 0, continents: [], population: 0, languages: 0 };
    }
  },

  searchCountries: async (term) => {
    if (!term) return [];
    try {
      const response = await fetch(`${BASE_URL}/name/${term}`);
      if (!response.ok) {
        if (response.status === 404) return [];
        throw new Error('Failed to search countries');
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching countries:', error);
      return [];
    }
  },

  getWeatherData: async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
      );
      if (!response.ok) throw new Error('Failed to fetch weather data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching weather:', error);
      throw error;
    }
  },

  countries: {
    search: async (searchTerm) => {
      if (!searchTerm) return [];
      
      try {
        const response = await axios.get(`${BASE_URL}/name/${encodeURIComponent(searchTerm)}`);
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return [];
        }
        console.error('Error searching countries:', error);
        return [];
      }
    },

    getByCode: async (code) => {
      try {
        const response = await axios.get(`${BASE_URL}/alpha/${code}`);
        return response.data[0];
      } catch (error) {
        console.error('Error fetching country:', error);
        throw error;
      }
    },

    getByRegion: async (region) => {
      try {
        const response = await axios.get(`${BASE_URL}/region/${region}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching countries by region:', error);
        throw error;
      }
    }
  },

  maps: {
    getTileLayer: () => ({
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }),
    
    getGeoJSON: async (countryName) => {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
        );
        return response.data.features.find(
          feature => feature.properties.ADMIN === countryName
        );
      } catch (error) {
        console.error('Error fetching GeoJSON:', error);
        throw error;
      }
    }
  }
};

export default api;