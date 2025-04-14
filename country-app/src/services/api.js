import axios from 'axios';

const API_BASE = 'https://restcountries.com/v3.1';

// Named exports (using export keyword before each function)
export const fetchAllCountries = async () => {
  try {
    const response = await axios.get(`${API_BASE}/all`);
    return response.data || []; // Ensure array is returned
  } catch (error) {
    console.error('Error fetching all countries:', error);
    return []; // Return empty array on error
  }
};

export const fetchCountryByName = async (name) => {
  try {
    const response = await axios.get(`${API_BASE}/name/${name}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching country by name:', error);
    return null;
  }
};

export const fetchCountriesByRegion = async (region) => {
  try {
    const response = await axios.get(`${API_BASE}/region/${region}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries by region:', error);
    return [];
  }
};

export const fetchCountryByCode = async (code) => {
  try {
    const response = await axios.get(`${API_BASE}/alpha/${code}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching country by code:', error);
    return null;
  }
};