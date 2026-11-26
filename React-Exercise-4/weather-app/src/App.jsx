
import { useState } from "react";

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = "3d818a3bf4fc8feaa045ecffabef6d63";

  const getWeather = async () => {

    if (city.trim() === "") {
      setError("Please enter a city name");
      setWeather(null);
      setForecast([]);
      return;
    }

    try {
      setError("");
      setWeather(null);
      setForecast([]);

      // Current weather
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);

      // 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!forecastResponse.ok) {
        throw new Error("Unable to fetch forecast");
      }

      const forecastData = await forecastResponse.json();

      const dailyForecast = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      setForecast(dailyForecast);

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

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h2>Current Weather - {weather.name}</h2>

          <p>Temperature: {weather.main.temp} °C</p>
          <p>Feels Like: {weather.main.feels_like} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}

      {forecast.length > 0 && (
        <div>
          <h2>5 Day Forecast</h2>

          <ul>
            {forecast.map((item, index) => (
              <li key={index}>
                <p>-------------------------</p>
                <p>
                  Date: {new Date(item.dt_txt).toLocaleDateString("en-IN")}
                </p>

                <p>Temperature: {item.main.temp} °C</p>
                <p>Humidity: {item.main.humidity}%</p>
                <p>Weather: {item.weather[0].description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

export default App;
