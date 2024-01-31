import React, { useEffect, useState } from "react";
import getFormattedWeatherData from "../../services/WeatherProvider";
import "./Home.css";
import Input from "../../components/Input/Input";
import TemperatureDetails from "../../components/TempratureDetails/TempratureDetails";
import DailyForcast from "../../components/DailyForcast/DailyForcast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [query, setQuery] = useState({ q: "london" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location";
      toast.info(`Fetching weather for ${message}`);

      try {
        const data = await getFormattedWeatherData({ ...query, units });

        if (data && data.currentWeatherData && data.forecastData) {
          setWeather(data);
        } else {
          toast.error(`City '${query.q}' does not exist.`);
        }
      } catch (error) {
        toast.error(`City '${query.q}' does not exist.`);
      }
    };

    fetchWeather();
  }, [units, query]);

  console.log(weather);
  return (
    <div className="app-Container">
      <div className="first-section">
        <Input setQuery={setQuery} units={units} setUnits={setUnits} />
      </div>
      {weather && (
        <div className="secound-section">
          <TemperatureDetails weather={weather.currentWeatherData} />
          <DailyForcast items={weather.forecastData} />
        </div>
      )}
      <ToastContainer
        autoClose={2000}
        theme="dark"
        position="top-center"
        newestOnTop={true}
      />
    </div>
  );
};
export default Home;
