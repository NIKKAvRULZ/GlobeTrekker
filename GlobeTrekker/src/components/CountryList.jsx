import React, { useState, useEffect } from 'react';
import { getAllCountries, searchCountries } from '../services/api';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAllCountries();
        setCountries(data);
        setLoading(false);
      } catch (err) {
        setError('Error loading countries');
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length > 0) {
      try {
        const results = await searchCountries(term);
        setCountries(results);
      } catch (err) {
        setError('Error searching countries');
      }
    } else {
      // Reset to all countries if search is cleared
      try {
        const data = await getAllCountries();
        setCountries(data);
      } catch (err) {
        setError('Error loading countries');
      }
    }
  };

  if (loading) return <div>Loading countries...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="country-list">
      <input
        type="text"
        placeholder="Search countries"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
        data-testid="search-input"
      />
      <ul className="countries">
        {countries.map((country) => (
          <li key={country.cca3} className="country-item">
            {country.flags && (
              <img 
                src={country.flags.png} 
                alt={`${country.name.common} flag`}
                className="country-flag"
                width="30" 
              />
            )}
            {country.name.common}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;