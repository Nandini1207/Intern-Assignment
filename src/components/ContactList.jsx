import React, { useEffect, useState } from 'react';
import ContactCard from './ContactCard';
import EditContactCard from './EditContactCard';
import './Spinner.css'; // Import the updated spinner CSS

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [editingContact, setEditingContact] = useState(null); // For editing a contact
  const [selectedContact, setSelectedContact] = useState(null); // For detailed view
  const [loading, setLoading] = useState(true); // Spinner state

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        const contactsWithAvatars = data.map((contact) => ({
          ...contact,
          avatarUrl: `https://avatars.dicebear.com/v2/avataaars/${contact.username}.svg?options[mood][]=happy`,
        }));
        setContacts(contactsWithAvatars);
        setLoading(false); // Stop loading after data fetch
      });
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const deleteContact = (id) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  const startEditing = (contact) => {
    setEditingContact(contact);
  };

  const saveContact = (updatedContact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    setEditingContact(null);
  };

  const handleCardClick = (contact) => {
    setSelectedContact(contact); // Set the clicked contact as selected
  };

  const goBack = () => {
    setSelectedContact(null); // Go back to the contact list
  };

  return (
    <div className="container mt-5">
      {loading ? (
        // Loading Spinner
        <div className="spinner">
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="rect5"></div>
        </div>
      ) : editingContact ? (
        // Render Edit Contact Card
        <EditContactCard contact={editingContact} saveContact={saveContact} />
      ) : selectedContact ? (
        // Render Detailed Contact Card
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '80vh' }} // Full-height viewport for centering
        >
          <div
            className="card shadow p-3 mb-5 bg-white rounded"
            style={{
              width: '400px', // Set card width
              height: 'auto', // Automatically adjust height
            }}
          >
            <div className="card-body text-center">
              <img
                src={selectedContact.avatarUrl}
                alt={`${selectedContact.username}'s avatar`}
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '15px',
                }}
              />
              <h5 className="card-title">{selectedContact.name}</h5>
              <p className="card-text">
                <strong>Email:</strong> {selectedContact.email} <br />
                <strong>Phone:</strong> {selectedContact.phone} <br />
                <strong>Website:</strong>{' '}
                <a
                  href={selectedContact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedContact.website}
                </a>{' '}
                <br />
                <strong>Address:</strong> {selectedContact.address.street},{' '}
                {selectedContact.address.city} <br />
                <strong>Company:</strong> {selectedContact.company.name}
              </p>
              <button className="btn btn-success" onClick={goBack}>
                Go Back
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Render Contact Cards List
        <div className="row">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="col-md-3 mb-4"
              onClick={() => handleCardClick(contact)} // Handle card click
              style={{ cursor: 'pointer' }}
            >
              <ContactCard
                contact={contact}
                isFavorite={favorites.includes(contact.id)}
                toggleFavorite={() => toggleFavorite(contact.id)}
                deleteContact={() => deleteContact(contact.id)}
                startEditing={() => startEditing(contact)} // Pass edit functionality
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
