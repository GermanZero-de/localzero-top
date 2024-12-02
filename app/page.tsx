'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterPanel from './components/FilterPanel';
import BlueFilterBar from './components/BlueFilterBar';
import './styles/styles.scss';
import Footer from '@/app/components/Footer';
import Navbar from './components/navbar';
import { Filter } from "@/app/models/Filter";
import { AppData } from "@/app/models/appData";
import { Priority } from "@/app/models/priority";
import { Sector } from "@/app/models/sector";
import { Focus } from "@/app/models/focus";
import { City } from "@/app/models/city";
import { Blueprint } from "@/app/models/blueprint";
import { fetchSheetsData } from "@/app/data/fetchData";
import MeasuresGrid from "@/app/components/MeasuresGrid";
import LoadingSpinner from '@/app/components/LoadingScreen';

const parseQueryParams = (searchParams: URLSearchParams, data: AppData): Filter => {
  const priorities = searchParams.get('priorities')
    ?.split(',')
    .map((star) => {
      const parsedStar = parseInt(star.trim());
      const matchedPriority = data.priorities.find((p) => parseInt(p.stars as unknown as string) === parsedStar);
      return matchedPriority;
    })
    .filter((p): p is Priority => p !== undefined) || [];

  const sectors = searchParams.get('sectors')
    ?.split(',')
    .map(title => data.sectors.find(s => s.title.trim() === title.trim()))
    .filter((s): s is Sector => s !== undefined) || [];

  const focuses = searchParams.get('focuses')
    ?.split(',')
    .map(title => data.focuses.find(f => f.title.trim() === title.trim()))
    .filter((f): f is Focus => f !== undefined) || [];

  const cities = searchParams.get('cities')
    ?.split(',')
    .map(title => data.cities.find(c => c.title.trim() === title.trim()))
    .filter((c): c is City => c !== undefined) || [];

  return {
    prioritys: priorities,
    sectors: sectors,
    focuses: focuses,
    cities: cities,
  };
};

const Pages = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState<AppData>({
    priorities: [],
    sectors: [],
    focuses: [],
    cities: [],
    blueprints: [],
    localMeasures: [],
  });

  const [filteredMeasures, setFilteredMeasures] = useState<Blueprint[]>([]);
  const [activeFilters, setActiveFilters] = useState<Filter>({
    prioritys: [],
    sectors: [],
    focuses: [],
    cities: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false); // Restored state

  useEffect(() => {
    fetchSheetsData().then((fetchedData: AppData) => {
      setData(fetchedData);

      const filtersFromQuery = parseQueryParams(new URLSearchParams(searchParams.toString()), fetchedData);
      setActiveFilters(filtersFromQuery);
      
      // End loading state after data and filters are processed
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const applyFilters = (measure: Blueprint) => {
      const priorityMatch = activeFilters.prioritys.length === 0 || activeFilters.prioritys.includes(measure.priority);
      const sectorMatch = activeFilters.sectors.length === 0 || activeFilters.sectors.includes(measure.sector);
      const focusMatch = activeFilters.focuses.length === 0 || activeFilters.focuses.some(f => measure.focuses.includes(f));
      const cityMatch = activeFilters.cities.length === 0 || activeFilters.cities.some(c => measure.cities.includes(c));
      return priorityMatch && sectorMatch && focusMatch && cityMatch;
    };

    if (data.blueprints.length) {
      setFilteredMeasures(data.blueprints.filter(applyFilters));
    }
  }, [data, activeFilters]);

  const toggleFilterPanel = () => {
    setIsFilterPanelVisible(!isFilterPanelVisible);
  };

  const closeFilterPanel = () => {
    setIsFilterPanelVisible(false);
  };

  const changeFilters = (priorities: Priority[], sectors: Sector[], focuses: Focus[], cities: City[]) => {
    setActiveFilters({
      prioritys: priorities,
      sectors: sectors,
      focuses: focuses,
      cities: cities,
    });

    const queryParams = new URLSearchParams();
    if (priorities.length) queryParams.append('priorities', priorities.map(p => p.stars).join(','));
    if (sectors.length) queryParams.append('sectors', sectors.map(s => s.title).join(','));
    if (focuses.length) queryParams.append('focuses', focuses.map(f => f.title).join(','));
    if (cities.length) queryParams.append('cities', cities.map(c => c.title).join(','));

    router.push(`?${queryParams.toString()}`);
  };

  const handleGoBack = () => {
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
          <FilterPanel
            data={data}
            filters={activeFilters}
            onFilterChange={changeFilters}
            onClose={closeFilterPanel}
          />
        </div>
        <div className="main-content">
          <h1>TOP-MASSNAHMEN</h1>
          <BlueFilterBar
            onToggleFilterPanel={toggleFilterPanel}
            onGoBack={handleGoBack}
          />
          {isFilterPanelVisible && (
            <FilterPanel
              data={data}
              filters={activeFilters}
              onFilterChange={changeFilters}
              onClose={closeFilterPanel}
              isOverlay
            />
          )}
          {isLoading ? (
            <LoadingSpinner variant="offset" />
          ) : filteredMeasures.length > 0 ? (
            <MeasuresGrid blueprints={filteredMeasures} />
          ) : (
            <p>Keine Treffer gefunden</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pages;
