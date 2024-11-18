import React from 'react';
import Image from 'next/image';
import filterIcon from '../photos/filterPlaceholder.png';
import bookmarkIcon from '../photos/bookmarkIcon.png';

interface BlueFilterBarProps {
  onToggleFilterPanel: () => void; // For the Filter button
  onGoBack: () => void; // For the Back button
}

const BlueFilterBar: React.FC<BlueFilterBarProps> = ({ onToggleFilterPanel, onGoBack }) => {
  return (
    <div className="blue-filter-bar">
      <button onClick={onToggleFilterPanel} className="filter-icon-button">
        <Image src={filterIcon} alt="Filter Icon" width={24} height={24} />
      </button>
      <button className="bookmark-icon-button">
        <Image src={bookmarkIcon} alt="Bookmark Icon" width={24} height={24} />
      </button>

      <button onClick={onGoBack} className="back-button">
        Back
      </button>
    </div>
  );
};

export default BlueFilterBar;
