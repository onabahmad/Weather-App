import React from "react";
import { iconURLFromCode } from "../../services/WeatherProvider";
import "./DailyForcast.css";

const DailyForcast = ({ items }) => {
  console.log(items);
  return (
    <div className="daily-forcast-container">
      {items.map((item) => (
        <div className="daily-forcast-details" key={item.date}>
          <p>{item.date}</p>
          <h3>{item.temp.toFixed()}°</h3>
          <img src={iconURLFromCode(item.icon)} alt="icon" />
          <span>{item.description}</span>
        </div>
      ))}
    </div>
  );
};

export default DailyForcast;
