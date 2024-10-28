// src/pages.tsx
"use client";
import React, { useState } from "react";
import FilterPanel from "./components/FilterPanel";
import MeasuresGrid from "./components/MeasuresGrid";
import "./styles/styles.scss";
import Footer from "@/app/components/Footer";

// Define the type for the filter change handler
interface FilterChangeHandler {
  priorities: number[];
  sectors: string[];
}

const Pages = () => {
  const [selectedPriorities, setSelectedPriorities] = useState<number[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  // Handle changes from the FilterPanel for both priorities and sectors
  const handleFilterChange = (priorities: number[], sectors: string[]) => {
    setSelectedPriorities(priorities);
    setSelectedSectors(sectors);
  };

    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="app flex-grow-1">
                <div className="sidebar">
                    <FilterPanel onFilterChange={handleFilterChange}/>
                </div>
                <div className="main-content">
                    <h1>Top Measures</h1>
                    <MeasuresGrid
                        selectedPriorities={selectedPriorities}
                        selectedSectors={selectedSectors}
                    />
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Pages;
