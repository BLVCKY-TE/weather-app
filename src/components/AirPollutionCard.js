import React from "react";

const AirPollutionCard = ({ pollution }) => {
  if (!pollution) return null; // Return null if no pollution data is available

  const { list } = pollution;
  const { aqi } = list[0].main; // Air quality index
  const pollutants = list[0].components; // Pollutants data

  const aqiDescriptions = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];

  return (
    <div className="air-pollution-card">
      <h2>Air Quality Index: {aqiDescriptions[aqi - 1]}</h2>
      <ul>
        {Object.entries(pollutants).map(([key, value]) => (
          <li key={key}>{key.toUpperCase()}: {value} μg/m³</li>
        ))}
      </ul>
    </div>
  );
};

export default AirPollutionCard;
