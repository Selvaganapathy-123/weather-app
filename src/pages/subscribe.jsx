// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FloatingLabel, Form, Button, Container } from 'react-bootstrap';

// function Subscribe() {
//   return (
//     <Container fluid className="p-3">
//       <div
//         className="video-container d-flex justify-content-center align-items-center"
//         style={{
//           position: 'relative',
//           width: '100%',
//           height: '100px',
//           overflow: 'hidden',
//         }}
//       >
//         <video
//           className="d-block"
//           autoPlay
//           muted
//           loop
//           style={{
//             width: '100%',
//             height: '100%',
//             objectFit: 'cover',
//           }}
//         >
//           <source src="/cloudbg.mp4" type="video/mp4" />
//         </video>
//         <h5
//           style={{
//             position: 'absolute',
//             top: '50%',
//             width :'500px',
//             transform: 'translate(-50%, -50%)',
//             color: 'white',
//             fontWeight: 'bold',
//             textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
//             margin: 0,
//           }}
//         >
//           For daily update 
//         </h5>
//         <div
//           className="d-flex"
//           style={{
//             position: 'absolute',
//             zIndex: 1,
//             gap: '50px',
//             padding: '10px',
//             borderRadius: '10px',
//           }}
//         >
//           <FloatingLabel
//             controlId="floatingEmail"
//             label="Email address"
//             className="mb-0 text-light "
            
//           >
//             <Form.Control
//               type="email"
//               placeholder="name@example.com"
//               style={{
//                 borderRadius: '30px',
//                 width: '500px',
//                 backgroundColor: 'transparent',
//                 color: '#fff',
//                 border: '1px solid rgba(255, 255, 255, 0.5)'
//               }}
//             />
//           </FloatingLabel>
//           <Button

//            variant="primary"
//             className="btn-subscribe"
//             style={{
//               padding: '10px 20px',
//               borderRadius: '30px',
//               fontWeight: 'bold',
//               textTransform: 'uppercase',
//               boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
//             }}
            
//           >
//             Subscribe
//           </Button>
//         </div>
//       </div>
//     </Container>
//   );
// }

// export default Subscribe;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FloatingLabel, Form, Button, Container } from 'react-bootstrap';

function Subscribe() {
  return (
    <Container fluid className="p-3">
      <div
        className="video-container d-flex justify-content-center align-items-center"
        style={{
          position: 'relative',
          width: '100%',
          height: '200px', // Adjusted for better mobile view
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
        <div
          className="d-flex flex-column flex-md-row justify-content-center align-items-center"
          style={{
            position: 'absolute',
            zIndex: 1,
            gap: '15px', // Increased gap between elements
            padding: '10px',
            borderRadius: '10px',
            width: '90%', // Ensure the form is not too wide on small screens
            textAlign: 'center', // Ensure text is centered
          }}
        >
          <h5 className="text-light mb-3">Our Newsletter</h5>
          <FloatingLabel
            controlId="floatingEmail"
            label="Email address"
            className="mb-2 text-white"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              style={{
                borderRadius: '30px',
                width: '100%', // Make input width responsive
                maxWidth: '500px', // Limit the max width for larger screens
                backgroundColor: 'transparent',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.5)',
              }}
            />
          </FloatingLabel>
          <Button
            variant="primary"
            className="btn-subscribe"
            style={{
              padding: '10px 20px',
              borderRadius: '30px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
             
            }}
          >
            Subscribe
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Subscribe;
