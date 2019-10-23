import React from "react";

const CountryDetail = ({ country }) => (
  <div>
    <h1>{country.name}</h1>
    <p>
      Capital: {country.capital}
      <br />
      Population: {country.population}
    </p>
    <h2>Languages</h2>
    <ul>
      {country.languages.map(language => (
        <li key={language.name}>{language.name}</li>
      ))}
    </ul>
    <div>
      <img src={country.flag} alt="flag" width="320" />
    </div>
  </div>
);

const CountryListItem = props => {
  const handler = () => {
    props.setDetailedCountry(props.country);
    props.setUsingFilter(false);
  };
  return (
    <div>
      {props.country.name} <button onClick={handler}>show</button>
    </div>
  );
};

const Result = ({ countriesToDisplay, setDetailedCountry, setUsingFilter }) => {
  const numOfCountries = countriesToDisplay.length;

  if (numOfCountries > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (numOfCountries > 1) {
    return (
      <div>
        {countriesToDisplay.map(country => (
          <CountryListItem
            key={country.alpha3Code}
            country={country}
            setDetailedCountry={setDetailedCountry}
            setUsingFilter={setUsingFilter}
          />
        ))}
      </div>
    );
  }

  if (numOfCountries === 1) {
    return <CountryDetail country={countriesToDisplay[0]} />;
  }

  if (numOfCountries === 0) {
    return <div>No country found, specify another filter</div>;
  }

  return <div>Result will be shown here</div>;
};

export default Result;
