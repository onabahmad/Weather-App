import React from "react";
import { SiWindicss } from "react-icons/si";
import { IoIosWater } from "react-icons/io";
import { PiThermometerHotFill, PiThermometerColdFill } from "react-icons/pi";
import { GiWindsock } from "react-icons/gi";
import "./TempratureDetais.css";
import {
  formatToLocalTime,
  iconURLFromCode,
} from "../../services/WeatherProvider";

const TemperatureDetails = ({
  weather: {
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
  },
}) => {
  return (
    <div className="temperature-details">
      <div className="current-details">
        <div className="city-name">
          <p>{name}</p>
          <span>{formatToLocalTime(dt)}</span>
        </div>
        <div className="temp-icon">
          {" "}
          <h1>{`${temp.toFixed()}`}°</h1>
          <img src={iconURLFromCode(icon)} alt="" />
        </div>

        <h3>{description}</h3>
      </div>
      <div className="extra-details">
        <div className="wind-details details">
          <span>
            <p>Wind Speed</p>
          </span>
          <SiWindicss />
          <p>{`${speed.toFixed()}`} mph</p>
        </div>
        <div className="humidity-details details">
          <span>
            <p>Humidity</p> <IoIosWater />
          </span>
          <p>{`${humidity.toFixed()}`} %</p>
        </div>
        <div className="max-temperature details">
          <span>
            <p>Temp. Max</p>
            <PiThermometerHotFill />
          </span>
          <p>{`${temp_max.toFixed()}`}°</p>
        </div>
        <div className="min-temperature details">
          <span>
            <p>Temp. Min</p>
            <PiThermometerColdFill />
          </span>
          <p>{`${temp_min.toFixed()}`}°</p>
        </div>
        <div className="wind-direction details">
          <span>
            <p>Wind Direction</p>
            <GiWindsock />
          </span>
          <p>{deg}°</p>
        </div>
      </div>
    </div>
  );
};

export default TemperatureDetails;
