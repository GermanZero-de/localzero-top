// src/pages.tsx
'use client';
import React, { useState } from 'react';
import FilterPanel from './components/FilterPanel';
import MeasuresGrid from './components/MeasuresGrid';
import './styles/styles.scss';
import Footer from '@/app/components/Footer';
import Navbar from './components/navbar';

// Define the type for the filter change handler
interface FilterChangeHandler {
  priorities: number[];
  sectors: string[];
  focuses: string[];
}

const Pages = () => {
  const [selectedPriorities, setSelectedPriorities] = useState<number[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedFocuses, setSelectedFocus] = useState<string[]>([]);

  // Handle changes from the FilterPanel for both priorities and sectors
  const handleFilterChange = (
    priorities: number[],
    sectors: string[],
    focus: string[]
  ) => {
    setSelectedPriorities(priorities);
    setSelectedSectors(sectors);
    setSelectedFocus(focus);
  };

  return (
    <div className='d-flex flex-column flex-grow-1'>
      <Navbar />

      <div className='app flex-grow-1'>
        <div className='sidebar'>
          <FilterPanel onFilterChange={handleFilterChange} />
        </div>
        <div className='main-content'>
          <h1>TOP-MASSNAHMEN</h1>
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
