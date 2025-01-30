// // import React from 'react';

// // function Footer() {
// //   return (
// //     <footer className="bg-dark text-white py-4">
// //       <div className="container">
// //         <div className="row">
// //           <div className="col-md-6">
// //             <h5>Weather Forecast App</h5>
// //             <p>Stay updated with the latest weather forecasts and details.</p>
// //           </div>
// //           <div className="col-md-6 text-md-end">
// //             <p>© {new Date().getFullYear()} Weather Forecast. All rights reserved.</p>
// //             <div>
// //               {/* <a href="#" className="text-white me-3">Privacy Policy</a>
// //               <a href="#" className="text-white">Terms of Service</a> */}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </footer>
// //   );
// // }

// // export default Footer;

// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';

// function Footer() {
//   // Get the saved theme from localStorage or default to light
//   const [darkTheme, setDarkTheme] = useState(() => {
//     const savedTheme = localStorage.getItem('theme');
//     return savedTheme === 'dark';
//   });

//   const footerStyles = {
//     backgroundColor: darkTheme ? '#212529' : '#f8f9fa', // Dark mode background color
//     color: darkTheme ? '#ffffff' : '#000000', // Dark mode text color
//     textAlign: 'center',
//     padding: '1rem',
//     marginTop: 'auto',
//   };

//   return (
//     <footer style={footerStyles}>
//       <Container>
//         <Row>
//           <Col md={6}>
//             <h5>Weather Forecast App</h5>
//             <p>Stay updated with the latest weather forecasts and details.</p>
//           </Col>
//           <Col md={6} className="text-md-end">
//             <p>© {new Date().getFullYear()} Weather Forecast. All rights reserved.</p>
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// }

// export default Footer;

// src/components/Footer.js
// src/components/Footer.js
import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ThemeContext } from './Theme';

function Footer() {
  const { darkTheme } = useContext(ThemeContext);

  const footerStyles = {
    backgroundColor: darkTheme ? '#212529' : '#f8f9fa',
    color: darkTheme ? '#ffffff' : '#000000',
    textAlign: 'center',
    padding: '1rem',
    marginTop: 'auto',
  };

  return (
    <footer style={footerStyles}>
      <Container>
        <Row>
          <Col md={6}>
            <h5>Weather Forecast App</h5>
            <p>Stay updated with the latest weather forecasts and details.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <p>© {new Date().getFullYear()} Weather Forecast. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
