export const fetchCurrentWeather = async (city) => {
    const apiKey = "ded57a42fc52bb440179c77a6331993a"; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    return response.json();
  };
  

  export const fetchForecast = async (city) => {
    const apiKey = "ded57a42fc52bb440179c77a6331993a"; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    return response.json();
  };
  
  export const fetchAirPollution = async (lat, lon) => {
    const apiKey = "ded57a42fc52bb440179c77a6331993a"; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await fetch(url);
    return response.json();
  };
  
  export const fetchCoordinates = async (city) => {
    const apiKey = "ded57a42fc52bb440179c77a6331993a"; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return {
      lat: data.coord.lat,
      lon: data.coord.lon,
    };
  };
  



