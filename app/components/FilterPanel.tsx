import React, { useState } from 'react';
import Image from 'next/image';
import filterIcon from '../photos/filterPlaceholder.png';
import bookmarkIcon from '../photos/bookmarkIcon.png';
import clearIcon from '../photos/clearIcon.png';
import '../styles/Filterpanel.scss';

interface FilterPanelProps {
  onFilterChange: (
    priorities: number[],
    sectors: string[],
    focus: string
  ) => void;
}

//For additional information shown when hovering over the info icons
interface PriorityOption {
  stars: number;
  tooltip: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
  const [selectedPriorities, setSelectedPriorities] = useState<number[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedFocus, setSelectedFocus] = useState<string>('');

  const handlePriorityChange = (priority: number) => {
    const updatedPriorities = selectedPriorities.includes(priority)
      ? selectedPriorities.filter((p) => p !== priority)
      : [...selectedPriorities, priority];
    setSelectedPriorities(updatedPriorities);
    onFilterChange(updatedPriorities, selectedSectors, selectedFocus);
  };

  const handleSectorChange = (sector: string) => {
    const updatedSectors = selectedSectors.includes(sector)
      ? selectedSectors.filter((s) => s !== sector)
      : [...selectedSectors, sector];
    setSelectedSectors(updatedSectors);
    onFilterChange(selectedPriorities, updatedSectors, selectedFocus);
  };

  const handleFocusChange = (focus: string) => {
    const updatedFocus = selectedFocus === focus ? '' : focus;
    setSelectedFocus(updatedFocus);
    onFilterChange(selectedPriorities, selectedSectors, updatedFocus);
  };

  // Handle clearing filters
  const handleClearFilters = () => {
    setSelectedPriorities([]); // Reset priorities
    setSelectedSectors([]); // Reset sectors
    setSelectedFocus(''); // Reset focus
    onFilterChange([], [], ''); // Clear filters
  };

  const filterOptions = [
    'Strom',
    'Wärme',
    'Gebäude',
    'Verkehr',
    'Landwirtschaft',
    'Land & Natur',
    'Abfallwirtschaft',
    'Industrie/Wirtschaft',
    'Governance',
    'Finanzierung',
  ];

  const focusOptions = [
    { label: 'THG-Einsparpotenzial', color: '#e588b7' },
    { label: 'Wirtschaftlichkeit', color: '#f2a58b' },
    { label: 'Einfache Umsetzung', color: '#f3cb5c' },
    { label: 'Kommune als Vorbild', color: '#d8d300' },
    { label: 'Akzeptanzförderung', color: '#87cd49' },
    { label: 'Multiplikatoreffekt', color: '#6eafc1' },
    { label: 'Benefits für die Allgemeinheit', color: '#bbb2c5' },
  ];

  const priorityOptions: PriorityOption[] = [
    {
      stars: 3,
      tooltip: 'Placeholder information for 3 star priority',
    },
    {
      stars: 2,
      tooltip: 'Placeholder information for 2 star priority',
    },
    {
      stars: 1,
      tooltip: 'Placeholder information for 1 star priority',
    },
  ];

  return (
    <div className='filter-panel'>
      <div className='filter-header'>
        <div className='filter-icon'>
          <button className='filter-button'>
            <Image
              src={filterIcon}
              alt='Filter Icon'
              width={32}
              height={32}
              className='filter-icon-image'
            />
            <h3>Filter</h3>
          </button>
        </div>
        <button className='clear-filters-button' onClick={handleClearFilters}>
          <Image
            src={clearIcon}
            alt='Clear Filters Icon'
            width={32}
            height={32}
          />
        </button>
      </div>

      {/* Priority Filter */}
      <div className='filter-section'>
        <h4>Priorität</h4>
        <div className='filter-options'>
          {priorityOptions.map(({ stars, tooltip }) => (
            <div key={stars} className='filter-option'>
              <input
                type='checkbox'
                id={`priority${stars}`}
                checked={selectedPriorities.includes(stars)}
                onChange={() => handlePriorityChange(stars)}
              />
              <label className='stars' htmlFor={`priority${stars}`}>
                {'★'.repeat(stars)}
              </label>
              <span className='info-icon'>
                i <div className='info-tooltip'>{tooltip}</div>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className='filter-divider'></div>

      {/* Sector Filter */}
      <div className='filter-section'>
        <h4>Sektoren</h4>
        <div className='filter-options'>
          {filterOptions.map((sector) => (
            <div key={sector} className='filter-option'>
              <input
                type='checkbox'
                id={`sector${sector}`}
                checked={selectedSectors.includes(sector)}
                onChange={() => handleSectorChange(sector)}
              />
              <label htmlFor={`sector${sector}`}>{sector}</label>
              <span className='info-icon'>i</span>
            </div>
          ))}
        </div>
      </div>

      <div className='filter-divider'></div>

      {/* Focus Filter */}
      <div className='filter-section'>
        <h4>Fokus</h4>
        <div className='filter-options'>
          {focusOptions.map(({ label, color }) => (
            <div key={label} className='filter-option'>
              <button
                className='focus-button'
                onClick={() => handleFocusChange(label)}
                style={{ backgroundColor: color }}
              >
                {selectedFocus.includes(label) && (
                  <span className='check-icon'>✓</span>
                )}
              </button>
              <span className='focus-label'>{label}</span>
              <span className='info-icon'>i</span>
            </div>
          ))}
        </div>
      </div>

      <div className='filter-divider'></div>
      <div className='filter-section'>
        <button className='bookmark-button'>
          <h4>
            {' '}
            <Image
              src={bookmarkIcon}
              alt='Bookmark Icon'
              width={40}
              height={40}
            ></Image>{' '}
            Merkzettel
          </h4>
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
