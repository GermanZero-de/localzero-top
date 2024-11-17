// src/app/measures/[code]/page.tsx

"use client"; // Mark the component as a client component

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Use useParams to get dynamic route parameters
import { AppData } from "@/app/models/appData";
import { Blueprint } from "@/app/models/blueprint";
import Layout from "@/app/components/Layout";
import { fetchSheetsData } from "@/app/data/fetchData";

const MeasureDetailPage = () => {
  const { code } = useParams(); // Get the dynamic parameter 'code' from the URL

  // Log the code to check if it's extracted correctly
  console.log("Extracted code:", code);

  const [measure, setMeasure] = useState<Blueprint | null>(null); // The selected measure
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch measure data once the code is available
  useEffect(() => {
    if (!code) {
      setError("Code not found in the URL.");
      setLoading(false);
      return;
    }

    const fetchMeasureData = async () => {
      try {
        setLoading(true);
        const data: AppData = await fetchSheetsData(); // Fetch all data (AppData)
        console.log("Fetched data:", data); // Log the fetched data for debugging

        const selectedMeasure = data.blueprints.find(
          (item) => item.code === code
        ); // Find the measure by code
        if (selectedMeasure) {
          setMeasure(selectedMeasure); // Set the measure if found
        } else {
          setError("Measure not found for the provided code.");
        }
      } catch (err) {
        setError("Failed to fetch measure data"); // Set error if data fetching fails
      } finally {
        setLoading(false); // Stop loading when data fetching is complete
      }
    };

    fetchMeasureData();
  }, [code]); // Fetch measure data when code changes

  // Show loading, error message, or measure content
  if (loading) return <p>Loading...</p>;
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
      }}
      activeFilters={{ prioritys: [], sectors: [], focuses: [] }} // Pass filters if necessary
      isFilterPanelVisible={false} // Filter panel visibility (you can manage this state as needed)
      toggleFilterPanel={() => {}}
      closeFilterPanel={() => {}}
    >
      <h1>{measure?.title}</h1>{" "}
      {/* Display the title of the selected measure */}
      <p>{measure?.description}</p>{" "}
      {/* Display the description of the selected measure */}
      {/* Render other measure details here as needed */}
    </Layout>
  );
};

export default MeasureDetailPage;
