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

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy'| Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toLocaleString({ format });

const formatForecastDataWithAverage = (data) => {
  const dailyData = new Map();

  data.list.forEach((forecast) => {
    const date = DateTime.fromFormat(
      forecast.dt_txt,
      "yyyy-MM-dd HH:mm:ss"
    ).toFormat("yyyy-MM-dd");

    if (dailyData.has(date)) {
      dailyData.get(date).sum += forecast.main.temp;
      dailyData.get(date).count += 1;
    } else {
      dailyData.set(date, {
        sum: forecast.main.temp,
        count: 1,
        description: forecast.weather[0].description,
        icon: forecast.weather[0].icon,
      });
    }
  });

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

const getFormattedWeatherData = async (searchParams) => {
  const currentWeatherData = await getWeatherData("weather", searchParams).then(
    formatCurrentWeather
  );

  const forecastData = await getWeatherData("forecast", searchParams).then(
    formatForecastDataWithAverage
  );
  const trimmedForecastData = forecastData.slice(1);

  return { currentWeatherData, forecastData: trimmedForecastData };
};

const iconURLFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { iconURLFromCode, formatToLocalTime };
