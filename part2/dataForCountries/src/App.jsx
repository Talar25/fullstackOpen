import { useState, useEffect } from "react";
import axios from "axios";
import Notification from "./components/Notification";

export default function App() {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  return (
    <>
      <form>
        <label>
          find countries{" "}
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
      </form>
      <Countries countries={countries} filteredValue={value} />
    </>
  );
}

function Countries({ countries, filteredValue }) {
  let filteredCountries = [];
  console.log(filteredCountries);

  if (filteredValue.length > 0) {
    filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(filteredValue.toLowerCase())
    );
  }

  if (filteredCountries.length > 10) {
    return <Notification />;
  }

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return (
      <CountryInfo
        name={country.name.common}
        capital={country.capital}
        area={country.area}
        languages={country.languages}
        img={country.flags.svg}
      />
    );
  } else {
    return (
      <div>
        <ul>
          {filteredCountries.map((country) => (
            <CountryItem
              key={country.name.common}
              name={country.name.common}
              capital={country.capital}
              area={country.area}
              languages={country.languages}
              img={country.flags.svg}
            ></CountryItem>
          ))}
        </ul>
      </div>
    );
  }
}

function CountryItem({ name, capital, area, languages, img }) {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div>
      <li>
        <span>{name}</span>
        <button onClick={() => setIsOpened(!isOpened)}>show</button>
        {isOpened && (
          <CountryInfo
            name={name}
            capital={capital}
            area={area}
            languages={languages}
            img={img}
          />
        )}
      </li>
    </div>
  );
}

function CountryInfo({ name, capital, area, languages, img }) {
  return (
    <div className="country">
      <h2>{name}</h2>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={img}></img>
      <p></p>
    </div>
  );
}
