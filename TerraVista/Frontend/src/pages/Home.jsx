import { useCountries } from '../hooks/useCountries';
import CountryCard from '../components/CountryCard';
import Search from '../components/Search';
import Filter from '../components/Filter';

const Home = () => {
  const { 
    countries, 
    loading, 
    error, 
    regionFilter, 
    setRegionFilter, 
    searchTerm, 
    setSearchTerm 
  } = useCountries();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Filter regionFilter={regionFilter} setRegionFilter={setRegionFilter} />
      </div>

      {loading && <div className="text-center py-10">Loading countries...</div>}
      
      {error && (
        <div className="text-center py-10 text-red-500">
          {error}
        </div>
      )}

      {!loading && !error && countries.length === 0 && (
        <div className="text-center py-10">
          No countries found matching your search criteria.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {countries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};

export default Home;