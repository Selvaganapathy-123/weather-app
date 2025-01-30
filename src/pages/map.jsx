import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CloudMapImg from '../image/cloudmap.jpg';
import SimpleMapImg from '../image/simplemap.png';
import PressureMapImg from '../image/pressuremap.png';
import tempmap from '../image/temp.jpg';
import WindMapImg from '../image/windmap.jpg';
import RainfallMapImg from '../image/rainmap.jpg';

function Map() {
  const cards = [
    {
        title: 'Simple Map',
        image: SimpleMapImg, 
        description: 'This map contain all weather details.',
        path: '/simple-map', // Correct path to the route for CloudMap
      },
    {
      title: 'Cloud Map',
      image: CloudMapImg, 
      description: 'Explore detailed cloud patterns across the globe.',
      path: '/cloud-map', // Correct path to the route for CloudMap
    },
    {
      title: 'Wind Map',
      image: WindMapImg, // Replace with actual image URL
      description: 'Visualize wind speeds and directions worldwide.',
      path: '/wind-map', // Correct path to the route for WindMap
    },
    {
      title: 'Temperature Map',
      image: tempmap, // Replace with actual image URL
      description: 'Analyze temperature variations in different regions.',
      path: '/temperature-map', // Correct path to the route for TemperatureMap
    },
    {
      title: 'Rainfall Map',
      image: RainfallMapImg, // Replace with actual image URL
      description: 'Track rainfall levels in various locations.',
      path: '/rainfall-map', // Correct path to the route for RainfallMap
    },
    {
      title: 'Pressure Map',
      image: PressureMapImg, // Replace with actual image URL
      description: 'Examine atmospheric pressure across the globe.',
      path: '/pressure-map', // Correct path to the route for PressureMap
    },
  ];

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
          Maps
        </h1>
      </div>
    <Container className="py-5" data-aos="fade-up">
        
      <h2 className="text-center mb-4">Weather Maps</h2>
      <Row className="g-4">
        {cards.map((card, index) => (
          <Col
            key={index}
            xs={12}
            sm={12}
            md={6}
            lg={6}
            className="d-flex justify-content-center"
          >
            <Link to={card.path} style={{ textDecoration: 'none' }}>
              <Card
                style={{
                  width: '30rem',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Card.Img
                  variant="top"
                  src={card.image}
                  alt={card.title}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title className="text-center">{card.title}</Card.Title>
                  <Card.Text className="text-center">{card.description}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
    </>
  );
}

export default Map;
