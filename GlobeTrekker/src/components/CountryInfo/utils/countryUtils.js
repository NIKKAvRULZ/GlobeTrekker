export const getCountryDetails = (country) => {
    return {
      officialName: country?.name.official,
      capital: country?.capital?.[0],
      region: country?.region,
      subregion: country?.subregion,
      population: country?.population?.toLocaleString(),
      languages: country?.languages ? Object.values(country.languages).join(", ") : "N/A",
      currencies: country?.currencies ? 
        Object.values(country.currencies)
          .map(curr => `${curr.name} (${curr.symbol})`)
          .join(", ") : "N/A",
      area: `${country?.area?.toLocaleString()} km²`,
      timezones: country?.timezones?.join(", "),
      callingCode: country?.idd?.root + (country?.idd?.suffixes?.[0] || "")
    };
  };
  
  export const getRegionColor = (region) => {
    switch (region) {
      case 'Europe': return 'blue';
      case 'Asia': return 'green';
      case 'Africa': return 'purple';
      case 'Oceania': return 'amber';
      case 'Americas': return 'rose';
      default: return 'indigo';
    }
  };
  
  export const getGreeting = (language) => {
    if (!language) return 'Hello';
    
    const greetings = {
      'Spanish': '¡Hola!',
      'French': 'Bonjour!',
      'German': 'Hallo!',
      'Chinese': '你好!',
      'Arabic': 'مرحبا!',
      'Hindi': 'नमस्ते!',
      'Portuguese': 'Olá!',
      'Russian': 'Привет!'
    };
    
    return greetings[language] || 'Hello';
  };