// src/app/measures/[code]/page.tsx

'use client'; // Mark the component as a client component

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Use useParams to get dynamic route parameters
import { AppData } from '@/app/models/appData';
import { Blueprint } from '@/app/models/blueprint';
import Layout from '@/app/components/Layout';
import MeasureCard from '@/app/components/MeasureCard'; // Import MeasureCard component
import { fetchSheetsData } from '@/app/data/fetchData';
import styles from '../../styles/MeasureDetailPage.module.scss'; // Import the correct SCSS file

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim() // Remove leading and trailing whitespace
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/ü/g, 'u')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o');

const MeasureDetailPage = () => {
  const { code } = useParams(); // Get the dynamic parameter 'code' from the URL

  const [measure, setMeasure] = useState<Blueprint | null>(null); // The selected measure
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch measure data once the code is available
  useEffect(() => {
    if (!code) {
      setError('Code not found in the URL.');
      setLoading(false);
      return;
    }

    const fetchMeasureData = async () => {
      try {
        setLoading(true);
        const data: AppData = await fetchSheetsData(); // Fetch all data (AppData)
        console.log('Fetched data:', data); // Log the fetched data for debugging

        const selectedMeasure = data.blueprints.find(
          (item) => item.code === code,
        ); // Find the measure by code
        if (selectedMeasure) {
          setMeasure(selectedMeasure); // Set the measure if found
        } else {
          setError('Measure not found for the provided code.');
        }
      } catch (err) {
        setError('Failed to fetch measure data'); // Set error if data fetching fails
      } finally {
        setLoading(false); // Stop loading when data fetching is complete
      }
    };

    fetchMeasureData();
  }, [code]); // Fetch measure data when code changes

  // Show loading, error message, or measure content
  if (loading) return <p>Lädt..</p>;
  if (error) return <p>{error}</p>;

  // Layout rendering with the selected measure data passed to the Layout component
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
      isFilterPanelVisible={false} // Filter panel visibility (you can manage this state as needed)
      toggleFilterPanel={() => {}}
      closeFilterPanel={() => {}}
    >
      <h1>{measure?.title}</h1>
      <div className={styles['measure-detail-container']}>
        {/* Left Column: Measure Card */}
        <div className={styles['measure-card']}>
          {measure && (
            <MeasureCard
              blueprint={measure}
              hideArrow={true}
              hideCities={true}
            />
          )}{' '}
          {/* Pass hideArrow */}
        </div>

        {/* Middle Column: Description */}
        <div className={styles['description']}>
          <p>{measure?.description?.replace(/<br>/g, '\n')}</p>{' '}
          {/* Display description with line breaks */}
        </div>

        {/* Right Column: Next Feature */}
        <div className={styles['cities-overlay']}>
          <h2>Städte</h2>
          {/* Display the count of cities */}
          <p>
            {measure?.cities?.length
              ? `This measure is linked to ${measure.cities.length} city/cities.`
              : 'No cities available for this measure.'}
          </p>
          <div className={styles['cities-list']}>
            {measure?.cities?.length
              ? measure.cities.map((city) => (
                  <div key={city.title} className={styles['city-item']}>
                    <span>{city.title}</span>
                    <select
                      onChange={(e) => {
                        const selectedUrl = e.target.value;
                        if (selectedUrl) {
                          window.open(selectedUrl, '_blank'); // Open the link in a new tab
                          e.target.value = ''; // Reset the dropdown to "Select a link"
                        }
                      }}
                    >
                      <option value="">Select a link</option>
                      {measure?.cities?.map((city) => (
                        <option
                          key={city.title}
                          value={`https://monitoring.localzero.net/${slugify(city.title)}/massnahmen`}
                        >
                          {city.title}
                        </option>
                      ))}
                    </select>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MeasureDetailPage;
