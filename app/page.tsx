// src/pages.tsx
'use client';
import React, {useEffect, useState} from 'react';
import FilterPanel from './components/FilterPanel';
import BlueFilterBar from './components/BlueFilterBar';
import './styles/styles.scss';
import Footer from '@/app/components/Footer';
import Navbar from './components/navbar';
import {Filter} from "@/app/models/Filter";
import {Sector} from "@/app/models/sector";
import {Focus} from "@/app/models/focus";
import {AppData} from "@/app/models/appData";
import {Blueprint} from "@/app/models/blueprint";
import {fetchSheetsData} from "@/app/data/fetchData";
import {Priority} from "@/app/models/priority";
import MeasuresGrid from "@/app/components/MeasuresGrid";


const Pages = () => {
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);
    // All measures used only to create filteredMeasures
    const [data, setData] = useState<AppData>({priorities: [], sectors: [], focuses: [], cities: [], blueprints: []});
    // Filtered measures
    const [filteredMeasures, setFilteredMeasures] = useState<Blueprint[]>([]);
    //All active filters in sidepanel
    const [activeFilters, setActiveFilters] = useState<Filter>({
        prioritys: [],
        sectors: [],
        focuses: [],
    });
    //Fetch measures and set unique filters to allFilters
    useEffect(() => {
        fetchSheetsData().then((data) => {
            setData(data);
        })
    }, []);

    //When measures or activeFilters change, filter the measures
    useEffect(() => {
        const applyFilters = (measure: Blueprint) => {
            const priorityMatch = activeFilters.prioritys.length === 0 || activeFilters.prioritys.includes(measure.priority);
            const sectorMatch = activeFilters.sectors.length === 0 || activeFilters.sectors.includes(measure.sector);
            const focusMatch = activeFilters.focuses.length === 0 || activeFilters.focuses.some((focus) => measure.focuses.includes(focus));
            return priorityMatch && sectorMatch && focusMatch;
        };
        setFilteredMeasures(data?.blueprints.filter(applyFilters))
    }, [data, activeFilters]);


    // Handle changes from the FilterPanel for both priorities and sectors
    const changeFilters = (priorities: Priority[], sectors: Sector[], focuses: Focus[]) => {
        setActiveFilters({
            prioritys: priorities,
            sectors: sectors,
            focuses: focuses,
        });
    }

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
           <FilterPanel data={data} filters={activeFilters} onFilterChange={changeFilters} onClose={closeFilterPanel}/>
        </div>
        <div className='main-content'>
          <h1>TOP-MASSNAHMEN</h1>
          <BlueFilterBar onToggleFilterPanel={toggleFilterPanel} />
          {isFilterPanelVisible && (
            <FilterPanel
                data={data}
                filters={activeFilters}
                onFilterChange={changeFilters}
                onClose={closeFilterPanel}
                isOverlay
            />
          )}
          <MeasuresGrid blueprints={filteredMeasures}/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pages;
