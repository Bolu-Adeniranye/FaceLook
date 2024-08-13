import { useEffect, useState } from "react";
import "./App.css";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    console.log("Running");
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);

    console.log(data.contacts);
  };

  return (
    <div className="body">
      <ContactList contacts={contacts} />
      <ContactForm />
    </div>
  );
};

export default App;
