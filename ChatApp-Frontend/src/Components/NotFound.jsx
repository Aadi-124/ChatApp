import React from 'react';
// import './CSS/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Oops! Page not found.</p>
      <a href="/" className="home-button">Go Back Home</a>
    </div>
  );
};

export default NotFound;
