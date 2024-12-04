import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import filterIcon from '../photos/filterPlaceholder.png';
import bookmarkIcon from '../photos/bookmarkIcon.png';
import '../styles/Filterpanel.scss';
import { Filter } from '@/app/models/Filter';
import { Sector } from '@/app/models/sector';
import { Focus } from '@/app/models/focus';
import { AppData } from '@/app/models/appData';
import { Priority } from '@/app/models/priority';
import { City } from '@/app/models/city';
import Bookmark from '@/app/components/Bookmark';
import { FaShareAlt, FaRegTrashAlt } from 'react-icons/fa';

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
  onSelectBookmark: (bookmark: Bookmark) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  onFilterChange,
  filters,
  data,
  onClose,
  isOverlay = false,
  onSelectBookmark,
}) => {
  const router = useRouter();

  const [isClosing, setIsClosing] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

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
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(
      () => {
        alert('Link copied to clipboard');
      },
      (err) => {
        console.error('Failed to copy the link: ', err);
      },
    );
  };

  const [showFilter, setShowFilter] = useState(false);
  const toggleFilter = () => setShowFilter(!showFilter);

  const [showBookmarks, setShowBookmarks] = useState(false);
  const toggleBookmarks = () => setShowBookmarks(!showBookmarks);

  return (
    <div
      className={`filter-panel ${isOverlay ? 'overlay' : ''} ${
        hasMounted ? (isClosing ? 'closing' : 'opening') : ''
      }`}
    >
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
          <FaRegTrashAlt size="1.5em" />
        </button>
        <button className="share-filters" onClick={handleShare}>
          <FaShareAlt />
        </button>
        <button
          className="close-overlay-button small-screen-icon"
          onClick={handleClose}
        >
          &times;
        </button>
      </div>

      {/* Body */}
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
                    )}
                    onChange={() =>
                      handleChange(priority, undefined, undefined, undefined)
                    }
                  />
                  <span className="stars">{'★'.repeat(priority.stars)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-divider" />

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
                  <span>{sector.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-divider" />

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

          <div className="filter-divider" />

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
                    <span>{city.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="filter-divider" />

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
          <Bookmark onSelectBookmark={onSelectBookmark} onClose={handleClose} />
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
