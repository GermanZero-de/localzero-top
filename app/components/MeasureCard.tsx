import React from 'react';
import Link from 'next/link';
import ArrowRight from '@/app/components/Arrow-Right';
import '../styles/Focuses.scss';
import { Blueprint } from '@/app/models/blueprint';
import Image from 'next/image';
import cityIcon from '../photos/cityIconAlt.png';
import Bookmark from '@/app/components/Bookmark';
import bookmarkIcon from '../photos/bookmarkIcon.png';

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
  const [showDropdown, setShowDropdown] = React.useState(false);

  const focuseBalls = focuses.map((focus, index) => (
    <div key={index} className="focus-item">
      <div
        className="color-ball"
        style={{ backgroundColor: focus.color }}
      ></div>
    </div>
  ));

  const handleAddToBookmark = (bookmarkName: string) => {
    console.log('Adding measure to bookmark:', bookmarkName, blueprint);
    onAddMeasureToBookmark(bookmarkName, blueprint);
    setShowDropdown(false);
  };

  return (
    <div className={`measure-card priority-${priority.stars}`}>
      <div className="card-header">
        <span className="sector">{sector.title}</span>
        <div className="stars">{'★'.repeat(priority.stars)}</div>
        {/* Bookmark icon on the measure cards shown on hover */}
        {bookmarks.length > 0 && (
          <div
            className="bookmark-icon"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Image
              src={bookmarkIcon}
              alt="Bookmark Icon"
              width={34}
              height={34}
            />
            {showDropdown && (
              <div className="bookmark-dropdown">
                {bookmarks.map((bookmark) => (
                  <div
                    key={bookmark.name}
                    onClick={() => handleAddToBookmark(bookmark.name)}
                  >
                    {bookmark.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
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
