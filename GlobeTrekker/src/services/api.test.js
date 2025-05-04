import * as api from './api';
import axios from 'axios';

// api.test.js

// Mock fetch and axios
global.fetch = jest.fn();
jest.mock('axios');

describe('API Service', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  // Unit tests for getAllCountries
  describe('getAllCountries', () => {
    it('should fetch countries from the API', async () => {
      const mockCountries = [{ name: { common: 'USA' } }];
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCountries
      });

      const result = await api.getAllCountries();
      
      expect(global.fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
      expect(result).toEqual(mockCountries);
    });

    it('should handle errors and return empty array', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
      });

      const result = await api.getAllCountries();
      
      expect(result).toEqual([]);
    });

    it('should handle network errors', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await api.getAllCountries();
      
      expect(result).toEqual([]);
    });
  });

  // Unit tests for getCountryStatistics
  describe('getCountryStatistics', () => {
    it('should calculate statistics correctly', async () => {
      const mockCountries = [
        { 
          name: { common: 'USA' }, 
          region: 'Americas', 
          population: 331000000,
          languages: { eng: 'English' }
        },
        { 
          name: { common: 'France' }, 
          region: 'Europe', 
          population: 67000000,
          languages: { fra: 'French' }
        }
      ];
      
      // Mock the getAllCountries method to return our mock data
      jest.spyOn(api, 'getAllCountries').mockResolvedValueOnce(mockCountries);

      const result = await api.getCountryStatistics();
      
      expect(result).toEqual({
        total: 2,
        continents: ['Americas', 'Europe'],
        population: 398000000,
        languages: 2
      });
    });

    it('should handle empty country list', async () => {
      jest.spyOn(api, 'getAllCountries').mockResolvedValueOnce([]);

      const result = await api.getCountryStatistics();
      
      expect(result).toEqual({
        total: 0,
        continents: [],
        population: 0,
        languages: 0
      });
    });

    it('should handle errors in getAllCountries', async () => {
      jest.spyOn(api, 'getAllCountries').mockRejectedValueOnce(new Error('API error'));

      const result = await api.getCountryStatistics();
      
      expect(result).toEqual({
        total: 0,
        continents: [],
        population: 0,
        languages: 0
      });
    });
  });

  // Unit tests for searchCountries
  describe('searchCountries', () => {
    it('should search countries by term', async () => {
      const mockResult = [{ name: { common: 'Canada' } }];
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResult
      });

      const result = await api.searchCountries('Canada');
      
      expect(global.fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/name/Canada');
      expect(result).toEqual(mockResult);
    });

    it('should return empty array when search term is empty', async () => {
      const result = await api.searchCountries('');
      
      expect(global.fetch).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should return empty array for 404 responses', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      const result = await api.searchCountries('NonExistent');
      
      expect(result).toEqual([]);
    });
  });

  // Unit tests for getWeatherData
  describe('getWeatherData', () => {
    it('should fetch weather data successfully', async () => {
      const mockWeather = { main: { temp: 25 }, weather: [{ description: 'sunny' }] };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockWeather
      });

      const result = await api.getWeatherData('London');
      
      expect(global.fetch).toHaveBeenCalledWith(
        `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=f4e503abc6e6763fe78d8a6d37196196`
      );
      expect(result).toEqual(mockWeather);
    });

    it('should throw error when fetch fails', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false
      });

      await expect(api.getWeatherData('London')).rejects.toThrow('Failed to fetch weather data');
    });
  });

  // Unit tests for countries.search
  describe('countries.search', () => {
    it('should search countries by term using axios', async () => {
      const mockData = [{ name: { common: 'Germany' } }];
      axios.get.mockResolvedValueOnce({ data: mockData });

      const result = await api.countries.search('Germany');
      
      expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/name/Germany');
      expect(result).toEqual(mockData);
    });

    it('should handle 404 and return empty array', async () => {
      axios.get.mockRejectedValueOnce({ response: { status: 404 } });

      const result = await api.countries.search('NonExistentCountry');
      
      expect(result).toEqual([]);
    });

    it('should return empty array for empty search term', async () => {
      const result = await api.countries.search('');
      
      expect(axios.get).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  // Unit tests for countries.getByCode
  describe('countries.getByCode', () => {
    it('should get country by code', async () => {
      const mockCountry = { name: { common: 'Germany' } };
      axios.get.mockResolvedValueOnce({ data: [mockCountry] });

      const result = await api.countries.getByCode('de');
      
      expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/alpha/de');
      expect(result).toEqual(mockCountry);
    });

    it('should throw error when fetch fails', async () => {
      axios.get.mockRejectedValueOnce(new Error('API error'));

      await expect(api.countries.getByCode('invalid')).rejects.toThrow('API error');
    });
  });

  // Unit tests for countries.getByRegion
  describe('countries.getByRegion', () => {
    it('should get countries by region', async () => {
      const mockCountries = [{ name: { common: 'Germany' } }, { name: { common: 'France' } }];
      axios.get.mockResolvedValueOnce({ data: mockCountries });

      const result = await api.countries.getByRegion('europe');
      
      expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/region/europe');
      expect(result).toEqual(mockCountries);
    });

    it('should throw error when fetch fails', async () => {
      axios.get.mockRejectedValueOnce(new Error('API error'));

      await expect(api.countries.getByRegion('invalid')).rejects.toThrow('API error');
    });
  });

  // Unit tests for maps.getTileLayer
  describe('maps.getTileLayer', () => {
    it('should return correct tile layer configuration', () => {
      const result = api.maps.getTileLayer();
      
      expect(result).toEqual({
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });
    });
  });

  // Unit tests for maps.getGeoJSON
  describe('maps.getGeoJSON', () => {
    it('should get GeoJSON for a country', async () => {
      const mockFeatures = [
        { properties: { ADMIN: 'Germany' }, geometry: {} },
        { properties: { ADMIN: 'France' }, geometry: {} }
      ];
      
      axios.get.mockResolvedValueOnce({ 
        data: { 
          features: mockFeatures
        } 
      });

      const result = await api.maps.getGeoJSON('Germany');
      
      expect(axios.get).toHaveBeenCalledWith(
        'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
      );
      expect(result).toEqual(mockFeatures[0]);
    });

    it('should throw error when fetch fails', async () => {
      axios.get.mockRejectedValueOnce(new Error('GeoJSON error'));

      await expect(api.maps.getGeoJSON('Germany')).rejects.toThrow('GeoJSON error');
    });
  });

  // Integration tests
  describe('Integration tests', () => {
    it('should integrate getAllCountries and getCountryStatistics', async () => {
      const mockCountries = [{
        name: { common: 'USA' },
        region: 'Americas',
        population: 331002651,
        languages: { eng: 'English' }
      }];
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCountries
      });
      
      const stats = await api.getCountryStatistics();
      
      expect(global.fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
      expect(stats).toEqual({
        total: 1,
        continents: ['Americas'],
        population: 331002651,
        languages: 1
      });
    });
  });
});