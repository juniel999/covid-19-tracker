import { useEffect, useState } from "react";
import Card from "./components/Card";
import "./App.css";
import numeral from "numeral";
import ParticleBackground from "./particleBackground";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryData, setCountryData] = useState({});

  useEffect(() => {
    const fetchCounties = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            countryName: country.country,
            countryInfo: country.countryInfo.iso2,
            todayCases: country.cases,
          }));

          setCountries(countries);
        });
    };

    fetchCounties();
  }, []);

  useEffect(() => {
    if (country === "worldwide") {
      const fetchWorldwide = async () => {
        await fetch("https://disease.sh/v3/covid-19/all")
          .then((response) => response.json())
          .then((data) => {
            const worldData = {
              country: "Worldwide",
              flag: "https://www.countryfaq.com/wp-content/uploads/2020/11/list-of-countries-and-their-flags-1400x780.png",
              updated: data.cases,
              active: data.active,
              cases: data.active,
              critical: data.critical,
              recovered: data.recovered,
              todayRecovered: data.todayRecovered,
              deaths: data.deaths,
              todayDeaths: data.todayDeaths,
            };

            setCountryData(worldData);
          });
      };

      fetchWorldwide();
    } else {
      const fetchCountry = async () => {
        await fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
          .then((response) => response.json())
          .then((data) => {
            const countryData = {
              country: data.country,
              flag: data.countryInfo.flag,
              updated: data.cases,
              cases: data.todayCases,
              recovered: data.recovered,
              critical: data.critical,
              todayRecovered: data.todayRecovered,
              deaths: data.deaths,
              todayDeaths: data.todayDeaths,
            };

            setCountryData(countryData);
          });
      };

      fetchCountry();
    }
  }, [country]);

  return (
    <>
      <ParticleBackground />
      <div className="app">
        <div className="app__left">
          <div className="app__leftheader">
            <h1>Corona Virus Tracker</h1>

            <select
              className="app__dropdown"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="worldwide">Worldwide</option>
              {countries.map((country) => (
                <option value={country.countryInfo}>
                  {country.countryName}
                </option>
              ))}
            </select>
          </div>

          <div className="app__leftcontent">
            <div className="app__left_countryInfo">
              <img src={countryData.flag} alt={countryData.country} />
              <h3 className="big">{countryData.country}</h3>
              <p>
                All cases: {numeral(`${countryData.updated}`).format("0,0")}
              </p>
              <p>Active: {numeral(`${countryData.cases}`).format("0,0")}</p>
              <p>
                Critical: {numeral(`${countryData.critical}`).format("0,0")}
              </p>
              <p>
                Recovered: {numeral(`${countryData.recovered}`).format("0,0")}
              </p>
            </div>
            <div className="app__leftcards">
              <div className="app__leftcards_left">
                <Card
                  title="Cases"
                  todayCases={countryData.cases}
                  allCases={countryData.updated}
                />
                <Card
                  title="Recovered"
                  todayCases={countryData.todayRecovered}
                  allCases={countryData.recovered}
                />
              </div>

              <Card
                title="Deaths"
                todayCases={countryData.todayDeaths}
                allCases={countryData.deaths}
              />
            </div>
          </div>
        </div>

        <div className="app__right">
          <h3>Live Cases by Country</h3>
          <table>
            <tr>
              <td>Country</td>
              <td>Total Cases</td>
            </tr>
            {countries.map((country) => (
              <tr>
                <td>{country.countryName}</td>
                <td>{numeral(`${country.todayCases}`).format("0,0")}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <p class="footer_text">
        All rights reserved.
        <br />
        Follow <a href="https://www.facebook.com/juniel999">hssnj</a> for more.
      </p>
    </>
  );
}

export default App;
