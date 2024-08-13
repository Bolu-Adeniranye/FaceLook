import { useEffect, useState } from "react";
import "./App.css";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openCreateModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
    }
  };
  return (
    <div className="body">
      <ContactList contacts={contacts} />
      <button onClick={openCreateModal} className="button">
        Create New Contact
      </button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <ContactForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
