import React, { useState, useContext } from 'react';
import Link from 'next/link';
import ArrowRight from '@/app/components/Arrow-Right';
import '../styles/Focuses.scss';
import { Blueprint } from '@/app/models/blueprint';
import Image from 'next/image';
import cityIcon from '../photos/cityIconAlt.png';
import { GoBookmark, GoBookmarkFill } from 'react-icons/go';
import { useBookmarks } from '@/app/components/BookmarkContext';

interface MeasureCardProps {
  blueprint: Blueprint;
  hideArrow?: boolean;
  hideCities?: boolean;
  currentFilters?: string;
  hideBookmark?: boolean;
}

const MeasureCard: React.FC<MeasureCardProps> = ({
  blueprint,
  hideArrow,
  hideCities,
  currentFilters,
  hideBookmark,
}) => {
  const { title, sector, priority, focuses, code, cities } = blueprint;
  const [showDropdown, setShowDropdown] = useState(false);
  const { bookmarks, addMeasureToBookmark, isMeasureBookmarked } =
    useBookmarks();

  const focuseBalls = focuses.map((focus, index) => (
    <div key={index} className="focus-item">
      <div
        className="color-ball"
        style={{ backgroundColor: focus.color }}
      ></div>
    </div>
  ));

  const handleAddToBookmark = (bookmarkName: string) => {
    if (addMeasureToBookmark) {
      addMeasureToBookmark(bookmarkName, blueprint);
    }
  };

  return (
    <div
      className={`measure-card priority-${priority.stars} ${hideBookmark ? 'hide-bookmark' : ''}`}
    >
      <div className="card-header">
        <span className="sector">{sector.title}</span>
        <div className="stars">{'★'.repeat(priority.stars)}</div>
        {!hideBookmark && (
          <div
            className="bookmark-container"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <div className="bookmark-toggle">
              {isMeasureBookmarked && isMeasureBookmarked(code) ? (
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
            {showDropdown && (bookmarks?.length ?? 0) > 0 && (
              <div className="bookmark-dropdown">
                {(bookmarks ?? []).map((bookmark: { name: string }) => (
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
        )}
      </div>
      {/* Rest of the component remains the same */}
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
