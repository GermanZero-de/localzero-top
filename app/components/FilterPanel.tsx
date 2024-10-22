// src/components/FilterPanel.tsx

import React, { useState } from "react";

interface FilterPanelProps {
  onFilterChange: (priorities: number[], sectors: string[]) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
  const [selectedPriorities, setSelectedPriorities] = useState<number[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  // Handle changes for Priority (stars)
  const handlePriorityChange = (priority: number) => {
    const updatedPriorities = selectedPriorities.includes(priority)
      ? selectedPriorities.filter((p) => p !== priority)
      : [...selectedPriorities, priority];

    setSelectedPriorities(updatedPriorities);
    onFilterChange(updatedPriorities, selectedSectors);
  };

  // Handle changes for Sectors
  const handleSectorChange = (sector: string) => {
    const updatedSectors = selectedSectors.includes(sector)
      ? selectedSectors.filter((s) => s !== sector)
      : [...selectedSectors, sector];

    setSelectedSectors(updatedSectors);
    onFilterChange(selectedPriorities, updatedSectors);
  };

  // Handle clearing filters
  const handleClearFilters = () => {
    setSelectedPriorities([]); // Reset priorities
    setSelectedSectors([]); // Reset sectors
    onFilterChange([], []); // Clear filters
  };

  return (
    <div className="filter-panel">
      <h3>Filter</h3>

      {/* Priority Filter */}
      <div className="filter-section">
        <h4>Priority</h4>
        <div className="priority-filter">
          <input
            type="checkbox"
            id="priority4"
            checked={selectedPriorities.includes(3)}
            onChange={() => handlePriorityChange(3)}
          />
          <label htmlFor="priority4">★ ★ ★ </label>
          <br />
          <input
            type="checkbox"
            id="priority3"
            checked={selectedPriorities.includes(2)}
            onChange={() => handlePriorityChange(2)}
          />
          <label htmlFor="priority3">★ ★ </label>
          <br />
          <input
            type="checkbox"
            id="priority2"
            checked={selectedPriorities.includes(1)}
            onChange={() => handlePriorityChange(1)}
          />
          <label htmlFor="priority2">★ </label>
        </div>
      </div>

      {/* Sector Filter */}
      <div className="filter-section">
        <h4>Sector</h4>
        <div className="sector-filter">
          <input
            type="checkbox"
            id="sectorEnergy"
            checked={selectedSectors.includes("Energy")}
            onChange={() => handleSectorChange("Energy")}
          />
          <label htmlFor="sectorEnergy">Energy</label>
          <br />
          <input
            type="checkbox"
            id="sectorTransport"
            checked={selectedSectors.includes("Transport")}
            onChange={() => handleSectorChange("Transport")}
          />
          <label htmlFor="sectorTransport">Transport</label>
          <br />
          <input
            type="checkbox"
            id="sectorBuildings"
            checked={selectedSectors.includes("Buildings")}
            onChange={() => handleSectorChange("Buildings")}
          />
          <label htmlFor="sectorBuildings">Buildings</label>
          <br />
          <input
            type="checkbox"
            id="sectorWasteManagement"
            checked={selectedSectors.includes("Waste Management")}
            onChange={() => handleSectorChange("Waste Management")}
          />
          <label htmlFor="sectorWasteManagement">Waste Management</label>
          <br />
          <input
            type="checkbox"
            id="sectorFinance"
            checked={selectedSectors.includes("Finance")}
            onChange={() => handleSectorChange("Finance")}
          />
          <label htmlFor="sectorFinance">Finance</label>
          <br />
          <input
            type="checkbox"
            id="sectorWater"
            checked={selectedSectors.includes("Water")}
            onChange={() => handleSectorChange("Water")}
          />
          <label htmlFor="sectorWater">Water</label>
        </div>
      </div>

      {/* Add a Clear Filters Button */}
      <button className="clear-filters-button" onClick={handleClearFilters}>
        X Clear Filters
      </button>
    </div>
  );
};

export default FilterPanel;
