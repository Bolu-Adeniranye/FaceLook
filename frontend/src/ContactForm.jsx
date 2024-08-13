import { useState } from "react";
import "./ContactForm.css"; // Adjust the path if needed

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
    };

    const url = "http://127.0.0.1:5000/create_contact";
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);

    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      alert(data.message);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>
      <div>
        <label htmlFor="firstName">First Name: </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="lastName">Last Name: </label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Create Contact</button>
    </form>
  );
};

export default ContactForm;
