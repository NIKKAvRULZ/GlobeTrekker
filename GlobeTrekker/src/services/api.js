import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

const api = {
  getAllCountries: async () => {
    try {
      // Fixed URL - removed the duplicate /all
      const response = await axios.get(`${BASE_URL}/all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
    }
  },

  getCountryStatistics: async () => {
    try {
      const countries = await api.getAllCountries();
      return {
        total: countries.length,
        population: countries.reduce((acc, country) => acc + (country.population || 0), 0),
        continents: [...new Set(countries.map(country => country.region))],
        languages: new Set(
          countries.flatMap(country => 
            country.languages ? Object.values(country.languages) : []
          )
        ).size
      };
    } catch (error) {
      console.error('Error calculating statistics:', error);
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