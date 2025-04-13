import axios from "axios";

const API_BASE = 'https://restcountries.com/v3.1';

export const fetchCountries = async () => {
    try {
        const response = await axios.get(`${API_BASE}/all`);
        return response.data;
    } catch(error) {
        console.error("Error fetching countries:", error);
        return [];
    }
};

export const fetchCountryByName = async (name) => {
    try {
        const response = await axios.get(`${API_BASE}/name/${name}`);
        return response.data;
    } catch(error) {
        console.error(`Error fetching country by name (${name}):`, error);
        return null;
    }
};

export const fetchCountryByRegion = async (region) => {
    try {
        const response = await axios.get(`${API_BASE}/region/${region}`);
        return response.data;
    } catch(error) {
        console.error(`Error fetching countries by region (${region}):`, error);
        return [];
    }
};

export const fetchCountryByCode = async (code) => {
    try {
        const response = await axios.get(`${API_BASE}/alpha/${code}`);
        return response.data;
    } catch(error) {
        console.error(`Error fetching country by code (${code}):`, error);
        return null;
    }
}


