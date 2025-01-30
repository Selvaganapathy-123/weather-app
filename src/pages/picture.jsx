import React, { useState } from 'react';
import { Container, Row, Col, Modal, Carousel } from 'react-bootstrap';

import image1 from '../image/images (1).jpg';
import image2 from '../image/images (2).jpg';
import image3 from '../image/images (3).jpg';
import image4 from '../image/images (4).jpg';
import image5 from '../image/images (5).jpg';
import image6 from '../image/images (6).jpg';
import image7 from '../image/images (7).jpg';
import image8 from '../image/images (8).jpg';
import image9 from '../image/images (9).jpg';
import image10 from '../image/images (10).jpg';
import image11 from '../image/images (11).jpg';
import image12 from '../image/images (12).jpg';
import image13 from '../image/images (13).jpg';
import image14 from '../image/images (14).jpg';
import image15 from '../image/images (15).jpg';
import image16 from '../image/images (16).jpg';
import image17 from '../image/images (17).jpg';
import image18 from '../image/images (18).jpg';
import image19 from '../image/images(19).jpg';
import image20 from '../image/images(20).jpg';

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
  image17,
  image18,
  image19,
  image20
];

const Pictures = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageClick = (index) => {
    setActiveIndex(index);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

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
          Pictures
        </h1>
      </div>

      <Container className="mt-4">
        <Row>
          {images.map((image, index) => (
            <Col key={index} xs={6} md={4} className="mb-4">
              <div
                className="image-hover-container"
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className="img-fluid"
                  style={{
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    border: '2px solid #ccc',
                    padding: '4px',
                    width: '90%',
                  }}
                  onClick={() => handleImageClick(index)}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
            </Col>
          ))}
        </Row>

        <Modal show={showModal} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Image Viewer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel activeIndex={activeIndex} onSelect={setActiveIndex}>
              {images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={image}
                    alt={`Slide ${index}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Modal.Body>
        </Modal>
      </Container>
      
    </>
  );
};

export default Pictures;
