
import { useState } from "react";

function App() {

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [forecast, setForecast] = useState([]);

  const API_KEY = "3d818a3bf4fc8feaa045ecffabef6d63";


  const getWeather = async () => {

    if (city.trim() === "") {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }

    try {
      setError("");
      setWeather(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!forecastResponse.ok) {
        throw new Error("Unable to fetch forecast");
      }

      const forecastData = await forecastResponse.json();

      setForecast(forecastData.list);

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      setWeather(data);

    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div>
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getWeather}>
        Get Weather
      </button>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}

    </div>
  );
}

export default App;
