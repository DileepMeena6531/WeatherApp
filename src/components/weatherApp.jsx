import { useState } from "react";
import "./WeatherApp.css";

function WeatherApp() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const API_URL = import.meta.env.VITE_WEATHER_API_URL;
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    const fetchWeather = async () => {
        try {
            setError(null);
            const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error("City not found");
            }
            const data = await response.json();
            setWeather(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetchWeather();

    };

    return (
        <div className="weather-container">
            <div className="weather-card">
                <h1 className="weather-title">Weather App</h1>

                <form onSubmit={handleSubmit} className="weather-form">
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city name" className="weather-input" />
                    <button type="submit" className="weather-button">Search</button>
                </form>

                {error && (
                    <div className="weather-error">
                        {error}
                    </div>
                )}

                {weather && (
                    <div className="weather-info">
                        <div className="weather-header">
                            <h2 className="weather-city">{weather.name}, {weather.sys.country}</h2>
                            <p className="weather-temp">{Math.round(weather.main.temp)}°C</p>
                            <p className="weather-description">{weather.weather[0].description}</p>
                        </div>

                        <div className="weather-details">
                            <div className="weather-detail-item">
                                <p className="detail-label">Feels Like</p>
                                <p className="detail-value">{Math.round(weather.main.feels_like)}°C</p>
                            </div>
                            <div className="weather-detail-item">
                                <p className="detail-label">Humidity</p>
                                <p className="detail-value">{weather.main.humidity}%</p>
                            </div>
                            <div className="weather-detail-item">
                                <p className="detail-label">Wind Speed</p>
                                <p className="detail-value">{weather.wind.speed} m/s</p>
                            </div>
                            <div className="weather-detail-item">
                                <p className="detail-label">Pressure</p>
                                <p className="detail-value">{weather.main.pressure} hPa</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WeatherApp