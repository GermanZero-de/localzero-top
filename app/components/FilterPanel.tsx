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
interface FilterOptions {
  label: string | number;
  color?: string;
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

  const sectorOptions: FilterOptions[] = [
    {
      label: 'Abfallwirtschaft',
      tooltip: 'Placeholder information for Abfallwirtschaft',
    },
    {
      label: 'Finanzierung',
      tooltip: 'Placeholder information for Finanzierung',
    },
    {
      label: 'Gebäude',
      tooltip: 'Placeholder information for Gebäude',
    },
    {
      label: 'Governance',
      tooltip: 'Placeholder information for Governance',
    },
    {
      label: 'Industrie/Wirtschaft',
      tooltip: 'Placeholder information for Industrie/Wirtschaft',
    },
    {
      label: 'Land & Natur',
      tooltip: 'Placeholder information for Land & Natur',
    },
    {
      label: 'Landwirtschaft',
      tooltip: 'Placeholder information for Landwirtschaft',
    },
    {
      label: 'Strom',
      tooltip: 'Placeholder information for Strom',
    },
    {
      label: 'Verkehr',
      tooltip: 'Placeholder information for Verkehr',
    },
    {
      label: 'Wärme',
      tooltip: 'Placeholder information for Wärme',
    },
  ];

  const focusOptions: FilterOptions[] = [
    {
      label: 'THG-Einsparpotenzial',
      color: '#e588b7',
      tooltip: 'Placeholder information for THG-Einsparpotenzial',
    },
    {
      label: 'Wirtschaftlichkeit',
      color: '#f2a58b',
      tooltip: 'Placeholder information for Wirtschaftlichkeit',
    },
    {
      label: 'Einfache Umsetzung',
      color: '#f3cb5c',
      tooltip: 'Placeholder information for Einfache Umsetzung',
    },
    {
      label: 'Kommune als Vorbild',
      color: '#d8d300',
      tooltip: 'Placeholder information for Kommune als Vorbild',
    },
    {
      label: 'Akzeptanzförderung',
      color: '#87cd49',
      tooltip: 'Placeholder information for Akzeptanzförderung',
    },
    {
      label: 'Multiplikatoreffekt',
      color: '#6eafc1',
      tooltip: 'Placeholder information for Multiplikatoreffekt',
    },
    {
      label: 'Benefits für die Allgemeinheit',
      color: '#bbb2c5',
      tooltip: 'Placeholder information for Benefits für die Allgemeinheit',
    },
  ];

  const starOptions: FilterOptions[] = [
    {
      label: 3,
      tooltip: 'Placeholder information for 3 star priority',
    },
    {
      label: 2,
      tooltip: 'Placeholder information for 2 star priority',
    },
    {
      label: 1,
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

      {/* Priority Star Filter */}
      <div className='filter-section'>
        <h4>Priorität</h4>
        <div className='filter-options'>
          {starOptions.map(({ label, tooltip }) => (
            <div key={label} className='filter-option'>
              <input
                type='checkbox'
                id={`priority${label}`}
                checked={selectedPriorities.includes(label as number)}
                onChange={() => handlePriorityChange(label as number)}
              />
              <label className='stars' htmlFor={`priority${label}`}>
                {'★'.repeat(label as number)}
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
          {sectorOptions.map(({ label, tooltip }) => (
            <div key={label.toString()} className='filter-option'>
              <input
                type='checkbox'
                id={`sector${label}`}
                checked={selectedSectors.includes(label as string)}
                onChange={() => handleSectorChange(label as string)}
              />
              <label htmlFor={`sector${label}`}>{label}</label>
              <span className='info-icon'>
                i <div className='info-tooltip'>{tooltip}</div>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className='filter-divider'></div>

      {/* Focus Filter */}
      <div className='filter-section'>
        <h4>Fokus</h4>
        <div className='filter-options'>
          {focusOptions.map(({ label, color, tooltip }) => (
            <div key={label} className='filter-option'>
              <button
                className='focus-button'
                onClick={() => handleFocusChange(label as string)}
                style={{ backgroundColor: color }}
              >
                {selectedFocus.includes(label as string) && (
                  <span className='check-icon'>✓</span>
                )}
              </button>
              <span className='focus-label'>{label}</span>
              <span className='info-icon'>
                i <div className='info-tooltip'>{tooltip}</div>
              </span>
            </div>
          ))}
        </div>
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
};

export default FilterPanel;
