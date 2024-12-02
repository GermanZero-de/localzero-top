'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Correct import for the App Directory
import filterIcon from '../photos/filterPlaceholder.png';
import bookmarkIcon from '../photos/bookmarkIcon.png';

interface BlueFilterBarProps {
  onToggleFilterPanel: () => void; // For the Filter button
  onGoBack: () => void; // Add this property
}

const BlueFilterBar: React.FC<BlueFilterBarProps> = ({
  onToggleFilterPanel,
  onGoBack,
}) => {
  const router = useRouter();

  const handleGoBack = () => {
    try {
      if (typeof window !== 'undefined' && window.history.length > 1) {
        router.back(); // Navigate to the previous page
      } else {
        router.push('/'); // Fallback to the homepage if no history exists
      }
    } catch (error) {
      console.error('Error navigating back:', error);
    }
  };

  return (
    <div className="blue-filter-bar">
      <button onClick={onToggleFilterPanel} className="filter-icon-button">
        <Image src={filterIcon} alt="Filter Icon" width={24} height={24} />
      </button>
      <button className="bookmark-icon-button">
        <Image src={bookmarkIcon} alt="Bookmark Icon" width={24} height={24} />
      </button>
      <button onClick={onGoBack || handleGoBack} className="back-button">
        Back
      </button>
    </div>
  );
};

export default BlueFilterBar;
