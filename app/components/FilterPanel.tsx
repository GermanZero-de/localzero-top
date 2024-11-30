import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import filterIcon from '../photos/filterPlaceholder.png';
import bookmarkIcon from '../photos/bookmarkIcon.png';
import clearIcon from '../photos/clearIcon.png';
import '../styles/Filterpanel.scss';
import { Filter } from '@/app/models/Filter';
import { Sector } from '@/app/models/sector';
import { Focus } from '@/app/models/focus';
import { AppData } from '@/app/models/appData';
import { Priority } from '@/app/models/priority';
import { City } from '@/app/models/city';
import Bookmark from './Bookmark';
import { Blueprint } from '../models/blueprint';
import { on } from 'events';

interface FilterPanelProps {
  onFilterChange: (
    priorities: Priority[],
    sectors: Sector[],
    focuses: Focus[],
    cities: City[],
  ) => void;
  filters: Filter;
  data: AppData;
  onClose: () => void;
  isOverlay?: boolean;
  bookmarks: Bookmark[];
  onCreateBookmark: (name: string) => void;
  onAddMeasureToBookmark: (bookmarkName: string, measure: Blueprint) => void;
  onSelectBookmark: (bookmark: Bookmark) => void;
  onDeleteBookmark: (name: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  onFilterChange,
  filters,
  data,
  onClose,
  isOverlay = false,
  bookmarks,
  onCreateBookmark,
  onAddMeasureToBookmark,
  onSelectBookmark,
  onDeleteBookmark,
}) => {
  const router = useRouter();

  const toggleItem = <T,>(array: T[], item: T) =>
    array.includes(item) ? array.filter((i) => i !== item) : [...array, item];

  const updateURL = (
    priorities: Priority[],
    sectors: Sector[],
    focuses: Focus[],
    cities: City[],
  ) => {
    const queryParams = new URLSearchParams();
    if (priorities.length)
      queryParams.append(
        'priorities',
        priorities.map((p) => p.stars).join(','),
      );
    if (sectors.length)
      queryParams.append('sectors', sectors.map((s) => s.title).join(','));
    if (focuses.length)
      queryParams.append('focuses', focuses.map((f) => f.title).join(','));
    if (cities.length)
      queryParams.append('cities', cities.map((c) => c.title).join(','));

    router.push(`?${queryParams.toString()}`);
  };

  const handleChange = (
    priority?: Priority,
    sector?: Sector,
    focus?: Focus,
    city?: City,
  ) => {
    const updatedPriorities =
      priority !== undefined
        ? toggleItem(filters.prioritys, priority)
        : filters.prioritys;
    const updatedSectors =
      sector !== undefined
        ? toggleItem(filters.sectors, sector)
        : filters.sectors;
    const updatedFocuses =
      focus !== undefined
        ? toggleItem(filters.focuses, focus)
        : filters.focuses;
    const updatedCities =
      city !== undefined ? toggleItem(filters.cities, city) : filters.cities;

    onFilterChange(
      updatedPriorities,
      updatedSectors,
      updatedFocuses,
      updatedCities,
    );
    updateURL(updatedPriorities, updatedSectors, updatedFocuses, updatedCities);
  };

  const handleClearFilters = () => {
    onFilterChange([], [], [], []);
    router.push('/'); // Clear URL query params
  };

  const handleShare = () => {
    const currentURL = window.location.href; // Get the current URL
    navigator.clipboard.writeText(currentURL).then(
      () => {
        alert('Link copied to clipboard');
      },
      (err) => {
        console.error('Failed to copy the link: ', err);
      },
    );
  };

  const [showFilter, setShowFilter] = React.useState(false);
  const toggleFilter = () => setShowFilter(!showFilter);

  const [showBookmarks, setShowBookmarks] = React.useState(false);
  const toggleBookmarks = () => setShowBookmarks(!showBookmarks);

  return (
    <div className={`filter-panel ${isOverlay ? 'overlay' : ''}`}>
      {/* Header */}
      <div className="filter-header">
        <div className="filter-icon">
          <button className="filter-button" onClick={toggleBookmarks}>
            <Image
              src={filterIcon}
              alt="Filter Icon"
              width={32}
              height={32}
              className="filter-icon-image"
            />
          </button>
        </div>
        <button
          className="clear-filters-button large-screen-icon"
          onClick={handleClearFilters}
        >
          <Image
            src={clearIcon}
            alt="Clear Filters Icon"
            width={32}
            height={32}
          />
        </button>
        <button className="share-filters" onClick={handleShare}>
          Link teilen
        </button>
        <button
          className="close-overlay-button small-screen-icon"
          onClick={onClose}
        >
          &times;
        </button>
      </div>

      {!showBookmarks && (
        <div className="filteroptions-container">
          {/* Priority Filter */}
          <div className="filter-section">
            <h4>Priorität</h4>
            <div className="filter-options">
              {data.priorities.map((priority) => (
                <div key={priority.stars} className="filter-option">
                  <input
                    type="checkbox"
                    id={`priority${priority.stars}`}
                    checked={filters.prioritys.some(
                      (p) => p.stars === priority.stars,
                    )} // Match by stars
                    onChange={() =>
                      handleChange(priority, undefined, undefined, undefined)
                    }
                  />
                  <label className="stars">{'★'.repeat(priority.stars)}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Sector Filter */}
          <div className="filter-section">
            <h4>Sektoren</h4>
            <div className="filter-options">
              {data.sectors.map((sector) => (
                <div key={sector.title} className="filter-option">
                  <input
                    type="checkbox"
                    id={`sector${sector.title}`}
                    checked={filters.sectors.includes(sector)}
                    onChange={() =>
                      handleChange(undefined, sector, undefined, undefined)
                    }
                  />
                  <label>{sector.title}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Focus Filter */}
          <div className="filter-section">
            <h4>Fokus</h4>
            <div className="filter-options">
              {data.focuses.map((focus) => (
                <div key={focus.title} className="filter-option">
                  <button
                    className="focus-button"
                    onClick={() =>
                      handleChange(undefined, undefined, focus, undefined)
                    }
                    style={{ backgroundColor: focus.color }}
                  >
                    {filters.focuses.includes(focus) && (
                      <span className="check-icon">✓</span>
                    )}
                  </button>
                  <span className="focus-label">{focus.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* City Filter */}
          <div className="filter-section">
            <button className="filter-button" onClick={toggleFilter}>
              <h4>Städte</h4>
            </button>
            {showFilter && (
              <div className="filter-options">
                {data.cities.map((city) => (
                  <div key={city.title} className="filter-option">
                    <input
                      type="checkbox"
                      id={`city${city.title}`}
                      checked={filters.cities.some(
                        (c) => c.title === city.title,
                      )}
                      onChange={() =>
                        handleChange(undefined, undefined, undefined, city)
                      }
                    />
                    <label>{city.title}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="filter-section">
        <button className="bookmark-button" onClick={toggleBookmarks}>
          <h4>
            <Image
              src={bookmarkIcon}
              alt="Bookmark Icon"
              width={40}
              height={40}
            />
            Merkzettel
          </h4>
        </button>
        {showBookmarks && (
          <>
            <Bookmark
              bookmarks={bookmarks}
              onCreateBookmark={onCreateBookmark}
              onAddMeasureToBookmark={onAddMeasureToBookmark}
              onSelectBookmark={(bookmark) => onSelectBookmark(bookmark)}
              onDeleteBookmark={onDeleteBookmark}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
