import { useState, useEffect } from 'react';
import weatherService from '../services/weather'

const CountryList = ({ filteredCountries }) => {
    const [toggleStates, setToggleStates] = useState({});
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (filteredCountries.length === 1) {
            const country = filteredCountries[0];
            const lat = country.capitalInfo.latlng[0]; // Assuming the latitude is the first element in the array
            const lon = country.capitalInfo.latlng[1]; // Assuming the longitude is the second element in the array

            weatherService.getWeather(lat, lon, 'current')
                .then(data => {
                    setWeather(data.current);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        }
    }, [filteredCountries]);

    const handleToggle = (countryCode) => {
        setToggleStates(prevStates => ({
            ...prevStates,
            [countryCode]: !prevStates[countryCode]
        }));
    };

    if (filteredCountries.length === 0) {
        return (
            <div>
                Nothing found.
            </div>
        );    
    } else if (filteredCountries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter.
            </div>
        );    
    } else if (filteredCountries.length > 1) {
        return (
            <div>
                {filteredCountries.map(country => (
                    <div key={country.cca3}>
                        <h2>
                            {country.name.common} 
                            <button onClick={() => handleToggle(country.cca3)}>
                                {toggleStates[country.cca3] ? 'hide' : 'show'}
                            </button>
                        </h2>
                        {toggleStates[country.cca3] && (
                            <div>
                                <p>Capital: {country.capital}</p>
                                <p>Area: {country.area}</p>
                                <h3>Languages</h3>
                                <ul>
                                    {Object.entries(country.languages).map(([code, language]) => (
                                        <li key={code}>{language}</li>
                                    ))}
                                </ul>  
                                <img src={country.flags.png} alt={country.flags.alt} title={country.flags.alt}/>                               
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    } else {
        const country = filteredCountries[0];
        return (
            <div>
                <h2>{country.name.common}</h2>
                <div>
                    <p>Capital: {country.capital}</p>
                    <p>Area: {country.area}</p>
                    <h3>Languages</h3>
                    <ul>
                        {Object.entries(country.languages).map(([code, language]) => (
                            <li key={code}>{language}</li>
                        ))}
                    </ul>  
                    <img src={country.flags.png} alt={country.flags.alt} title={country.flags.alt}/>
                    <h2>Weather in {country.capital}</h2>
                    {weather && (
                        <div>
                            <p>Temperature: {weather.temp}°C</p>
                            <p>Weather: {weather.weather[0].description}</p>
                            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        </div>
                    )}
                </div>
            </div>
        );
    }

};

export default CountryList;