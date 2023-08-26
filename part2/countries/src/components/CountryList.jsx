// CountryList.js
import React from 'react';

function CountryList({ countries, onCountrySelect }) {
  if (countries.length > 10) {
    return <p>Too many matches, please be more specific.</p>;
  }

  return (
    <ul>
      {countries.map(country => (
        <li key={country.name.common}>
          {country.name.common}
          <button onClick={() => onCountrySelect(country)}>Show</button>
        </li>
      ))}
    </ul>
  );
}

export default CountryList;
