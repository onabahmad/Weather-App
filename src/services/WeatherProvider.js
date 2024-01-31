// Import necessary dependencies and components
import { DateTime } from "luxon";

// API key and base URL for OpenWeatherMap API
const API_KEY = "bb862c6ac63b3135a9494ceb72f8b2ab";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Function to fetch weather data from the API
const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(`${BASE_URL}/${infoType}`);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

// Function to format current weather data
const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, temp_min, temp_max, humidity },
    name,
    weather,
    dt,
    wind: { speed, deg },
  } = data;
  const { main: details, description, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    temp_min,
    temp_max,
    name,
    dt,
    speed,
    details,
    deg,
    description,
    icon,
    humidity,
  };
};

// Function to format timestamp to local time
const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy'| Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toLocaleString({ format });

// Function to format forecast data with average temperature
const formatForecastDataWithAverage = (data) => {
  // Map to store daily temperatures, counts, descriptions, and icons
  const dailyData = new Map();

  // Iterate over forecast data
  data.list.forEach((forecast) => {
    const date = formatToLocalTime(
      forecast.dt,
      data.city.timezone,
      "dd LLL yyyy"
    );

    // Check if the date is already in the map
    if (dailyData.has(date)) {
      // Update the sum, count, description, and icon
      dailyData.get(date).sum += forecast.main.temp;
      dailyData.get(date).count += 1;
    } else {
      // Add a new entry to the map with description and icon
      dailyData.set(date, {
        sum: forecast.main.temp,
        count: 1,
        description: forecast.weather[0].description,
        icon: forecast.weather[0].icon,
      });
    }
  });

  // Calculate average temperature for each day and use the first entry's description and icon
  const formattedData = Array.from(dailyData.entries()).map(
    ([date, { sum, count, description, icon }]) => {
      return {
        date,
        temp: sum / count,
        description,
        icon,
      };
    }
  );

  return formattedData;
};

// Update the main export to use the new function
const getFormattedWeatherData = async (searchParams) => {
  // Fetch current weather data
  const currentWeatherData = await getWeatherData("weather", searchParams).then(
    formatCurrentWeather
  );

  // Fetch 5-day forecast data
  const forecastData = await getWeatherData("forecast", searchParams).then(
    formatForecastDataWithAverage
  );

  // Return an object with formatted current and forecast weather data
  return { currentWeatherData, forecastData };
};

const iconURLFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { iconURLFromCode, formatToLocalTime };
