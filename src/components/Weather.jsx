import React, { useState, useEffect } from "react";

function Weather() {
  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;


  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
          city
        )}&aqi=no`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-box">
      <h2>Weather App 🌤️</h2>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={fetchWeather}>Get Weather</button>

      {loading && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

      {weather && !error && (
        <div className="weather-info">
          <h3>{weather.location.name}</h3>
          <p>🌡 Temperature: {weather.current.temp_c} °C</p>
          <p>☁ Condition: {weather.current.condition.text}</p>
          <p>💧 Humidity: {weather.current.humidity}%</p>
          <p>🌬 Wind: {weather.current.wind_kph} km/h</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
