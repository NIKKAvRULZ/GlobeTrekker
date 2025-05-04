import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CountryList from './CountryList';

// Mock the API service
jest.mock('../services/api', () => ({
  getAllCountries: jest.fn(),
  searchCountries: jest.fn()
}));

describe('CountryList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    render(<CountryList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should render the country list after loading', async () => {
    const mockCountries = [
      { name: { common: 'USA' }, flags: { png: 'usa-flag.png' }, cca3: 'USA' },
      { name: { common: 'Canada' }, flags: { png: 'canada-flag.png' }, cca3: 'CAN' }
    ];
    
    require('../services/api').getAllCountries.mockResolvedValue(mockCountries);
    
    render(<CountryList />);
    
    // Wait for countries to load
    const usaElement = await screen.findByText('USA');
    expect(usaElement).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
  });

  it('should filter countries when searching', async () => {
    const mockCountries = [
      { name: { common: 'USA' }, flags: { png: 'usa-flag.png' }, cca3: 'USA' }
    ];
    
    require('../services/api').searchCountries.mockResolvedValue(mockCountries);
    
    render(<CountryList />);
    
    // Type in search box
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'USA' } });
    
    // Wait for search results
    const countryElement = await screen.findByText('USA');
    expect(countryElement).toBeInTheDocument();
  });

  it('should show error message when API fails', async () => {
    require('../services/api').getAllCountries.mockRejectedValue(new Error('API failed'));
    
    render(<CountryList />);
    
    const errorMessage = await screen.findByText(/error loading countries/i);
    expect(errorMessage).toBeInTheDocument();
  });
});