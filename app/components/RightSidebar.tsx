import React, { useState } from 'react';
import styles from './RightSidebar.module.scss';
import { FaBookmark, FaShareAlt } from 'react-icons/fa'; // Example icons
import { GoBookmark, GoBookmarkFill } from 'react-icons/go';

interface RightSidebarProps {
  handleShare: () => void;
  measure: any;
  isMeasureBookmarked: (code: string) => boolean;
  setShowBookmarkDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  showBookmarkDropdown: boolean;
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  handleShare,
  measure,
  isMeasureBookmarked,
  setShowBookmarkDropdown,
  showBookmarkDropdown,
}) => {
  return (
    <div className={styles.sidebarContainer}>
      {/* Buttons */}
      <div className={styles.buttonContainer}>
        {/* Bookmark Button */}
        <div className={styles.bookmarkContainer}>
          <button
            className={styles.sidebarButton}
            onClick={() => setShowBookmarkDropdown(!showBookmarkDropdown)}
          >
            {measure?.code && isMeasureBookmarked(measure.code) ? (
              <GoBookmarkFill className={styles.icon} />
            ) : (
              <GoBookmark className={styles.icon} />
            )}
            Merken
          </button>

          {/* Bookmark Dropdown */}
          {showBookmarkDropdown && (
            <div className={styles.bookmarkDropdown}>
              <div className={styles.bookmarkItems}>
              </div>
              <button className={styles.saveButton}>Speichern</button>
            </div>
          )}
        </div>

        {/* Share Button */}
        <button className={styles.sidebarButton} onClick={handleShare}>
          <FaShareAlt className={styles.icon} />
          Teilen
        </button>
      </div>

      {/* Title and Text */}
      <div className={styles.textContainer}>
        <h3 className={styles.title}>Best Practices</h3>
        <p className={styles.description}>
          Maßnahmen, Methoden, Projekte, Steuerung und Governance für die
          Planung und Transformation zur kommunalen Klimaneutralität.
        </p>
      </div>

      {/* Measure Card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>Haßfurt | Bayern</span>
        </div>
        <div className={styles.cardContent}>
          Bürgerwindpark Sailershauser Wald
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
