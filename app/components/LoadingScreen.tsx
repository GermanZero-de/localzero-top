/*
LoadingScreen.tsx
Displays the loading spinner when the app is fetching data
Uses loading.scss for styling

*/
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
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default LoadingSpinner;
