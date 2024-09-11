/* eslint-disable react/prop-types */
import "./ContactList.css";

const ContactList = ({ contacts, updateContact, updateCallback }) => {
  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(
        `http://127.0.0.1:5000/delete_contact/${id}`,
        options
      );
      if (response.status === 200 || response.status === 201) {
        updateCallback();
      } else {
        console.error("Failed to Delete");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="contact-list">
      <h2>FaceLook Contacts</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>
                <button
                  className="update-btn"
                  onClick={() => updateContact(contact)}
                >
                  Update
                </button>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(contact.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
