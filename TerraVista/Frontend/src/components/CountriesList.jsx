import { useEffect, useState } from "react";
import axios from "axios";

function CountriesList() {
    const [ Countries, setCountries ] = useState([]);

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then((response) => {
                setCountries(response.data);
            })
            .catch((error) => {
                console.error("Error fetching countries:", error);
            });
    },[]);

    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {Countries.map((country) => (
                <div key={country.cca3} className="bg-white shadow p-4 roiunded-xl">
                    <h2 className="text-lg font-semibold">{country.name.common}</h2>
                    <p>Region: {country.region}</p>
                    <img src={country.flags.png} alt={`${country.name.common} flag`} className="h-20 mt-2"/>
                </div>
            ))}
        </div>
    );
}

export default CountriesList;