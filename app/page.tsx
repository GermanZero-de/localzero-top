'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for App Directory
import FilterPanel from './components/FilterPanel';
import BlueFilterBar from './components/BlueFilterBar';
import './styles/styles.scss';
import Footer from '@/app/components/Footer';
import Navbar from './components/navbar';
import { Filter } from "@/app/models/Filter";
import { Sector } from "@/app/models/sector";
import { Focus } from "@/app/models/focus";
import { City } from "@/app/models/city";
import { AppData } from "@/app/models/appData";
import { Blueprint } from "@/app/models/blueprint";
import { fetchSheetsData } from "@/app/data/fetchData";
import { Priority } from "@/app/models/priority";
import MeasuresGrid from "@/app/components/MeasuresGrid";

const Pages = () => {
  const router = useRouter(); // Correct useRouter for App Directory
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);

  const [data, setData] = useState<AppData>({ priorities: [], sectors: [], focuses: [], cities: [], blueprints: [], localMeasures: [] });
  const [filteredMeasures, setFilteredMeasures] = useState<Blueprint[]>([]);
  const [activeFilters, setActiveFilters] = useState<Filter>({
    prioritys: [],
    sectors: [],
    focuses: [],
    cities: [],
  });

  useEffect(() => {
    fetchSheetsData().then((data) => {
      setData(data);
    });
  }, []);

  useEffect(() => {
    const applyFilters = (measure: Blueprint) => {
      const priorityMatch = activeFilters.prioritys.length === 0 || activeFilters.prioritys.includes(measure.priority);
      const sectorMatch = activeFilters.sectors.length === 0 || activeFilters.sectors.includes(measure.sector);
      const focusMatch = activeFilters.focuses.length === 0 || activeFilters.focuses.some((focus) => measure.focuses.includes(focus));
      const cityMatch = activeFilters.cities.length === 0 || activeFilters.cities.some((city) => measure.cities.includes(city));
      return priorityMatch && sectorMatch && focusMatch && cityMatch;
    };
    setFilteredMeasures(data?.blueprints.filter(applyFilters));
  }, [data, activeFilters]);

  const changeFilters = (priorities: Priority[], sectors: Sector[], focuses: Focus[], cities: City[]) => {
    setActiveFilters({
      prioritys: priorities,
      sectors: sectors,
      focuses: focuses,
      cities: cities,
    });
  };

  const toggleFilterPanel = () => {
    setIsFilterPanelVisible(!isFilterPanelVisible);
  };

  const closeFilterPanel = () => {
    setIsFilterPanelVisible(false);
  };

  const handleGoBack = () => {
    console.log('Back button clicked'); // Debug log
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      <Navbar />
      <div className="app flex-grow-1">
        <div className="sidebar">
          <FilterPanel data={data} filters={activeFilters} onFilterChange={changeFilters} onClose={closeFilterPanel} />
        </div>
        <div className="main-content">
          <h1>TOP-MASSNAHMEN</h1>
          <BlueFilterBar onToggleFilterPanel={toggleFilterPanel} onGoBack={handleGoBack} />
          {isFilterPanelVisible && (
            <FilterPanel
              data={data}
              filters={activeFilters}
              onFilterChange={changeFilters}
              onClose={closeFilterPanel}
              isOverlay
            />
          )}
          <MeasuresGrid blueprints={filteredMeasures} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pages;
