import React, { useState } from "react";
import "./Input.css";
import { IoSearchOutline } from "react-icons/io5";
import { ImLocation } from "react-icons/im";
import { RiCelsiusFill } from "react-icons/ri";
import { RiFahrenheitFill } from "react-icons/ri";
import { FaGripLinesVertical } from "react-icons/fa6";

const Input = ({ setQuery, units, setUnits }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  const handleUnitChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  return (
    <div className="search-container">
      <div className="search-button-location">
        <input
          className="search-city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          placeholder="Search a City"
        />
        <button onClick={handleSearch} className="button-container">
          <IoSearchOutline className="search-button" />
        </button>
        <button className="button-container" onClick={handleCurrentLocation}>
          <ImLocation />
        </button>
      </div>
      <div className="unit-toggle">
        <div className="Fahrenheit-Celsius">
          <button name="imperial" onClick={handleUnitChange}>
            <RiFahrenheitFill />
          </button>
          <FaGripLinesVertical />
          <button name="metric" onClick={handleUnitChange}>
            <RiCelsiusFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
