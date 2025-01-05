/*
This file creates the BlueFilterBar on the mobile devices and small screens.
The BlueFilterBar contains a back button, filtering, and share button.
*/

'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Correct import for the App Directory
import filterIcon from '../photos/filterPlaceholder.png';
import { FaShareAlt } from 'react-icons/fa';

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

  const handleShare = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(
      () => {
        console.log('Link copied to clipboard');
        alert('Link copied to clipboard');
      },
      (err) => {
        console.error('Failed to copy the link: ', err);
      },
    );
  };

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
      {!hideBackButton && (
        <button onClick={handleShare} className="share-button">
          <FaShareAlt />
        </button>
      )}
    </div>
  );
};

export default BlueFilterBar;
