'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AppData } from '@/app/models/appData';
import { Blueprint } from '@/app/models/blueprint';
import Layout from '@/app/components/Layout';
import MeasureCard from '@/app/components/MeasureCard';
import { fetchSheetsData } from '@/app/data/fetchData';
import styles from '../../styles/MeasureDetailPage.module.scss';
import ArrowRight from '@/app/components/Arrow-Right';
import LoadingSpinner from '@/app/components/LoadingScreen';
import { LocalMeasure } from '@/app/models/LocalMeasure';
import FocuseBallsDetails from '@/app/components/FocuseBallsDetails';
import { Focus } from '@/app/models/focus';
import { GoBookmark } from 'react-icons/go';
import { GoBookmarkFill } from 'react-icons/go';
import {
  BookmarkProvider,
  useBookmarks,
} from '@/app/components/BookmarkContext';
import { saveBookmarksToStorage } from '@/app/components/BookmarkUtils';
import { FaShareAlt } from 'react-icons/fa';

import Sidebar from '@/app/components/Sidebar'; // Import Sidebar
import RightSidebar from '@/app/components/RightSidebar'; // Import Sidebar

const MeasureDetailPage = () => {
  const { code } = useParams(); // Get the dynamic parameter 'code' from the URL
  const [linkedMeasures, setLinkedMeasures] = useState<LocalMeasure[] | null>(
    null,
  );
  const [measure, setMeasure] = useState<Blueprint | null>(null); // The selected measure
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dropdownStates, setDropdownStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [focuses, setFocuses] = useState<Focus[] | null>(null);

  const [showBookmarkDropdown, setShowBookmarkDropdown] = useState(false);
  const {
    bookmarks,
    addMeasureToBookmark,
    isMeasureBookmarked,
    isMeasureInThisBookmark,
  } = useBookmarks();
  const [selectedBookmarks, setSelectedBookmarks] = useState<string[]>([]);
  const [isBookmarkSticky, setIsBookmarkSticky] = useState(false);

  const toggleDropdown = (cityTitle: string) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [cityTitle]: !prevState[cityTitle], // Toggle the state for the specific city
    }));
  };

  // Fetch measure linkedMeasures once the code is available
  useEffect(() => {
    if (!code) {
      setError('Code not found in the URL.');
      setLoading(false);
      return;
    }

    const fetchMeasureData = async () => {
      try {
        setLoading(true);
        const data: AppData = await fetchSheetsData(); // Fetch all linkedMeasures (AppData)
        setFocuses(data.focuses); // set focuses
        const selectedMeasure = data.blueprints.find(
          (item) => item.code === code,
        ); // Find the measure by code
        if (selectedMeasure) {
          setMeasure(selectedMeasure); // Set the measure if found
        } else {
          setError('Measure not found for the provided code.');
        }
        const linkedMeasures = data.localMeasures.filter(
          (localMeasure) => localMeasure.linkedBlueprint?.code == code,
        );

        setLinkedMeasures(linkedMeasures);
      } catch (err) {
        setError('Failed to fetch measure linkedMeasures'); // Set error if linkedMeasures fetching fails
      } finally {
        setLoading(false); // Stop loading when linkedMeasures fetching is complete
      }
    };

    fetchMeasureData();
  }, [code]); // Fetch measure linkedMeasures when code changes

  useEffect(() => {
    const handleScroll = () => {
      // Get the blue filter bar's position
      const filterBar = document.querySelector('.blue-filter-bar');
      if (!filterBar) return;

      const filterBarRect = filterBar.getBoundingClientRect();
      const filterBarTop = filterBarRect.top;

      // Check if we've scrolled past the point where the filter bar becomes sticky
      if (filterBarTop <= 0) {
        setIsBookmarkSticky(true);
      } else {
        setIsBookmarkSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return <LoadingSpinner variant="offset" />;
  if (error) return <p>{error}</p>;

  // Determine the CSS class for the cities overlay based on measure priority
  const PriorityClass = measure ? `priority-${measure.priority.stars}` : '';

  const toggleBookmark = (bookmarkName: string) => {
    if (!measure) return;
    if (selectedBookmarks.includes(bookmarkName)) {
      setSelectedBookmarks(
        selectedBookmarks.filter((name) => name !== bookmarkName),
      );
    } else {
      setSelectedBookmarks([...selectedBookmarks, bookmarkName]);
    }
    addMeasureToBookmark(bookmarkName, measure);
    console.log('measure added to' + bookmarkName);
  };

  const handleSaveBookmarks = () => {
    setShowBookmarkDropdown(false);
    saveBookmarksToStorage(bookmarks);
  };

  const handleShare = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(
      () => {
        console.log('Link copied to clipboard');
        alert('Link copied to clipboard');
      },
      (err) => {
        console.error('Failed to copy the link: ', err);
      },
    );
  };

  return (
    <Layout
      data={{
        priorities: [], // Pass empty array for priorities
        sectors: [], // Pass empty array for sectors
        focuses: [], // Pass empty array for focuses
        cities: [], // Pass empty array for cities
        blueprints: measure ? [measure] : [], // Pass the selected measure in blueprints
        localMeasures: [], // Pass empty array for localMeasures
      }}
      activeFilters={{ prioritys: [], sectors: [], focuses: [], cities: [] }} // Pass filters if necessary
    >

    <Sidebar />
      <h1 className={styles['measure-title']}>{measure?.title} </h1>

      <div
        className={`${styles['bookmark-container']} ${isBookmarkSticky ? styles.sticky : styles['not-sticky']}`}
      >
        {/* <button onClick={handleShare} className={styles['share-measure']}>
          <FaShareAlt />
          <span className={styles['teilen-text']}>Teilen</span>
        </button>
         <button
          className={styles['bookmark-button']}
          onClick={() => setShowBookmarkDropdown(!showBookmarkDropdown)}
        >
          {measure?.code && isMeasureBookmarked(measure.code) ? (
            <GoBookmarkFill />
          ) : (
            <GoBookmark />
          )}
          <span className={styles['merken-text']}>Merken</span>
        </button>  */}

        {showBookmarkDropdown && (
          <div className={styles['bookmark-dropdown']}>
            <div className={styles['bookmark-dropdown-header']}>
              <h3>Auf Merkzettel speichern</h3>
            </div>
            <div className={styles['bookmark-list']}>
              {bookmarks.map((bookmark) => (
                <div key={bookmark.name} className={styles['bookmark-item']}>
                  <label>
                    <input
                      type="checkbox"
                      checked={
                        measure
                          ? isMeasureInThisBookmark(bookmark.name, measure.code)
                          : false
                      }
                      onChange={() => toggleBookmark(bookmark.name)}
                    />
                    <span className={styles['bookmark-name']}>
                      {bookmark.name}
                    </span>
                    <span className={styles['bookmark-date']}>
                      letzte Änderung:{' '}
                      {new Date(bookmark.date).toLocaleDateString('de-DE')}{' '}
                      {new Date(bookmark.date).toLocaleTimeString('de-DE', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </label>
                </div>
              ))}
              <div
                className={`${styles['bookmark-item']} ${styles['new-bookmark']}`}
              ></div>
              <button
                className={styles['save-button']}
                onClick={handleSaveBookmarks}
              >
                Speichern
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles['measure-detail-container']}>
        {/* Left Column: Measure Card */}
        <div className={styles['measure-card']}>
          {/* Display Measure Code */}
          {measure?.code && (
            <div className={styles['measure-code']}>
              <h3>{measure.code}</h3>
            </div>
          )}
          {measure && (
            <MeasureCard
              blueprint={measure}
              hideArrow={true}
              hideCities={true}
              hideBookmark={true}
            />
          )}
          <div className={styles['focuse-balls']}>
            <FocuseBallsDetails
              measureFocuses={measure?.focuses}
              allFocuses={focuses}
            />
          </div>
            <div className={`${styles['cities-overlay']} ${styles[PriorityClass]}`}>
              <h2>Städte</h2>
              <div className={styles['cities-list']}>
                {(!linkedMeasures || linkedMeasures.length === 0) && (
                  <div className={styles['city-item']}>
                    <p className={styles['no-city-message']}>
                      No city has implemented this measure.
                    </p>
                  </div>
                )}
                {linkedMeasures?.length
                  ? Object.entries(
                      linkedMeasures.reduce(
                        (acc, localMeasure) => {
                          const cityTitle = localMeasure.city?.title;
                          if (!acc[cityTitle]) acc[cityTitle] = [];
                          acc[cityTitle].push(localMeasure);
                          return acc;
                        },
                        {} as Record<string, LocalMeasure[]>,
                      ),
                    ).map(([cityTitle, measures]) => {
                      const isOpen = dropdownStates[cityTitle] || false;

                      return (
                        <div key={cityTitle} className={styles['city-item']}>
                          <div onClick={() => toggleDropdown(cityTitle)}>
                            <button className={styles['city-item-link']}>
                              {cityTitle}
                            </button>
                            <ArrowRight
                              color="#4a0a78"
                              className={`${styles['arrow-button']} ${
                                isOpen
                                  ? styles['arrow-down']
                                  : styles['arrow-right']
                              }`}
                            />
                          </div>
                          {isOpen && (
                            <div className={styles['dropdown-menu']}>
                              {measures.map((measure, index) => (
                                <a
                                  key={index}
                                  href={measure.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles['city-link']}
                                >
                                  - {measure.title}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })
                  : null}
              </div>
          </div>
        </div>

        {/* Middle Column: Description */}
        <div
          className={`${styles['description-container']} ${styles[PriorityClass]}`}
        >
          {/* Blue line on top */}
          <div
            className={`${styles['blue-line']} ${styles['top-blue-line']}`}
          ></div>

          {/* Description text */}
          <div className={styles['description-text']}>
            {measure?.description
              ?.split('[NEWLINE]')
              .map((line, index) => <p key={index}>{line}</p>)}
          </div>

          {/* Blue line at the bottom */}
          <div
            className={`${styles['blue-line']} ${styles['bottom-blue-line']}`}
          ></div>
        </div>

        {/* Right Column: Cities and Dropdown */}
        <RightSidebar
            handleShare={handleShare}
            measure={measure}
            isMeasureBookmarked={isMeasureBookmarked}
            setShowBookmarkDropdown={setShowBookmarkDropdown}
            showBookmarkDropdown={showBookmarkDropdown}
          />

      </div>
    </Layout>
  );
};

const MeasureDetailPageProvider = () => {
  return (
    <BookmarkProvider>
      <MeasureDetailPage />
    </BookmarkProvider>
  );
};

export default MeasureDetailPageProvider;
