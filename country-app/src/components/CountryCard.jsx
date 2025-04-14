import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
  return (
    <Link to={`/country/${country.cca3}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
        <div className="h-48 overflow-hidden">
          <img 
            src={country.flags?.png} 
            alt={`Flag of ${country.name?.common}`} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            {country.name?.common}
          </h3>
          <div className="space-y-1 text-gray-700 dark:text-gray-300">
            <p><span className="font-semibold">Population:</span> {country.population?.toLocaleString()}</p>
            <p><span className="font-semibold">Region:</span> {country.region}</p>
            <p><span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;