import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (searchQuery) {
      axios
        .get(`https://restcountries.com/v3.1/name/${searchQuery}`)
        .then(response => {
          const foundCountries = response.data;
          setCountries(foundCountries);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [searchQuery]);

  const handleCountrySelect = country => {
    setSelectedCountry(country);
  };

  return (
    <div>
     Find countries <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="" />
      <CountryList countries={countries} onCountrySelect={handleCountrySelect} />
      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </div>
  );
}

export default App;
