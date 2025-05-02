import { FaGlobeEurope, FaGlobeAsia, FaGlobeAfrica, FaGlobeAmericas } from "react-icons/fa";

export const calculateRegionalStats = (data) => {
  if (!data) return {};
  
  return data.reduce((acc, country) => {
    const region = country.region;
    if (!region) return acc;
    
    if (!acc[region]) {
      acc[region] = {
        countries: [],
        totalPopulation: 0,
        languages: new Set(),
        currencies: new Set(),
        totalArea: 0,
        independentCount: 0,
        colorClass: getRegionColorClass(region)
      };
    }
    
    acc[region].countries.push(country);
    acc[region].totalPopulation += country.population || 0;
    acc[region].totalArea += country.area || 0;
    if (country.independent) acc[region].independentCount++;
    
    if (country.languages) {
      Object.values(country.languages).forEach(lang => acc[region].languages.add(lang));
    }
    if (country.currencies) {
      Object.keys(country.currencies).forEach(curr => acc[region].currencies.add(curr));
    }
    
    return acc;
  }, {});
};

export const getRegionColorClass = (region) => {
  switch (region) {
    case 'Europe': return 'blue';
    case 'Asia': return 'green';
    case 'Africa': return 'purple';
    case 'Oceania': return 'amber';
    case 'Americas': return 'rose';
    default: return 'indigo';
  }
};

// Return the actual component function, not JSX
export const getRegionIcon = (region) => {
  switch (region) {
    case 'Europe': return FaGlobeEurope;
    case 'Asia': return FaGlobeAsia;
    case 'Africa': return FaGlobeAfrica;
    case 'Americas': 
    case 'Oceania':
    default: return FaGlobeAmericas;
  }
};

// Export the icons directly so they can be used in components
export const RegionIcons = {
  FaGlobeEurope,
  FaGlobeAsia,
  FaGlobeAfrica,
  FaGlobeAmericas
};