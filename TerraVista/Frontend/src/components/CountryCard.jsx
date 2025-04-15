import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
  return (
    <Link 
      to={`/country/${country.cca3}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={country.flags?.png} 
          alt={`Flag of ${country.name?.common}`} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{country.name?.common}</h3>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Population:</span> {country.population?.toLocaleString()}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Region:</span> {country.region}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}
        </p>
      </div>
    </Link>
  );
};

export default CountryCard;