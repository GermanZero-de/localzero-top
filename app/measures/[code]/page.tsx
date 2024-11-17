// src/pages/measures/[code]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Layout from "@/app/components/Layout"; // Import the shared layout
import { fetchSheetsData } from "@/app/data/fetchData";
import { AppData } from "@/app/models/appData"; // Ensure types are correct

const MeasureDetailPage = () => {
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);
  const [data, setData] = useState<AppData>({
    priorities: [],
    sectors: [],
    focuses: [],
    cities: [],
    blueprints: [],
  }); // Initial state for AppData
  const [activeFilters, setActiveFilters] = useState({
    prioritys: [],
    sectors: [],
    focuses: [],
  });

  useEffect(() => {
    fetchSheetsData().then((data) => {
      setData(data);
    });
  }, []);

  const toggleFilterPanel = () => {
    setIsFilterPanelVisible(!isFilterPanelVisible);
  };

  const closeFilterPanel = () => {
    setIsFilterPanelVisible(false);
  };

  return (
    <Layout
      data={data}
      activeFilters={activeFilters}
      isFilterPanelVisible={isFilterPanelVisible}
      toggleFilterPanel={toggleFilterPanel}
      closeFilterPanel={closeFilterPanel}
    >
      {/* Content for MeasureDetailPage (without the measure grid) */}
      <h1>Measure Detail Page</h1>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>Measure details will be displayed here once selected.</p>
      </div>
    </Layout>
  );
};

export default MeasureDetailPage;
