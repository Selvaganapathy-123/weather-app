import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RainfallMap = () => {
  const apiKey = "f1b2f5180e7008ba5739cce52e1d7ce4"; // Your OpenWeather API key
  const center = [20, 0];
  const zoom = 2;

  const rainfallLayerUrl = `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`;
  const baseLayerUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <div>
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
      <h1 style={{ textAlign: 'center' }}>Rainfall Map</h1>
      <MapContainer center={center} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
        {/* Base map from OpenStreetMap */}
        <TileLayer
          url={baseLayerUrl}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Rainfall map overlay */}
        <TileLayer
          url={rainfallLayerUrl}
        //   opacity={0.6}
        />
      </MapContainer>
    </div>
  );
};

export default RainfallMap;
