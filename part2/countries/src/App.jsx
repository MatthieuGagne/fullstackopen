import { useState, useEffect } from 'react'
import SearchBar from './components/searchbar'
import CountryList from './components/countrylist'
import countriesService from './services/countries'


const App = () => {

  const [searchString, setSearchString] = useState('') 
  const [countries, setCountries] = useState ([])
  const [filteredCountries, setFilteredCountries] = useState ([])

  useEffect(() => {
    countriesService
      .getAll()
      .then(response => {
        setCountries(response)
      })
  }, [])  

  useEffect(() => {
    // Filter countries based on searchString
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchString.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchString]);

  return (
    <div>
      <SearchBar searchString={searchString} setSearchString={setSearchString} />
      <CountryList filteredCountries={filteredCountries}/>
    </div>
  )
}

export default App