import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Card, Row, Col, Container, Form, Button, Modal } from "react-bootstrap";
import AnimatedWeather from "react-animated-weather";
import "bootstrap/dist/css/bootstrap.min.css";

const API_KEY = "f1b2f5180e7008ba5739cce52e1d7ce4";

const Forecast = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [searchQuery, setSearchQuery] = useState("");
  const [showHourly, setShowHourly] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

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

  const fetchWeatherData = useCallback(async (lat, lon) => {
    try {
      const currentRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setCurrentWeather(currentRes.data);

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setForecast(groupByDay(forecastRes.data.list));
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      fetchWeatherData(location.lat, location.lon);
    }
  }, [location, fetchWeatherData]); // ✅ Now `fetchWeatherData` is included safely

  const groupByDay = (data) => {
    const grouped = data.reduce((acc, item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
    return Object.entries(grouped).map(([date, values]) => ({ date, values }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const locationRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${API_KEY}&units=metric`
      );
      const { lat, lon } = locationRes.data.coord;
      setLocation({ lat, lon });
    } catch (error) {
      console.error("Error searching for location: ", error);
    }
  };

  const handleViewHourly = (day) => {
    setSelectedDay(day);
    setHourlyWeather(day.values);
    setShowHourly(true);
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

  return (
    <> <div></div>
      <div
        className="video-container"
        style={{
          position: "relative",
          width: "100%",
          height: "250px",
          overflow: "hidden",
        }}
      >
        <video
          className="d-block"
          autoPlay
          muted
          loop
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/cloudbg.mp4" type="video/mp4" />
        </video>
        <h1
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "4rem",
            fontWeight: "bold",
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
            margin: 0,
          }}
        >
          Forecast
        </h1>
      </div>
      <Container className="py-4" style={{ animation: "fadeIn 2s" }}>
        <Form onSubmit={handleSearch} className="mb-4">
          <Row>
            <Col xs={9}>
              <Form.Control
                type="text"
                placeholder="Search for a city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Col>
            <Col xs={3}>
              <Button type="submit" variant="primary" className="w-100">
                Search
              </Button>
            </Col>
          </Row>
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
                </Col>
                <Col xs={12} md={6} className="d-flex justify-content-center align-items-center">
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

        <h2 className="text-center">5-Day Forecast</h2>
        {forecast.map((day, index) => (
          <Card className="mb-4" key={index}>
            <Card.Header>
              <h4>{day.date}</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xs={12} md={6}>
                  <p>Max Temp: {Math.max(...day.values.map((d) => d.main.temp))}°C</p>
                  <p>Min Temp: {Math.min(...day.values.map((d) => d.main.temp))}°C</p>
                  <p>Humidity: {day.values[0].main.humidity}%</p>
                  <p>Weather: {day.values[0].weather[0].description}</p>
                </Col>
                <Col xs={12} md={6}>
                  <Button
                    variant="info"
                    className="w-100"
                    onClick={() => handleViewHourly(day)}
                  >
                    View Hourly Forecast
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}

        <Modal show={showHourly} onHide={() => setShowHourly(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Hourly Forecast - {selectedDay?.date}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              {hourlyWeather.map((hour, idx) => (
                <Col key={idx} xs={12} md={4} className="mb-3">
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
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default Forecast;
