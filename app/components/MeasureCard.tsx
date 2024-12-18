/*
MeasureCard component is a reusable component that displays a card with information about a blueprint.
It receives a blueprint object as a prop and displays the blueprint's title, sector, priority, focuses, code, and cities.
It also displays a bookmark icon that allows the user to add the blueprint to their bookmarks.
The component also includes a link that redirects the user to the blueprint's details page when clicked.
*/

import React, { useState, useRef, useEffect } from 'react';
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
  const [dropdownPosition, setDropdownPosition] = useState<'left' | 'right'>('right');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { bookmarks, addMeasureToBookmark, isMeasureBookmarked, isMeasureInThisBookmark } = useBookmarks();
  const [selectedBookmarks, setSelectedBookmarks] = useState<string[]>([]);

  const focuseBalls = focuses.map((focus, index) => (
    <div key={index} className="focus-item">
      <div className="color-ball" style={{ backgroundColor: focus.color }}></div>
    </div>
  ));

  const validCities = cities.filter((city) => city.title && city.title !== 'No city');

  const checkDropdownPosition = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const isOverflowing = rect.right > window.innerWidth;
      setDropdownPosition(isOverflowing ? 'left' : 'right');
    }
  };

  useEffect(() => {
    if (showDropdown) {
      checkDropdownPosition();
    }
  }, [showDropdown]);

  const toggleBookmark = (bookmarkName: string) => {
    if (!code) return;
    if (selectedBookmarks.includes(bookmarkName)) {
      setSelectedBookmarks(selectedBookmarks.filter((name) => name !== bookmarkName));
    } else {
      setSelectedBookmarks([...selectedBookmarks, bookmarkName]);
    }
    addMeasureToBookmark(bookmarkName, blueprint);
  };

  return (
    <div className={`measure-card priority-${priority.stars} ${hideBookmark ? 'hide-bookmark' : ''}`}>
      {/* Header */}
      <div className="card-header">
        <span className="sector">{sector.title}</span>
        <div className="stars">{'★'.repeat(priority.stars)}</div>

        {/* Bookmark Container */}
        {!hideBookmark && (
          <div
            className="bookmark-container"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            ref={dropdownRef}
          >
            <div className="bookmark-toggle">
              {isMeasureBookmarked(code) ? (
                <GoBookmarkFill size={32} style={{ color: '#f7d00c' }} />
              ) : (
                <GoBookmark size={32} style={{ color: '#4b0082' }} />
              )}
            </div>

            {/* Bookmark Dropdown */}
            {showDropdown && (
              <div className={`bookmark-dropdown ${dropdownPosition === 'left' ? 'left' : 'right'}`}>
                <strong>Auf Merkzettel speichern</strong>
                <div className="bookmark-items">
                  {bookmarks.map((bookmark) => (
                    <div className="bookmark-item" key={bookmark.name}>
                      <label>
                        <input
                          type="checkbox"
                          checked={isMeasureInThisBookmark(bookmark.name, code)}
                          onChange={() => toggleBookmark(bookmark.name)}
                        />
                        <span className="bookmark-title">{bookmark.name}</span>
                        <span className="bookmark-date">
                          letzte Änderung:{' '}
                          {new Date(bookmark.date).toLocaleDateString('de-DE')}{' '}
                          {new Date(bookmark.date).toLocaleTimeString('de-DE', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
                    {/* Save Button */}
                    <button
                      className="save-button"
                      onClick={() => setShowDropdown(false)} // Close dropdown on click
                    >
                      <GoBookmarkFill className="icon" size={20} color="#fff" />
                      Speichern
                    </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="card-body">
        <h5>{title}</h5>
        <div className="focuses">{focuseBalls}</div>
        <div className="code">
          <p>{code}</p>
        </div>

        {/* Cities */}
        {!hideCities && validCities.length > 0 && (
          <div className="cities">
            <Image src={cityIcon} alt="City Icon" width={32} height={32} />
            <span className="city-count">{validCities.length}</span>
            <div className="cities-list">
              {validCities.map((city) => (
                <div key={city.title} className="city-separator">
                  <span>{city.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="card-footer">
        {!hideArrow && (
          <Link href={`/measures/${code}?${currentFilters || ''}`}>
            <button className="arrow-button">
              <ArrowRight color="#4b0082" style={{ height: 40, width: 55 }} />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MeasureCard;
