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

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

  // Determine the CSS class for the cities overlay based on measure priority
  const PriorityClass = measure ? `priority-${measure.priority.stars}` : '';

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
      <h1>{measure?.title}</h1>
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
              onAddMeasureToBookmark={() => {}}
              bookmarks={[]}
            />
          )}
          <div className={styles['focuse-balls']}>
            <FocuseBallsDetails
              measureFocuses={measure?.focuses}
              allFocuses={focuses}
            />
          </div>
        </div>

        {/* Middle Column: Description */}
        <div
          className={`${styles['description-container']} ${styles[PriorityClass]}`}
        >
          {/* Blue line on top */}
          <div className={styles['blue-line']}></div>

          {/* Description text */}
          <div className={styles['description-text']}>
            <p>{measure?.description?.replace(/<br>/g, '\n')}</p>
          </div>

          {/* Blue line at the bottom */}
          <div className={styles['blue-line']}></div>
        </div>

        {/* Right Column: Cities and Dropdown */}
        <div className={`${styles['cities-overlay']} ${styles[PriorityClass]}`}>
          <h2>Städte</h2>

          <div className={styles['cities-list']}>
            {linkedMeasures?.length
              ? Object.entries(
                  linkedMeasures.reduce(
                    (acc, localMeasure) => {
                      const cityTitle = localMeasure.city.title;
                      if (!acc[cityTitle]) {
                        acc[cityTitle] = [];
                      }
                      acc[cityTitle].push(localMeasure);
                      return acc;
                    },
                    {} as Record<string, LocalMeasure[]>,
                  ),
                ).map(([cityTitle, measures]) => {
                  const isOpen = dropdownStates[cityTitle] || false; // Get the open/close state for this city

                  return (
                    <div key={cityTitle} className={styles['city-item']}>
                      <div onClick={() => toggleDropdown(cityTitle)}>
                        <a
                          href={`#${cityTitle}`}
                          className={styles['city-item-link']}
                        >
                          {cityTitle}
                        </a>
                        <ArrowRight
                          color="#4a0a78"
                          className={`${styles['arrow-button']} ${
                            isOpen
                              ? styles['arrow-down']
                              : styles['arrow-right']
                          }`}
                        />
                      </div>

                      {/* When the dropdown is open, show all links for the city */}
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
    </Layout>
  );
};

export default MeasureDetailPage;
