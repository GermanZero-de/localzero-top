import React from 'react';
import '../styles/loading.scss';

const LoadingSpinner = ({ variant }: { variant?: 'default' | 'offset' }) => {
  return (
    <div
      className={`loading-spinner ${
        variant === 'offset' ? 'loading-spinner--offset' : ''
      }`}
    >
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
