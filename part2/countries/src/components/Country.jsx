const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital[0]}</p>
      <p>area: {country.area}</p>

      <h2>languages: </h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}
        src={country.flags.png}
        alt=""
      />
    </div>
  );
};
export default Country;
