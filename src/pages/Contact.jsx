import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid.";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Enter a valid 10-digit phone number.";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      setErrors({});
      console.log("Form Submitted:", formData);

      // Code to send email goes here using API (e.g., Nodemailer, SendGrid, etc.)
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else {
      setErrors(validationErrors);
    }
  };

  const cardStyle = {
    // width: "70%",
    margin: "0 auto",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    color: "#000", // Ensures text color stays unaffected
  };

  const inputStyle = (field) => ({
    border: errors[field] ? "1px solid red" : "1px solid #ced4da",
  });

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
          Contact us
        </h1>
      </div>
    <Container fluid className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <Row className="justify-content-center align-items-center">
        <Col md={10} lg={8}>
          <Card style={cardStyle} className="p-4">
            <Row>
              {/* Left Section */}
              <Col md={5} className="p-4 text-white" style={{ backgroundColor: "#343a40" }}>
                <h4>Contact Information</h4>
                <p>
                  Have questions? Reach out to us, and we'll respond as soon as possible.
                </p>
                <div className="d-flex align-items-center mb-3">
                  <FontAwesomeIcon icon={faPhone} className="me-2" />
                  <span>8807636361</span>
                </div>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                  <span>skyview@gmail.com</span>
                </div>
              </Col>

              {/* Right Form Section */}
              <Col md={7} className="p-4">
                <h4 className="mb-4 text-center">Get In Touch!</h4>
                {submitted && (
                  <Alert variant="success" className="text-center">
                    Thanks for contacting us!
                  </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  {/* Name */}
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      style={inputStyle("name")}
                    />
                    {errors.name && <small className="text-danger">{errors.name}</small>}
                  </Form.Group>

                  {/* Email */}
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      style={inputStyle("email")}
                    />
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                  </Form.Group>

                  {/* Phone */}
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={inputStyle("phone")}
                    />
                    {errors.phone && <small className="text-danger">{errors.phone}</small>}
                  </Form.Group>

                  {/* Message */}
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {/* Submit Button */}
                  <div className="text-center">
                    <Button type="submit" style={{ backgroundColor: "#000", color: "#fff" }}>
                      Submit
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default ContactForm;
