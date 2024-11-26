import React from 'react';
import Image from 'next/image';
import filterIcon from '../photos/filterPlaceholder.png';
import bookmarkIcon from '../photos/bookmarkIcon.png';
import clearIcon from '../photos/clearIcon.png';
import '../styles/Filterpanel.scss';
import {Filter} from "@/app/models/Filter";
import {Sector} from "@/app/models/sector";
import {Focus} from "@/app/models/focus";
import {AppData} from "@/app/models/appData";
import {Priority} from "@/app/models/priority";
import {City} from "@/app/models/city";

interface FilterPanelProps {
    onFilterChange: (
        priorities: Priority[],
        sectors: Sector[],
        focuses: Focus[],
        cities: City[]
    ) => void;
    filters: Filter;
    data: AppData;
    onClose: () => void;
    isOverlay?: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({onFilterChange, filters, data, onClose, isOverlay = false}) => {
        const toggleItem = <T, >(array: T[], item: T) =>
            array.includes(item) ? array.filter((i) => i !== item) : [...array, item];

        const handleChange = (priority?: Priority, sector?: Sector, focus?: Focus, city?: City) => {
            const updatedPriorities = priority !== undefined ? toggleItem(filters.prioritys, priority) : filters.prioritys;
            const updatedSectors = sector !== undefined ? toggleItem(filters.sectors, sector) : filters.sectors;
            const updatedFocuses = focus !== undefined ? toggleItem(filters.focuses, focus) : filters.focuses;
            const updatedCities = city !== undefined ? toggleItem(filters.cities, city) : filters.cities;
            onFilterChange(updatedPriorities, updatedSectors, updatedFocuses, updatedCities);
        };

        // Handle clearing filters
        const handleClearFilters = () => {
            onFilterChange([], [], [], []); // Clear filters
        };

        const [showFilter, setShowFilter] = React.useState(false);

        const toggleFilter = () => {
          setShowFilter(!showFilter);
        }

        return (
            <div className={`filter-panel ${isOverlay ? 'overlay' : ''}`}>
              <div className='filter-header'>
                <div className='filter-icon'>
                  <button className='filter-button'>
                    <Image src={filterIcon} alt='Filter Icon' width={32} height={32} className='filter-icon-image'/>
                    {/* <h3>Filter</h3> */}
                  </button>
                </div>
                <button className='clear-filters-button large-screen-icon' onClick={handleClearFilters}>
                  <Image src={clearIcon} alt='Clear Filters Icon' width={32} height={32}/>
                </button>

                <button className='close-overlay-button small-screen-icon' onClick={onClose}>
                  &times;
                </button>
              </div>

              {/* Priority Star Filter */}
              <div className='filter-section'>
                <h4>Priorität</h4>
                <div className='filter-options'>
                  {
                    data.priorities.map((priority) => (
                        <div key={priority.stars} className='filter-option'>
                          <input
                              type='checkbox'
                              id={`priority${priority}`}
                              checked={filters.prioritys.includes(priority)}
                              onChange={() => handleChange(priority, undefined, undefined, undefined)}
                          />
                          <label className='stars'>{'★'.repeat(priority.stars)}</label>
                          <span className='info-icon'>
                                        i <div className='info-tooltip'>{priority.tooltip}</div>
                                    </span>
                        </div>
                    ))
                  }
                </div>
              </div>

              <div className='filter-divider'></div>

              {/* Sector Filter */}
              <div className='filter-section'>
                <h4>Sektoren</h4>
                <div className='filter-options'>
                  {
                    data.sectors.map((sector) => (
                        <div key={sector.title} className='filter-option'>
                          <input
                              type='checkbox'
                              id={`sector${sector.title}`}
                              checked={filters.sectors.includes(sector)}
                              onChange={() => handleChange(undefined, sector, undefined, undefined)}
                          />
                          <label>{sector.title}</label>
                          <span className='info-icon'>
                                     i <div className='info-tooltip'>{sector.tooltip}</div>
                                    </span>
                        </div>
                    ))
                  }
                </div>
              </div>

              <div className='filter-divider'></div>

              {/* Focus Filter */}
              <div className='filter-section'>
                <h4>Fokus</h4>
                <div className='filter-options'>
                  {
                    data.focuses.map((focus) => (
                        <div key={focus.title} className='filter-option'>
                          <button
                              className='focus-button'
                              onClick={() => handleChange(undefined, undefined, focus, undefined)}
                              style={{backgroundColor: focus.color}}
                          >
                            {filters.focuses.includes(focus)
                                && (<span className='check-icon'>✓</span>)
                            }
                          </button>
                          <span className='focus-label'>{focus.title}</span>
                          <span className='info-icon'>
                                        i<div className='info-tooltip'>{focus.tooltip}</div>
                                     </span>
                        </div>
                    ))
                  }
                </div>
              </div>

              <div className='filter-divider'></div>

              {/* City Filter */}
              <div className='filter-section'>
                <button className='filter-button' onClick={toggleFilter}>
                <h4>Städte</h4>
                </button>
                {showFilter && (
                <div className='filter-options'>
                  {
                    data.cities.map((city) => (
                        <div key={city.title} className='filter-option'>
                          <input
                              type='checkbox'
                              id={`city${city.title}`}
                              checked={filters.cities.includes(city)}
                              onChange={() => handleChange(undefined, undefined, undefined, city)}
                          />
                          <label>{city.title}</label>
                          {
                          /* Tooltips for cities if needed
                          <span className='info-icon'>
                                        i <div className='info-tooltip'>{""}</div>
                                    </span>
                          */
                          }
                        </div>
                    ))
                  }
                </div>
                )}
              </div>

              <div className='filter-divider'></div>

              <div className='filter-section'>
                <button className='bookmark-button'>
                  <h4>
                    <Image
                        src={bookmarkIcon}
                        alt='Bookmark Icon'
                        width={40}
                        height={40}
                    ></Image>
                    Merkzettel
                  </h4>
                </button>
              </div>
            </div>
        );
    }
;

export default FilterPanel;
