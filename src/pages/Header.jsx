// import React, { useState, useEffect } from 'react';
// import { Navbar, Nav, Container, Form } from 'react-bootstrap';

// import logo from './image/logo.png';

// function Header() {
//   const [darkTheme, setDarkTheme] = useState(
//     window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
//   );

//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     const handleChange = (e) => setDarkTheme(e.matches);
//     mediaQuery.addEventListener('change', handleChange);

//     return () => {
//       mediaQuery.removeEventListener('change', handleChange);
//     };
//   }, []);

//   const toggleTheme = () => {
//     setDarkTheme(!darkTheme);
//     document.body.style.backgroundColor = darkTheme ? '#ffffff' : '#212529';
//     document.body.style.color = darkTheme ? '#000000' : '#ffffff';
//   };

//   useEffect(() => {
//     document.body.style.backgroundColor = darkTheme ? '#212529' : '#ffffff';
//     document.body.style.color = darkTheme ? '#ffffff' : '#000000';
//   }, [darkTheme]);

//   return (
//     <header>
//       <Navbar bg={darkTheme ? "dark" : "light"} variant={darkTheme ? "dark" : "light"} expand="lg" className="mt-2">
//         <Container>
//           <Navbar.Brand href="/">
//             <img
//               src={logo}
//               width="110"
//               height="60"
//               className="d-inline-block align-top"
//               alt="React Bootstrap logo"
//             />
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbar-nav" />
//           <Navbar.Collapse id="navbar-nav">
//             <Nav className="ms-auto">
//               <Nav.Link href="/pages/Home"className='mx-4 fw-bold '>Home</Nav.Link>
//               <Nav.Link href="/pages/Weather"className='mx-4 fw-bold'>Forecast</Nav.Link>
//               <Nav.Link href="/pages/WeatherMap"className='mx-4 fw-bold'>Map</Nav.Link>
//               <Nav.Link href="/pages/Weatmap"className='mx-4 fw-bold'>Picture</Nav.Link>
//               <Nav.Link href="/pages/Weatmap"className='mx-4 fw-bold'>Contact</Nav.Link>
//               <Form.Check
//                 type="switch"
//                 id="theme-switch"
//                 label={darkTheme ? "Dark Mode" : "Light Mode"}
//                 checked={darkTheme}
//                 onChange={toggleTheme}
//                 className="me-2 mx-5 my-1 text-secondaryclassName='mx-4 '"
//               />
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   );
// }

// export default Header;



// import React, { useState, useEffect } from 'react';
// import { Navbar, Nav, Container, Form } from 'react-bootstrap';

// import logo from '..//image/logo.png';

// function Header() {
//   const [darkTheme, setDarkTheme] = useState(false);

//   const toggleTheme = () => {
//     setDarkTheme(!darkTheme);
//     document.body.style.backgroundColor = darkTheme ? '#ffffff' : '#212529';
//     document.body.style.color = darkTheme ? '#000000' : '#ffffff';
//     // localStorage.getItem("mode") == "DARK" ? localStorage.setItem("mode", "BRIGHT") : localStorage.setItem("mode", "DARK")
    
//   };

//   useEffect(() => {
//     document.body.style.backgroundColor = darkTheme ? '#212529' : '#ffffff';
//     document.body.style.color = darkTheme ? '#ffffff' : '#000000';
//   }, [darkTheme]);
//   return (
//     <header>
//       <Navbar bg={darkTheme ? "dark" : "light"} variant={darkTheme ? "dark" : "light"} expand="lg" className="mt-2">
//         <Container>
//           <Navbar.Brand href="/">
//             <img
//               src={logo}
//               width="110"
//               height="60"
//               className="d-inline-block align-top"
//               alt="React Bootstrap logo"
//             />
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbar-nav" />
//           <Navbar.Collapse id="navbar-nav">
//             <Nav className="ms-auto">
//               <Nav.Link href="/pages/Home"className='mx-4 fw-bold '>Home</Nav.Link>
//               <Nav.Link href="/pages/Weather"className='mx-4 fw-bold'>Forecast</Nav.Link>
//               <Nav.Link href="/pages/WeatherMap"className='mx-4 fw-bold'>Map</Nav.Link>
//               <Nav.Link href="/pages/picture"className='mx-4 fw-bold'>Picture</Nav.Link>
//               <Nav.Link href="/pages/Weatmap"className='mx-4 fw-bold'>Contact</Nav.Link>
//               <Form.Check
//                 type="switch"
//                 id="theme-switch"
//                 label={darkTheme ? "Dark Mode" : "Light Mode"}
//                 checked={darkTheme}
//                 onChange={toggleTheme}
//                 className="me-2 mx-5 my-1 text-secondary "
//               />
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   );
// }

// export default Header;

// src/components/Header.js
import React, { useContext } from 'react';
import { Navbar, Nav, Container, Form } from 'react-bootstrap';
import { ThemeContext } from './Theme';
import logo from '../image/logo.png';

function Header() {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <header>
      <Navbar bg={darkTheme ? 'dark' : 'light'} variant={darkTheme ? 'dark' : 'light'} expand="lg" className="mt-2 ">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="110"
              height="60"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/pages/Home" className="mx-4 fw-bold">Home</Nav.Link>
              <Nav.Link href="/pages/Weather" className="mx-4 fw-bold">Weather</Nav.Link>
              <Nav.Link href="/pages/forecast" className="mx-4 fw-bold">Forecast</Nav.Link>
              <Nav.Link href="/pages/Map" className="mx-4 fw-bold">Map</Nav.Link>
              <Nav.Link href="/pages/picture" className="mx-4 fw-bold">Picture</Nav.Link>
              <Nav.Link href="/pages/Contact" className="mx-4 fw-bold">Contact</Nav.Link>
              <Form.Check
                type="switch"
                id="theme-switch"
                label={darkTheme ? 'Dark Mode' : 'Light Mode'}
                checked={darkTheme}
                onChange={toggleTheme}
                className="me-2 mx-5 my-1 text-secondary"
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
