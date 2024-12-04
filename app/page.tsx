'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterPanel from './components/FilterPanel';
import BlueFilterBar from './components/BlueFilterBar';
import './styles/styles.scss';
import Footer from '@/app/components/Footer';
import Navbar from './components/navbar';
import { Filter } from '@/app/models/Filter';
import { AppData } from '@/app/models/appData';
import { Priority } from '@/app/models/priority';
import { Sector } from '@/app/models/sector';
import { Focus } from '@/app/models/focus';
import { City } from '@/app/models/city';
import { Blueprint } from '@/app/models/blueprint';
import { fetchSheetsData } from '@/app/data/fetchData';
import MeasuresGrid from '@/app/components/MeasuresGrid';
import Bookmark from '@/app/components/Bookmark';
import LoadingSpinner from '@/app/components/LoadingScreen';
import {
  decodeBookmarksFromURL,
  loadBookmarksFromStorage,
  createBookmark,
  deleteBookmark,
  addMeasureToBookmark,
  saveBookmarksToStorage,
} from '@/app/components/BookmarkShare';

const parseQueryParams = (
  searchParams: URLSearchParams,
  data: AppData,
): Filter => {
  const priorities =
    searchParams
      .get('priorities')
      ?.split(',')
      .map((star) => {
        const parsedStar = parseInt(star.trim());
        return data.priorities.find(
          (p) => parseInt(p.stars as unknown as string) === parsedStar,
        );
      })
      .filter((p): p is Priority => p !== undefined) || [];

  const sectors =
    searchParams
      .get('sectors')
      ?.split(',')
      .map((title) => data.sectors.find((s) => s.title.trim() === title.trim()))
      .filter((s): s is Sector => s !== undefined) || [];

  const focuses =
    searchParams
      .get('focuses')
      ?.split(',')
      .map((title) => data.focuses.find((f) => f.title.trim() === title.trim()))
      .filter((f): f is Focus => f !== undefined) || [];

  const cities =
    searchParams
      .get('cities')
      ?.split(',')
      .map((title) => data.cities.find((c) => c.title.trim() === title.trim()))
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

  const [displayedMeasures, setDisplayedMeasures] = useState<Blueprint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    setBookmarks(loadBookmarksFromStorage());
  }, []);

  const handleCreateBookmark = (name: string) => {
    const updatedBookmarks = createBookmark(bookmarks, name);
    setBookmarks(updatedBookmarks);
    saveBookmarksToStorage(updatedBookmarks);
  };

  const handleDeleteBookmark = (name: string) => {
    const updatedBookmarks = deleteBookmark(bookmarks, name);
    setBookmarks(updatedBookmarks);
    saveBookmarksToStorage(updatedBookmarks);
  };

  const handleAddMeasureToBookmark = (
    bookmarkName: string,
    measure: Blueprint,
  ) => {
    const updatedBookmarks = addMeasureToBookmark(
      bookmarks,
      bookmarkName,
      measure,
    );
    setBookmarks(updatedBookmarks);
    saveBookmarksToStorage(updatedBookmarks);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchSheetsData().then((fetchedData: AppData) => {
        setData(fetchedData);

        const filtersFromQuery = parseQueryParams(
          new URLSearchParams(searchParams.toString()),
          fetchedData,
        );
        setActiveFilters(filtersFromQuery);

        if (window.location.search.includes('bookmarks')) {
          const urlBookmarks = decodeBookmarksFromURL(
            window.location.search,
            fetchedData,
          );
          if (urlBookmarks.length) {
            setBookmarks(urlBookmarks);
            saveBookmarksToStorage(urlBookmarks);
          }
        }

        setIsLoading(false);
      });
    }
  }, [searchParams]);

  useEffect(() => {
    const applyFilters = (measure: Blueprint) => {
      const priorityMatch =
        activeFilters.prioritys.length === 0 ||
        activeFilters.prioritys.includes(measure.priority);
      const sectorMatch =
        activeFilters.sectors.length === 0 ||
        activeFilters.sectors.includes(measure.sector);
      const focusMatch =
        activeFilters.focuses.length === 0 ||
        activeFilters.focuses.some((f) => measure.focuses.includes(f));
      const cityMatch =
        activeFilters.cities.length === 0 ||
        activeFilters.cities.some((c) => measure.cities.includes(c));
      return priorityMatch && sectorMatch && focusMatch && cityMatch;
    };

    if (data.blueprints.length) {
      const filtered = data.blueprints.filter(applyFilters);
      setFilteredMeasures(filtered);
      setDisplayedMeasures(filtered);
    }
  }, [data, activeFilters]);

  const toggleFilterPanel = () => {
    setIsFilterPanelVisible(!isFilterPanelVisible);
  };

  const changeFilters = (
    priorities: Priority[],
    sectors: Sector[],
    focuses: Focus[],
    cities: City[],
  ) => {
    setActiveFilters({ prioritys: priorities, sectors, focuses, cities });
    const queryParams = new URLSearchParams();
    if (priorities.length)
      queryParams.append(
        'priorities',
        priorities.map((p) => p.stars).join(','),
      );
    if (sectors.length)
      queryParams.append('sectors', sectors.map((s) => s.title).join(','));
    if (focuses.length)
      queryParams.append('focuses', focuses.map((f) => f.title).join(','));
    if (cities.length)
      queryParams.append('cities', cities.map((c) => c.title).join(','));
    router.push(`?${queryParams.toString()}`);
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const [bookmarkSelected, setBookmarkSelected] = useState(false);

  const handleSelectBookmark = (bookmark: Bookmark) => {
    setDisplayedMeasures(
      bookmarkSelected ? filteredMeasures : bookmark.measures,
    );
    setBookmarkSelected(!bookmarkSelected);
  };

  return (
    <div>
      <main>
        <Navbar />
        <div className="app">
          <div className="sidebar">
            <FilterPanel
              data={data}
              isOverlay={false}
              filters={activeFilters}
              onFilterChange={changeFilters}
              onClose={() => setIsFilterPanelVisible(false)}
              bookmarks={bookmarks}
              onCreateBookmark={handleCreateBookmark}
              onAddMeasureToBookmark={handleAddMeasureToBookmark}
              onSelectBookmark={handleSelectBookmark}
              onDeleteBookmark={handleDeleteBookmark}
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
                isOverlay={true}
                filters={activeFilters}
                onFilterChange={changeFilters}
                onClose={() => setIsFilterPanelVisible(false)}
                bookmarks={bookmarks}
                onCreateBookmark={handleCreateBookmark}
                onAddMeasureToBookmark={handleAddMeasureToBookmark}
                onSelectBookmark={handleSelectBookmark}
                onDeleteBookmark={handleDeleteBookmark}
              />
            )}
            {isLoading ? (
              <LoadingSpinner />
            ) : displayedMeasures.length > 0 ? (
              <MeasuresGrid
                blueprints={displayedMeasures}
                bookmarks={bookmarks}
                onAddMeasureToBookmark={handleAddMeasureToBookmark}
              />
            ) : (
              <p>Keine Treffer gefunden</p>
            )}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Pages />
    </Suspense>
  );
}
