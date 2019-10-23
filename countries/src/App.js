import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Result from "./components/Result";

import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [usingFilter, setUsingFilter] = useState(true);
  const [detailedCountry, setDetailedCountry] = useState(null);

  const countriesToDisplay = usingFilter
    ? countries.filter(country =>
        country.name.toLowerCase().includes(filter.toLowerCase())
      )
    : [detailedCountry];

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = event => {
    setFilter(event.target.value);
    setUsingFilter(true);
  };

  return (
    <>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Result
        countriesToDisplay={countriesToDisplay}
        setDetailedCountry={setDetailedCountry}
        setUsingFilter={setUsingFilter}
      />
    </>
  );
};
export default App;
