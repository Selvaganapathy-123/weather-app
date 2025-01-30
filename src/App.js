import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import Header from './pages/Header';
import Picture from './pages/picture';
import Footer from './pages/Footer';
import { ThemeProvider } from './pages/Theme';
import Subscribe from './pages/subscribe';
import Home from './pages/Home';
import CloudMap from './pages/CloudMap';
import WindMap from './pages/WindMap';
import TemperatureMap from './pages/TemperatureMap';
import PressureMap from './pages/PressureMap';
import RainfallMap from './pages/RainfallMap';
import SimpleMap from './pages/SimpleMap';
import ContactForm from './pages/Contact';
import Map from './pages/map';
import Forecast from './pages/forecast';
import WeatherApp from './pages/Weather';



function App() {
  return (
    <Router>
       <ThemeProvider>
      <Header/>
      <Routes>
        <Route path="/pages/Home" element={<Home/>} />
        <Route path="/" element={<Home/>} /> 
        <Route path='/pages/Weather'element={<WeatherApp/>}/>
        <Route path='/pages/Map'element={<Map/>}/>
        <Route path='/pages/picture'element={<Picture/>}/>
        <Route path="/cloud-map" element={<CloudMap />} />
        <Route path='/simple-map'element={<SimpleMap/>}/>
        <Route path="/wind-map" element={<WindMap />} />
        <Route path="/temperature-map" element={<TemperatureMap />} />
        <Route path="/rainfall-map" element={<RainfallMap />} />
        <Route path="/pressure-map" element={<PressureMap />} />
        <Route path='/pages/Contact'element={<ContactForm/>}/>
        <Route path='/pages/forecast'element={<Forecast/>}/>
      </Routes>
      <Subscribe/>
      <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
