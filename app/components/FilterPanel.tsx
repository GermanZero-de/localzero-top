import React from 'react';
import Image from 'next/image';
import filterIcon from '../photos/filterPlaceholder.png';
import bookmarkIcon from '../photos/bookmarkIcon.png';
import clearIcon from '../photos/clearIcon.png';
import '../styles/Filterpanel.scss';
import {Filter} from "@/app/Redo/Filter";
import {Sector} from "@/app/Redo/Sector";
import {Focus} from "@/app/Redo/Focus";
import {FilterOpt} from "@/app/Redo/FilterOpt";

interface FilterPanelProps {
    onFilterChange: (
        priorities: number[],
        sectors: Sector[],
        focuses: Focus[]
    ) => void,
    filters: Filter,
    filterOpt: FilterOpt
}

const FilterPanel: React.FC<FilterPanelProps> = ({onFilterChange, filters, filterOpt}) => {
        const toggleItem = <T, >(array: T[], item: T) =>
            array.includes(item) ? array.filter((i) => i !== item) : [...array, item];

        const handleChange = (priority?: number, sector?: Sector, focus?: Focus) => {
            const updatedPriorities = priority !== undefined ? toggleItem(filters.prioritys, priority) : filters.prioritys;
            const updatedSectors = sector !== undefined ? toggleItem(filters.sectors, sector) : filters.sectors;
            const updatedFocuses = focus !== undefined ? toggleItem(filters.focuses, focus) : filters.focuses;

            console.log("Showing updated priorities: ", updatedPriorities);
            console.log("Showing updated sectors: ", updatedSectors);
            console.log("Showing updated focuses: ", updatedFocuses);

            onFilterChange(updatedPriorities, updatedSectors, updatedFocuses);
        };

        // Handle clearing filters
        const handleClearFilters = () => {
            onFilterChange([], [], []); // Clear filters
        };

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
                        {
                            filterOpt.prioritys.map((priority) => (
                                <div key={priority} className='filter-option'>
                                    <input
                                        type='checkbox'
                                        id={`priority${priority}`}
                                        checked={filters.prioritys.includes(priority)}
                                        onChange={() => handleChange(priority, undefined, undefined)}
                                    />
                                    <label className='stars'>{'★'.repeat(priority)}</label>
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
                            filterOpt.sectors.map((sector) => (
                                <div key={sector.title} className='filter-option'>
                                    <input
                                        type='checkbox'
                                        id={`sector${sector.title}`}
                                        checked={filters.sectors.includes(sector)}
                                        onChange={() => handleChange(undefined, sector, undefined)}
                                    />
                                    <label>{sector.title}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className='filter-divider'></div>

                {/* Focus Filter */}
                {/*
          {focusOptions.map(({ label, color, tooltip }) => (
            <div key={label} className='filter-option'>
              <button
                className='focus-button'
                onClick={() => handleFocusChange(label as string)}
                style={{ backgroundColor: color }}
              >
                {selectedFocuses.includes(label as string) && (
                  <span className='check-icon'>✓</span>
                )}
              </button>
              <span className='focus-label'>{label}</span>
              <span className='info-icon'>
                i <div className='info-tooltip'>{tooltip}</div>
              </span>
            </div>
          ))}
                */}
                <div className='filter-section'>
                    <h4>Fokus</h4>
                    <div className='filter-options'>
                        {
                            filterOpt.focuses.map((focus) => (
                                <div key={focus.title} className='filter-option'>
                                    <button
                                        className='focus-button'
                                        onClick={() => handleChange(undefined, undefined, focus)}
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
/*

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
                label: 'THG-Einsparpotenzial::#e588b7',
                color: '#e588b7',
                tooltip: 'Placeholder information for THG-Einsparpotenzial',
            },
            {
                label: 'Wirtschaftlichkeit::#f2a58b',
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
 */