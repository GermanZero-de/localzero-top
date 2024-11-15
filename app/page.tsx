// src/pages.tsx
'use client';
import React, { useState } from 'react';
import FilterPanel from './components/FilterPanel';
import MeasuresGrid from './components/MeasuresGrid';
import BlueFilterBar from './components/BlueFilterBar';
import './styles/styles.scss';
import Footer from '@/app/components/Footer';
import Navbar from './components/navbar';

const Pages = () => {
  const [selectedPriorities, setSelectedPriorities] = useState<number[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedFocuses, setSelectedFocus] = useState<string[]>([]);
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);

  // Handle changes from the FilterPanel
  const handleFilterChange = (priorities: number[], sectors: string[], focus: string[]) => {
    setSelectedPriorities(priorities);
    setSelectedSectors(sectors);
    setSelectedFocus(focus);
  };

  const toggleFilterPanel = () => {
    setIsFilterPanelVisible(!isFilterPanelVisible);
  };

  const closeFilterPanel = () => {
    setIsFilterPanelVisible(false);
  };

  return (
    <div className='d-flex flex-column flex-grow-1'>
      <Navbar />
      <div className='app flex-grow-1'>
        <div className='sidebar'>
          <FilterPanel onFilterChange={handleFilterChange} onClose={closeFilterPanel} />
        </div>
        <div className='main-content'>
          <h1>TOP-MASSNAHMEN</h1>
          <BlueFilterBar onToggleFilterPanel={toggleFilterPanel} />
          {isFilterPanelVisible && (
            <FilterPanel
              onFilterChange={handleFilterChange}
              onClose={closeFilterPanel}
              isOverlay
            />
          )}
          <MeasuresGrid
            selectedPriorities={selectedPriorities}
            selectedSectors={selectedSectors}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pages;
