import { useCountries } from '../context/CountryContext';
import CountryCard from '../components/CountryCard';
import SearchFilter from '../components/SearchFilter';

const Home = () => {
  const { filteredCountries = [], loading, error } = useCountries();

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
        <span className="block sm:inline">{error.message}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchFilter />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
      {filteredCountries.length === 0 && !loading && (
        <div className="text-center py-8 col-span-full">
          <p className="text-lg text-gray-500">No countries found</p>
        </div>
      )}
    </div>
  );
};

export default Home;