import React from 'react';
import ContactList from './components/ContactList';

function App() {
  return (
    <div>
      <header className="bg-dark text-white text-center py-3">
        <h1>Contact Details</h1>
      </header>
      <ContactList />
    </div>
  );
}

export default App;

