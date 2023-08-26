import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CountryDetails({ country }) {
  const [capitalWeather, setCapitalWeather] = useState(null);

  useEffect(() => {
    if (country.capital && country.capital[0]) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${import.meta.env.VITE_REACT_API_KEY}
        `)
        .then(response => {
          setCapitalWeather(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [country.capital]);
  
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} Flag`} />
      
      {capitalWeather && (
        <div>
          <h2>Weather in {country.capital[0]}</h2>
          <p>Temperature: {Math.round(capitalWeather.main.temp - 273.15)}° Celcius</p>
          <img src={`http://openweathermap.org/img/wn/${capitalWeather.weather[0].icon}.png`} alt="Weather icon" />
          <p>Wind: {capitalWeather.wind.speed} mph direction {capitalWeather.wind.deg}°</p>
        </div>
      )}
    </div>
  );
}

export default CountryDetails;
