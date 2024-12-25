import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faCloud, faCloudRain, faSnowflake } from "@fortawesome/free-solid-svg-icons";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const { name, main, weather: weatherDetails, wind } = weather;

  // Determine icon based on weather condition
  const getWeatherIcon = (icon) => {
    switch (icon) {
      case "01d": return faSun;         // Clear day
      case "01n": ;        // Clear night
      case "02d":
      case "02n": return faCloud;       // Few clouds
      case "09d":
      case "09n": return faCloudRain;   // Rain
      case "13d":
      case "13n": return faSnowflake;   // Snow
      default: return faCloud;          // Default
    }
  };

  const weatherIcon = weatherDetails[0]?.icon;

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <h3>{weatherDetails[0]?.description}</h3>
      <p>Temperature: {main.temp}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind Speed: {wind.speed} m/s</p>

      {/* Weather Icon */}
      {weatherIcon && (
        <FontAwesomeIcon
          icon={getWeatherIcon(weatherIcon)}
          className="weather-icon"
          size="2x"
        />
      )}
    </div>
  );
};

export default WeatherCard;
