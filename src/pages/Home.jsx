import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import video from "../image/earth-bg.mp4";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const WeatherApp = () => {
    const navigate = useNavigate();

    const containerStyle = {
        position: "relative",
        width: "100%",
        height: "90vh",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
        color: "white",
        margin: "10px"
    };

    const videoStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: -1,
    };

    const leftColStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px",
        height: "100%",
    };

    const appNameStyle = {
        fontSize: "3rem",
        fontWeight: "bold",
        marginBottom: "1rem",
    };

    const appDescriptionStyle = {
        fontSize: "1.2rem",
        marginBottom: "2rem",
    };

    return (
        <>
            <div style={containerStyle}>
                {/* Video Background */}
                <video style={videoStyle} autoPlay loop muted>
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Content */}
                <Container fluid className="h-100 d-flex align-items-center">
                    <Row className="w-100">
                        {/* Left Column */}
                        <Col lg={6} sm={8} style={leftColStyle}>
                            <div style={appNameStyle} >SkyView</div>
                            <div style={appDescriptionStyle}>
                                SkyView is your go-to weather app, providing real-time updates on
                                current weather conditions and detailed forecasts. Stay prepared
                                for any weather!
                            </div>
                            <Button
                                variant="outline-light"
                                style={{ marginRight: "10px" }}
                                className="mb-4"
                                onClick={() => navigate("/pages/Weather")}
                            >
                                Current Weather
                            </Button>
                            <Button
                                variant="outline-light"
                                className="mb-4"
                                onClick={() => navigate("/pages/forecast")}
                            >
                                Weather Forecast
                            </Button>
                        </Col>
                        {/* Right Column */}
                        <Col lg={6} sm={1}></Col>
                    </Row>
                </Container>
            </div>
            
        </>
    );
};

export default WeatherApp;
