import { render, screen } from '@testing-library/react';
import CountryCard from './CountryCard';
import { BrowserRouter } from 'react-router-dom';

const mockCountry = {
  cca3: 'USA',
  name: { common: 'United States' },
  flags: { png: 'https://flagcdn.com/us.png' },
  population: 331002651,
  region: 'Americas',
  capital: ['Washington, D.C.'],
};

describe('CountryCard', () => {
  it('renders country information correctly', () => {
    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>
    );

    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Population: 331,002,651')).toBeInTheDocument();
    expect(screen.getByText('Region: Americas')).toBeInTheDocument();
    expect(screen.getByText('Capital: Washington, D.C.')).toBeInTheDocument();
    expect(screen.getByAltText('Flag of United States')).toHaveAttribute(
      'src',
      'https://flagcdn.com/us.png'
    );
  });
});