import useSWR from "swr";
import { useState } from "react";
import countryService from "./services/countries";
import Country from "./components/Country";

const App = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const { data, error } = useSWR(
    "https://studies.cs.helsinki.fi/restcountries",
    countryService.getCountries
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const filteredCountries = data.filter((country) => {
    return country.name.common.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div>
      <div>
        find countries:{" "}
        <input type="text" value={query} onChange={handleSearch} />
        {filteredCountries.length === 1 ? (
          <Country country={filteredCountries[0]} />
        ) : filteredCountries.length > 10 && query !== "" ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length > 1 && query !== "" ? (
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
