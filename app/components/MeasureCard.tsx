import React, { useState } from 'react';
import Link from 'next/link';
import ArrowRight from '@/app/components/Arrow-Right';
import '../styles/Focuses.scss';
import { Blueprint } from '@/app/models/blueprint';
import Image from 'next/image';
import cityIcon from '../photos/cityIconAlt.png';

import { GoBookmark } from "react-icons/go";
import { GoBookmarkFill } from "react-icons/go";

interface Bookmark {
  name: string;
  measures: Blueprint[];
}

interface MeasureCardProps {
  blueprint: Blueprint;
  hideArrow?: boolean;
  hideCities?: boolean;
  currentFilters?: string; // Include current filters to persist
  bookmarks: Bookmark[];
  onAddMeasureToBookmark: (bookmarkName: string, measure: Blueprint) => void;
}

const MeasureCard: React.FC<MeasureCardProps> = ({
  blueprint,
  hideArrow,
  hideCities,
  currentFilters,
  onAddMeasureToBookmark,
  bookmarks,
}) => {
  const { title, sector, priority, focuses, code, cities } = blueprint;
  const [showDropdown, setShowDropdown] = useState(false);
  const isBookmarked = bookmarks.some((bookmark) =>
    bookmark.measures.some((measure) => measure.code === blueprint.code),
  );

  const focuseBalls = focuses.map((focus, index) => (
    <div key={index} className="focus-item">
      <div
        className="color-ball"
        style={{ backgroundColor: focus.color }}
      ></div>
    </div>
  ));

  const handleAddToBookmark = async (bookmarkName: string) => {
    try {
      const blueprintToAdd = {
        ...blueprint,
        code: blueprint.code,
        title: blueprint.title,
        sector: { ...blueprint.sector },
        priority: { ...blueprint.priority },
        focuses: blueprint.focuses.map((focus) => ({ ...focus })),
        cities: blueprint.cities.map((city) => ({ ...city })),
        description: blueprint.description,
      };
      onAddMeasureToBookmark(bookmarkName, blueprintToAdd);
      setShowDropdown(false);
    } catch (error) {
      console.error('Failed to add measure to bookmark:', error);
    }
  };

  return (
    <div className={`measure-card priority-${priority.stars}`}>
      <div className="card-header">
        <span className="sector">{sector.title}</span>
        <div className="stars">{'★'.repeat(priority.stars)}</div>
        {/* Bookmark icon and dropdown */}
        <div
          className="bookmark-container"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          {/* Toggle bookmark icon */}
          <div className="bookmark-toggle">
            {isBookmarked ? (
              <GoBookmarkFill
                size={32}
                style={{
                  color: '#f7d00c',
                }}
              />
            ) : (
              <GoBookmark
                size={32}
                style={{
                  color: '#4b0082',
                }}
              />
            )}
          </div>
          {/* Dropdown menu for bookmark selection */}
          {showDropdown && bookmarks.length > 0 && (
            <div className="bookmark-dropdown">
              {bookmarks.map((bookmark) => (
                <div
                  key={bookmark.name}
                  onClick={() => handleAddToBookmark(bookmark.name)}
                  className="bookmark-item"
                >
                  {bookmark.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="card-body">
        <h5>{title}</h5>
        <div className="focuses">{focuseBalls}</div>
        {!hideCities && (
          <div className="cities">
            <Image src={cityIcon} alt="City Icon" width={32} height={32} />
            <div className="cities-list">
              {cities.map((city) => (
                <div key={city.title} className="city-separator">
                  <span>{city.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="code">
          <p>{code}</p>
        </div>
      </div>
      <div className="card-footer">
        {!hideArrow && (
          <Link href={`/measures/${code}?${currentFilters || ''}`}>
            <button className="arrow-button">
              <ArrowRight color="#4b0082" style={{ height: 55, width: 55 }} />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MeasureCard;
