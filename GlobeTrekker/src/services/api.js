import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';
const WEATHER_API_KEY = 'your_openweather_api_key';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

const api = {
  countries: {
    getAll: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/all`);
        return response.data;
      } catch (error) {
        console.error('Error fetching countries:', error);  
        throw error;
      }
    },

    search: async (searchTerm) => {
      try {
        const response = await axios.get(`${BASE_URL}/name/${searchTerm}`);
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return [];
        }
        throw error;
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
    }
  },

  weather: {
    getByCity: async (city) => {
      try {
        const response = await axios.get(`${WEATHER_BASE_URL}/weather`, {
          params: {
            q: city,
            appid: WEATHER_API_KEY,
            units: 'metric'
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching weather:', error);
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