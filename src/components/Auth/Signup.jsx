import React, { useState } from "react";
import "./signup.css";
import GoogleButton from "./GoogleButton";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    contact: "",
    dob: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // TODO: Submit form data to server
  };

  return (
    <div className="signupform">
      <h1>Sign-Up </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="contact">Contact:</label>
        <input
          type="tel"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Sign Up</button>
      </form>

      <GoogleButton />
    </div>
  );
};

export default Signup;
