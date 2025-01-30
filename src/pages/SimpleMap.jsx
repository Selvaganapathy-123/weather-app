import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const SimpleMap = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 20, lng: 0 }); // Default location
  const [weather, setWeather] = useState(null);

  const openWeatherApiKey = "f1b2f5180e7008ba5739cce52e1d7ce4"; // Replace with your OpenWeather API Key

  // Fetch weather data
  const fetchWeather = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`
      );

      if (response.data.cod !== 200) {
        alert("Error: " + response.data.message);
        return;
      }

      const data = response.data;
      setWeather({
        location: `${data.name}, ${data.sys.country}`,
        temperature: data.main.temp,
        description: data.weather[0].description,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`, // Get the weather icon
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data.");
    }
  };

  // Automatically fetch weather for current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          fetchWeather(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to fetch your location. Default location will be used.");
          fetchWeather(20, 0); // Default location in case of error
        }
      );
    } else {
      fetchWeather(20, 0); // Default location if geolocation is not supported
    }
  }, []); // Empty dependency array, so it only runs once when component mounts

  // Allow users to click on the map for weather data
  const LocationMarker = () => {
    useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setCurrentLocation({ lat, lng });
        fetchWeather(lat, lng);
      },
    });

    return currentLocation ? (
      <Marker position={[currentLocation.lat, currentLocation.lng]}>
        <Popup>
          {weather ? (
            <div>
              <p><strong>Location:</strong> {weather.location}</p>
              <p><strong>Temperature:</strong> {weather.temperature}°C</p>
              <p><strong>Description:</strong> {weather.description}</p>
              <p><strong>Wind Speed:</strong> {weather.windSpeed} m/s</p>
              <p><strong>Humidity:</strong> {weather.humidity}%</p>
              <p><strong>Pressure:</strong> {weather.pressure} hPa</p>
              <img src={weather.icon} alt="Weather Icon" style={{ width: "50px" }} />
            </div>
          ) : (
            "Loading weather data..."
          )}
        </Popup>
      </Marker>
    ) : null;
  };

  return (
    <div >
       <div
        className="video-container"
        style={{
          position: 'relative',
          width: '100%',
          height: '250px',
          overflow: 'hidden',
        }}
      >
        <video
          className="d-block"
          autoPlay
          muted
          loop
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src="/cloudbg.mp4" type="video/mp4" />
        </video>
        <h1
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '4rem',
            fontWeight: 'bold',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
            margin: 0,
          }}
        >
          Maps
        </h1>
      </div>
        <h1 className="text-center">Weather Map</h1>
        <p className="text-center">
          Current location weather is shown by default. Click anywhere on the map to see weather
          data for that location.
        </p>


      <MapContainer center={[currentLocation.lat, currentLocation.lng]} zoom={5} style={{ height: "80vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>

      {weather && (
        <div className="weather-details mt-4">
          <h2>Weather Details</h2>
          <p><strong>Location:</strong> {weather.location}</p>
          <p><strong>Temperature:</strong> {weather.temperature}°C</p>
          <p><strong>Description:</strong> {weather.description}</p>
          <p><strong>Wind Speed:</strong> {weather.windSpeed} m/s</p>
          <p><strong>Humidity:</strong> {weather.humidity}%</p>
          <p><strong>Pressure:</strong> {weather.pressure} hPa</p>
          <img src={weather.icon} alt="Weather Icon" style={{ width: "50px" }} />
        </div>
      )}
    </div>
  );
};

export default SimpleMap;
