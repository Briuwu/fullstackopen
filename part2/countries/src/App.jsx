import { useEffect } from "react";
import { useState } from "react";
import countryService from "./services/countries";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    countryService.getCountries().then((countries) => setCountries(countries));
  }, []);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div>
        find countries:{" "}
        <input type="text" value={query} onChange={handleSearch} />
      </div>
      <div>
        {filteredCountries.length === 1 ? (
          <Country country={filteredCountries[0]} />
        ) : filteredCountries.length > 10 &&
          query === "" ? null : filteredCountries.length > 10 ? (
          <div>Too many matches, specify another filter</div>
        ) : filteredCountries.length > 1 ? (
          filteredCountries.map((country) => (
            <p key={country.name.common}>
              {country.name.common}{" "}
              <button onClick={() => setQuery(country.name.common)}>
                show
              </button>
            </p>
          ))
        ) : null}
      </div>
    </div>
  );
};
export default App;
