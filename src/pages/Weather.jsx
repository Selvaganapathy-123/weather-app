import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Container, Form, Button } from "react-bootstrap";
import AnimatedWeather from "react-animated-weather";
import { Line } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const API_KEY = "f1b2f5180e7008ba5739cce52e1d7ce4";

const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  // const [forecast, setForecast] = useState([]);
  const [airQuality, setAirQuality] = useState(null);
  const [graphType, setGraphType] = useState("rainfall");
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => console.error("Error fetching location: ", error)
    );
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      fetchWeatherData(location.lat, location.lon);
    }
  }, [location]);

  const fetchWeatherData = async (lat, lon) => {
    try {
      const currentRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setCurrentWeather(currentRes.data);

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setHourlyWeather(forecastRes.data.list.slice(0, 12));
      // setForecast(forecastRes.data.list);

      const airQualityRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      setAirQuality(airQualityRes.data.list[0]);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  };

  const fetchLocationByCity = async (city) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      if (res.data && res.data.length > 0) {
        const { lat, lon } = res.data[0];
        setLocation({ lat, lon });
      } else {
        alert("City not found. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching location by city: ", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      fetchLocationByCity(searchQuery);
    }
  };

  const renderWeatherIcon = (weather) => {
    const icons = {
      Clear: "CLEAR_DAY",
      Clouds: "CLOUDY",
      Rain: "RAIN",
      Snow: "SNOW",
      Drizzle: "SLEET",
      Thunderstorm: "WIND",
      Mist: "FOG",
    };
    return icons[weather] || "CLEAR_DAY";
  };

  const rainfallData = {
    labels: hourlyWeather.map((data) =>
      new Date(data.dt * 1000).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "Rainfall (mm)",
        data: hourlyWeather.map((data) => data.rain?.["3h"] || 0),
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
      },
    ],
  };

  const temperatureData = {
    labels: hourlyWeather.map((data) =>
      new Date(data.dt * 1000).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "Temperature (°C)",
        data: hourlyWeather.map((data) => data.main.temp),
        borderColor: "orange",
        backgroundColor: "rgba(255, 165, 0, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text:
          graphType === "rainfall"
            ? "Rainfall Over Time"
            : "Temperature Over Time",
      },
    },
  };

  return (
    <>
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
          Weather
        </h1>
      </div>
    <Container className="py-4" style={{ animation: "fadeIn 2s" }}>

      {/* Search Bar */}
      <Form onSubmit={handleSearch} className="mb-4">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Search
        </Button>
      </Form>

      {currentWeather && (
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col xs={12} md={6}>
                <h3>{currentWeather.name}</h3>
                <h4>{currentWeather.weather[0].description}</h4>
                <p>Temperature: {currentWeather.main.temp}°C</p>
                <p>Feels Like: {currentWeather.main.feels_like}°C</p>
                <p>Humidity: {currentWeather.main.humidity}%</p>
                <p>Pressure: {currentWeather.main.pressure} hPa</p>
                <p>Wind Speed: {currentWeather.wind.speed} m/s</p>
                <p>Visibility: {currentWeather.visibility} meters</p>
                <p>Cloud Cover: {currentWeather.clouds.all}%</p>
              </Col>
              <Col
                xs={12}
                md={6}
                className="d-flex justify-content-center align-items-center"
              >
                <AnimatedWeather
                  icon={renderWeatherIcon(currentWeather.weather[0].main)}
                  color="goldenrod"
                  size={64}
                  animate={true}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      {airQuality && (
        <Card className="mb-4">
          <Card.Body>
            <h3>Air Quality</h3>
            <p>AQI: {airQuality.main.aqi}</p>
            <p>CO: {airQuality.components.co} μg/m³</p>
            <p>NO: {airQuality.components.no} μg/m³</p>
            <p>O₃: {airQuality.components.o3} μg/m³</p>
            <p>SO₂: {airQuality.components.so2} μg/m³</p>
          </Card.Body>
        </Card>
      )}

      <h2 className="text-center">Hourly Forecast</h2>
      <Row>
        {hourlyWeather.map((hour, index) => (
          <Col key={index} xs={12} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <p>{new Date(hour.dt * 1000).toLocaleTimeString()}</p>
                <p>Temp: {hour.main.temp}°C</p>
                <p>Humidity: {hour.main.humidity}%</p>
                <AnimatedWeather
                  icon={renderWeatherIcon(hour.weather[0].main)}
                  color="blue"
                  size={48}
                  animate={true}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="text-center">Graphs </h2>
      <Card className="mb-4">
        <Card.Body>
          <button
            onClick={() => setGraphType("rainfall")}
            className="btn btn-primary m-2"
          >
            Rainfall Graph 
          </button>
          <button
            onClick={() => setGraphType("temperature")}
            className="btn btn-secondary m-2"
          >
            Temperature Graph
          </button>
          <Line
            data={graphType === "rainfall" ? rainfallData : temperatureData}
            options={options}
          />
        </Card.Body>
      </Card>
    </Container></>
  );
};

export default WeatherApp;