const CountryList = ({filteredCountries}) => {

    if (filteredCountries.length === 0) {
        return (
            <div>
                "Nothing found."
            </div>
        )    
    } else if (filteredCountries.length > 10) {
        return (
            <div>
                "Too many matches, specify another filter."
            </div>
        )    
    } else if (filteredCountries.length > 1) {

        filteredCountries.map(country => (
            console.log(country.name.common))
        )
        
        return (
            <div>
                {filteredCountries.map(country => (
                    <div key={country.cca3}><h2>{country.name.common} <button>show</button></h2></div>
                ))}
            </div>
        )
    }   
}

export default CountryList;