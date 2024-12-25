import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faCloud, faCloudRain, faSnowflake } from "@fortawesome/free-solid-svg-icons";

// DailyForecast Component to display individual forecast card
const DailyForecast = ({ date, maxTemp, minTemp, weatherIcon, description }) => {
  const formattedDate = new Date(date * 1);

  const getWeatherIcon = (icon) => {
    switch (icon) {
      case "01d": return faSun;         // Clear day
      case "01n": return faMoon;        // Clear night
      case "02d":
      case "02n": return faCloud;       // Few clouds
      case "09d":
      case "09n": return faCloudRain;   // Rain
      case "13d":
      case "13n": return faSnowflake;   // Snow
      default: return faCloud;          // Default
    }
  };

  return (
    <div className="forecast-item">
      <p className="date">{formattedDate.toLocaleDateString()}</p>
      <FontAwesomeIcon
        icon={getWeatherIcon(weatherIcon)}
        className="weather-icon"
        size="2x"
      />
      <p className="description">{description}</p>
      <p>Max Temp: {maxTemp}°C</p>
      <p>Min Temp: {minTemp}°C</p>
    </div>
  );
};


const ForecastList = ({ forecast }) => {
  if (!forecast) return null;

  // Grouping the data by day and calculating max and min temperatures for each day
  const groupedByDay = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).setHours(0, 0, 0, 0); // Convert dt from Unix timestamp and remove time
    if (!acc[date]) {
      acc[date] = { temps: [], weather: item.weather[0] };
    }
    acc[date].temps.push(item.main.temp);
    return acc;
  }, {});

  const dailyForecast = Object.keys(groupedByDay).map(date => {
    const dayData = groupedByDay[date];
    const maxTemp = Math.max(...dayData.temps);
    const minTemp = Math.min(...dayData.temps);
    return { date: parseInt(date), maxTemp, minTemp, weatherIcon: dayData.weather.icon, description: dayData.weather.description };
  });

  return (
    <div className="forecast-list">
      <h2>5-Day Forecast</h2> {/* Updated to 5 days */}
      <div className="forecast-grid">
        {dailyForecast.slice(0, 5).map((forecast, index) => (  // Limit to 5 days forecast
          <DailyForecast
            key={index}
            date={forecast.date}
            maxTemp={forecast.maxTemp}
            minTemp={forecast.minTemp}
            weatherIcon={forecast.weatherIcon}
            description={forecast.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ForecastList;
