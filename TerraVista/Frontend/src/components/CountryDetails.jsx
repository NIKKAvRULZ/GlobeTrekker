import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCountryByCode } from '../services/api';

const CountryDetails = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);
        const data = await getCountryByCode(code);
        if (data && data.length > 0) {
          setCountry(data[0]);
          
          // Fetch border countries if they exist
          if (data[0].borders && data[0].borders.length > 0) {
            const borderPromises = data[0].borders.map(borderCode => 
              getCountryByCode(borderCode)
            );
            const borders = await Promise.all(borderPromises);
            setBorderCountries(borders.map(border => border[0]));
          }
        } else {
          setError('Country not found');
        }
      } catch (err) {
        setError('Failed to fetch country details');
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [code]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!country) return <div className="text-center py-10">Country not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link 
        to="/" 
        className="inline-flex items-center px-6 py-2 bg-white shadow-md rounded-md mb-12 hover:bg-gray-50 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </Link>

      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="w-full h-80 md:h-96 overflow-hidden rounded-md shadow-lg">
          <img 
            src={country.flags?.png} 
            alt={`Flag of ${country.name?.common}`} 
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-6">{country.name?.common}</h1>
          
          <div className="grid sm:grid-cols-2 gap-8 mb-12">
            <div>
              <p className="mb-2"><span className="font-semibold">Native Name:</span> {Object.values(country.name?.nativeName || {})[0]?.common || 'N/A'}</p>
              <p className="mb-2"><span className="font-semibold">Population:</span> {country.population?.toLocaleString()}</p>
              <p className="mb-2"><span className="font-semibold">Region:</span> {country.region}</p>
              <p className="mb-2"><span className="font-semibold">Sub Region:</span> {country.subregion || 'N/A'}</p>
              <p className="mb-2"><span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
            </div>
            
            <div>
              <p className="mb-2"><span className="font-semibold">Top Level Domain:</span> {country.tld?.join(', ') || 'N/A'}</p>
              <p className="mb-2"><span className="font-semibold">Currencies:</span> {Object.values(country.currencies || {}).map(c => c.name).join(', ') || 'N/A'}</p>
              <p className="mb-2"><span className="font-semibold">Languages:</span> {Object.values(country.languages || {}).join(', ') || 'N/A'}</p>
            </div>
          </div>

          {borderCountries.length > 0 && (
            <div>
              <h3 className="font-semibold mb-4">Border Countries:</h3>
              <div className="flex flex-wrap gap-2">
                {borderCountries.map(border => (
                  <Link 
                    key={border.cca3} 
                    to={`/country/${border.cca3}`}
                    className="px-4 py-1 bg-white shadow-sm rounded-md hover:bg-gray-50 transition-colors"
                  >
                    {border.name.common}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;