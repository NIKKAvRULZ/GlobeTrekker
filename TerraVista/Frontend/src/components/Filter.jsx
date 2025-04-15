const Filter = ({ regionFilter, setRegionFilter }) => {
    const regions = ['all', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  
    return (
      <div className="relative w-48 mb-8">
        <select
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {region === 'all' ? 'Filter by Region' : region}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  };
  
  export default Filter;