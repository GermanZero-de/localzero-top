// src/components/FilterPanel.tsx

import React, { useState } from "react";
import Image from "next/image";
import filterIcon from "../photos/filterPlaceholder.png";

interface FilterPanelProps {
  onFilterChange: (priorities: number[], sectors: string[]) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
  const [selectedPriorities, setSelectedPriorities] = useState<number[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  const handlePriorityChange = (priority: number) => {
    const updatedPriorities = selectedPriorities.includes(priority)
      ? selectedPriorities.filter((p) => p !== priority)
      : [...selectedPriorities, priority];
    setSelectedPriorities(updatedPriorities);
    onFilterChange(updatedPriorities, selectedSectors);
  };

  const handleSectorChange = (sector: string) => {
    const updatedSectors = selectedSectors.includes(sector)
      ? selectedSectors.filter((s) => s !== sector)
      : [...selectedSectors, sector];
    setSelectedSectors(updatedSectors);
    onFilterChange(selectedPriorities, updatedSectors);
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <div className="filter-icon">
          <button className="filter-button">
            <Image
              src={filterIcon}
              alt="Filter Icon"
              width={32}
              height={32}
              className="filter-icon-image"
            />
            <h3>Filter</h3>
          </button>
        </div>
        <div className="trash-icon">🗑</div>
      </div>

      {/* Priority Filter */}
      <div className="filter-section">
        <h4>Priorität</h4>
        <div className="filter-options">
          {[3, 2, 1].map((stars) => (
            <div key={stars} className="filter-option">
              <input
                type="checkbox"
                id={`priority${stars}`}
                checked={selectedPriorities.includes(stars)}
                onChange={() => handlePriorityChange(stars)}
              />
              <label className="stars" htmlFor={`priority${stars}`}>
                {"★".repeat(stars)}
              </label>
              <span className="info-icon">i</span>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-divider"></div>

      {/* Sector Filter */}
      <div className="filter-section">
        <h4>Sektoren</h4>
        <div className="filter-options">
          {[
            "Strom",
            "Wärme",
            "Gebäude",
            "Verkehr",
            "Landwirtschaft",
            "Land & Natur",
            "Abfallwirtschaft",
            "Industrie/Wirtschaft",
            "Governance",
            "Finanzierung",
          ].map((sector) => (
            <div key={sector} className="filter-option">
              <input
                type="checkbox"
                id={`sector${sector}`}
                checked={selectedSectors.includes(sector)}
                onChange={() => handleSectorChange(sector)}
              />
              <label htmlFor={`sector${sector}`}>{sector}</label>
              <span className="info-icon">i</span>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-divider"></div>

      {/* Focus Filter */}
      <div className="filter-section">
        <h4>Fokus</h4>
        <div className="filter-options">
          {[
            { label: "THG-Einsparpotenzial", color: "pink" },
            { label: "Wirtschaftlichkeit", color: "coral" },
            { label: "Einfache Umsetzung", color: "yellow" },
            { label: "Kommune als Vorbild", color: "lightgreen" },
            { label: "Akzeptanzförderung", color: "green" },
            { label: "Multiplikatoreffekt", color: "lightblue" },
            { label: "Benefits für die Allgemeinheit", color: "plum" },
          ].map(({ label, color }) => (
            <div key={label} className="filter-option">
              <button
                className="focus-dot"
                style={{ backgroundColor: color }}
              ></button>
              <span className="focus-label">{label}</span>
              <span className="info-icon">i</span>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-divider"></div>
    </div>
  );
};

export default FilterPanel;
