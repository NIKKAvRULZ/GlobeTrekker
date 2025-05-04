import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import CountryList from './CountryList';
import * as api from '../services/api';

// Mock the API service
jest.mock('../services/api');

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
    
    // Set up the mock before rendering
    api.getAllCountries.mockResolvedValue(mockCountries);
    
    // Wrap the render in act
    await act(async () => {
      render(<CountryList />);
    });
    
    // Check that component shows loading initially
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    // Wait for the countries to load and component to update
    await waitFor(() => {
      expect(screen.getByText('USA')).toBeInTheDocument();
      expect(screen.getByText('Canada')).toBeInTheDocument();
    });
  });

  it('should filter countries when searching', async () => {
    const allCountries = [
      { name: { common: 'USA' }, flags: { png: 'usa-flag.png' }, cca3: 'USA' },
      { name: { common: 'Canada' }, flags: { png: 'canada-flag.png' }, cca3: 'CAN' }
    ];
    
    const filteredCountries = [
      { name: { common: 'USA' }, flags: { png: 'usa-flag.png' }, cca3: 'USA' }
    ];
    
    // Set up the mocks
    api.getAllCountries.mockResolvedValue(allCountries);
    api.searchCountries.mockResolvedValue(filteredCountries);
    
    // Render with act
    await act(async () => {
      render(<CountryList />);
    });
    
    // Wait for initial countries to load
    await waitFor(() => {
      expect(screen.queryByText('USA')).toBeInTheDocument();
      expect(screen.queryByText('Canada')).toBeInTheDocument();
    });
    
    // Type in search box - wrap in act
    await act(async () => {
      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'USA' } });
    });
    
    // Wait for search results
    await waitFor(() => {
      expect(api.searchCountries).toHaveBeenCalledWith('USA');
      expect(screen.queryByText('USA')).toBeInTheDocument();
      expect(screen.queryByText('Canada')).not.toBeInTheDocument();
    });
  });

  it('should show error message when API fails', async () => {
    // Mock the API to reject
    api.getAllCountries.mockRejectedValue(new Error('API failed'));
    
    // Render with act
    await act(async () => {
      render(<CountryList />);
    });
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/error loading countries/i)).toBeInTheDocument();
    });
  });
});