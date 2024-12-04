'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Correct import for the App Directory
import filterIcon from '../photos/filterPlaceholder.png';
import bookmarkIcon from '../photos/bookmarkIcon.png';

interface BlueFilterBarProps {
  onToggleFilterPanel?: () => void; // Optional, for filter button
  onGoBack: () => void; // For back button
  hideIcons?: boolean; // New prop to hide icons
  hideBackButton?: boolean; // New prop to hide the back button
}

const BlueFilterBar: React.FC<BlueFilterBarProps> = ({
  onToggleFilterPanel,
  onGoBack,
  hideIcons = false,
  hideBackButton = false,
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
      {!hideIcons && (
        <button onClick={onToggleFilterPanel} className="filter-icon-button">
          <Image src={filterIcon} alt="Filter Icon" width={24} height={24} />
        </button>
      )}
      {!hideBackButton && (
        <button onClick={onGoBack} className="back-button">
          Back
        </button>
      )}
    </div>
  );
};

export default BlueFilterBar;