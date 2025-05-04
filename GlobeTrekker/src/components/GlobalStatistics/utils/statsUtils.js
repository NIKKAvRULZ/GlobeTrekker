export const getGlobalStats = (data) => {
    if (!data) return null;
    
    return {
      totalCountries: data.length,
      totalPopulation: data.reduce((acc, country) => acc + (country.population || 0), 0),
      totalLanguages: new Set(data.flatMap(country => 
        country.languages ? Object.values(country.languages) : []
      )).size,
      totalRegions: new Set(data.map(country => country.region)).size
    };
  };
  
  export const getRegionalStats = (data) => {
    if (!data) return [];
    
    const regions = {};
    
    data.forEach(country => {
      if (!country.region) return;
      
      if (!regions[country.region]) {
        regions[country.region] = {
          name: country.region,
          countries: 0,
          population: 0,
          languages: new Set(),
          area: 0
        };
      }
      
      regions[country.region].countries++;
      regions[country.region].population += country.population || 0;
      regions[country.region].area += country.area || 0;
      
      if (country.languages) {
        Object.values(country.languages).forEach(lang => {
          regions[country.region].languages.add(lang);
        });
      }
    });
    
    return Object.values(regions).map(region => ({
      ...region,
      languages: region.languages.size
    }));
  };
  
  export const getTopCountries = (data, property, limit = 10) => {
    if (!data) return [];
    
    return [...data]
      .filter(country => country[property])
      .sort((a, b) => b[property] - a[property])
      .slice(0, limit);
  };