import { createContext, useState, useEffect, useContext } from "react";
import {
    fetchAllCountries,
    fetchCountryByName,
    fetchContriesByRegion,
    fetchCountryByCode,
} from '../services/api'

const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
    const [ countries, setCountries ] = useState([]);
    const [ filterdCountries, setFilteredCountries ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ selectedCountry, setSelectedCountry ] = useState(null);

    useState(() =>{
        const loadAllCountries = async () => {
            try {
                const data = await fetchAllCountries();
                setCountries(data);
                setFilteredCountries(data);
                setLoading(false);
            }catch(error){
                setCountries(error.message);
                setLoading(false);
            }
        };
        loadAllCountries();
    },[]);

    const searchCountries = async(name) => {
        if(!name.trim()){
            setFilteredCountries(countries);
            return;
        }
        try{
            const data = await fetchCountryByName(name);
            setFilteredCountries(data);
        }catch(error){
            setError(error.message);
        }
    };

    const fillterByRegion = async(region) => {
        if( region === 'All'){
            setFilteredCountries(countries);
            return;
        }
        try{
            const data = await fetchContriesByRegion(region);
            setFilteredCountries(data);
        }catch(error){
            setError(error.message);
        }
    };


    const getCountryByCode = async(code) => {
        try{
            const data = await fetchCountryByCode(code);
            setSelectedCountry(data[0]);
        }catch(error){
            setError(error.message);
        }
    };

    return(
        <CountryContext.Provider
            value={{
                countries,
                filterdCountries,
                loading,
                error,
                selectedCountry,
                searchCountries,
                filterdCountries,
                getCountryByCode,
                setSelectedCountry,
            }} 
            >
                {children}
            </CountryContext.Provider>
    );
};

export const useCountryContext = () => useContext(CountryContext);