import React from 'react';
import './Loader.css';

const Loader: React.FC = () => {
  return (
    <div data-testid="loader" className="loader">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
