import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCountries } from '../context/CountryContext';

const CountryPage = () => {
  const { code } = useParams();
  const { selectedCountry, getCountryByCode, loading, error } = useCountries();

  useEffect(() => {
    if (code) {
      getCountryByCode(code);
    }
  }, [code, getCountryByCode]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (!selectedCountry) {
    return <div>Country not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow mb-8 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="w-full h-96 lg:h-auto">
          <img
            src={selectedCountry.flags?.png}
            alt={`Flag of ${selectedCountry.name?.common}`}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            {selectedCountry.name?.common}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Native Name:</span>{' '}
                {Object.values(selectedCountry.name?.nativeName || {})[0]?.common || 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Population:</span>{' '}
                {selectedCountry.population?.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {selectedCountry.region}
              </p>
              <p>
                <span className="font-semibold">Sub Region:</span> {selectedCountry.subregion || 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Capital:</span>{' '}
                {selectedCountry.capital?.[0] || 'N/A'}
              </p>
            </div>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Top Level Domain:</span>{' '}
                {selectedCountry.tld?.join(', ') || 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Currencies:</span>{' '}
                {selectedCountry.currencies
                  ? Object.values(selectedCountry.currencies)
                      .map((c) => c.name)
                      .join(', ')
                  : 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{' '}
                {selectedCountry.languages
                  ? Object.values(selectedCountry.languages).join(', ')
                  : 'N/A'}
              </p>
            </div>
          </div>
          {selectedCountry.borders && selectedCountry.borders.length > 0 && (
            <div>
              <h3 className="font-semibold mb-4 text-lg">Border Countries:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCountry.borders.map((border) => (
                  <Link
                    key={border}
                    to={`/country/${border}`}
                    className="px-4 py-2 bg-white dark:bg-gray-800 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {border}
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

export default CountryPage;