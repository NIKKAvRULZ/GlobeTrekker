import { renderHook, act } from '@testing-library/react-hooks';
import { CountryProvider, useCountries } from './CountryContext';
import { fetchAllCountries, fetchCountryByName } from '../services/api';

jest.mock('../services/api');

describe('CountryContext', () => {
  const mockCountries = [
    {
      cca3: 'USA',
      name: { common: 'United States' },
      population: 331002651,
      region: 'Americas',
      capital: ['Washington, D.C.'],
    },
    {
      cca3: 'CAN',
      name: { common: 'Canada' },
      population: 38005238,
      region: 'Americas',
      capital: ['Ottawa'],
    },
  ];

  beforeEach(() => {
    fetchAllCountries.mockResolvedValue(mockCountries);
    fetchCountryByName.mockImplementation((name) =>
      Promise.resolve(mockCountries.filter((c) => c.name.common.toLowerCase().includes(name.toLowerCase())))
    );
  });

  it('fetches and sets countries on load', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCountries(), {
      wrapper: CountryProvider,
    });

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.countries).toEqual(mockCountries);
    expect(result.current.filteredCountries).toEqual(mockCountries);
  });

  it('filters countries by name', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCountries(), {
      wrapper: CountryProvider,
    });

    await waitForNextUpdate();
    act(() => {
      result.current.searchCountries('united');
    });

    expect(result.current.filteredCountries).toEqual([mockCountries[0]]);
  });
});