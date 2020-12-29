import React, { useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

import "./App.css";
import "./index.css";

export default function Search() {
  let [city, setCity] = useState("");
  let [loaded, setLoaded] = useState(false);
  let [message, setMessage] = useState("");
  let defaults = {
    icon: "CLEAR_DAY",
    color: "goldenrod",
    size: "75%",
    animate: true
  };

  function showWeather(response) {
    setLoaded(true);
    setMessage(
      <ul>
        <li>temperature: {Math.round(response.data.main.temp)}°C</li>
        <li>description: {response.data.weather[0].description}</li>
        <li>humidity: {response.data.main.humidity}%</li>
        <li>wind: {Math.round(response.data.wind.speed)}km/h</li>
        <img
          src={`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}
          alt={response.data.weather[0].icon}
        />
      </ul>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "fb292de11e071a00e499cdd544b36098";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="Search" onChange={updateCity} />
      <input type="Submit" value="Search" />
    </form>
  );

  if (loaded) {
    return (
      <div className="Search">
        <ReactAnimatedWeather
          icon={defaults.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
        <p />
        {form}
        <h2>{message}</h2>
      </div>
    );
  } else {
    return form;
  }
}
