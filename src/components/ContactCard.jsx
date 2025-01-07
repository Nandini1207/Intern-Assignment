import React from 'react';

const ContactCard = ({ contact, isFavorite, toggleFavorite, deleteContact, startEditing }) => {
  // Generate a unique avatar URL based on the username
  const avatarUrl = `https://api.dicebear.com/9.x/micah/svg?seed=George`;

  return (
    <div className="card mb-3" style={{ width: '20rem' }}>
      <div className="card-body shadow text-center">
        <img
          src={avatarUrl}
          alt={`${contact.username}'s avatar`}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '100%',
            objectFit: 'cover',
            marginBottom: '15px',
          }}
        />
        <h5 className="card-title">{contact.name}</h5>
        <p className="card-text">
          {/* Email */}
          <span>
            <i className="bi bi-envelope me-2"></i>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </span>
          <br />
          {/* Phone */}
          <span>
            <i className="bi bi-telephone me-2"></i>
            {contact.phone}
          </span>
          <br />
          {/* Website */}
          <span>
            <i className="bi bi-globe me-2"></i>
            <a href={contact.website} target="_blank" rel="noopener noreferrer">
              {contact.website}
            </a>
          </span>
        </p>
        <div className="d-flex justify-content-around mt-5">
          {/* Favorite */}
          <button
            className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={toggleFavorite}
          >
            <i className="bi bi-heart"></i>
          </button>
          {/* Edit */}
          <button className="btn btn-outline-primary" onClick={startEditing}>
            <i className="bi bi-pencil"></i>
          </button>
          {/* Delete */}
          <button className="btn btn-outline-secondary" onClick={deleteContact}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
