import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import ForecastList from "./components/ForecastList";
import AirPollutionCard from "./components/AirPollutionCard";
import WeatherCard from "./components/WeatherCard";
import HourlyGraph from "./components/HourlyGraph"; // Import the new HourlyGraph component
import './App.css'; // Custom styling for the app
import { fetchCurrentWeather, fetchForecast, fetchAirPollution, fetchCoordinates } from "./utils/api";

const App = () => { 
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null); 
  const [pollution, setPollution] = useState(null); 
 

  // Fetch weather, forecast, pollution, and coordinates
  const handleSearch = async (city) => {
    

    try {
      const weatherData = await fetchCurrentWeather(city);
      const forecastData = await fetchForecast(city);
      const geoData = await fetchCoordinates(city);
      const pollutionData = await fetchAirPollution(geoData.lat, geoData.lon);

      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setPollution(pollutionData);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
     <h1>Forecast360</h1>

      <SearchBar onSearch={handleSearch} />

      <div className="cards-container">
        {/* Weather and Air Pollution Cards */}
        {currentWeather && <WeatherCard weather={currentWeather} />}
        {pollution && <AirPollutionCard pollution={pollution} />}
      </div>

      {/* Display Hourly Graph inside a card */}
      {forecast && (
        <div className="weather-chart-card">
          <h2>Hourly Temperature</h2>
          <HourlyGraph forecastData={forecast} />
        </div>
      )}

      {/* Display Forecast List */}
      {forecast && <ForecastList forecast={forecast} />}

  
    </div>
  );
};

export default App;
