// src/components/Layout.tsx
import React, { ReactNode } from "react";
import Navbar from "./navbar";
import FilterPanel from "./FilterPanel";
import BlueFilterBar from "./BlueFilterBar";
import Footer from "./Footer";
import { AppData } from "@/app/models/appData"; // Make sure to import types if necessary
import { Filter } from "@/app/models/Filter"; // Assuming you have a Filter model

interface LayoutProps {
  children: ReactNode;
  data?: AppData; // Make data optional
  activeFilters?: Filter; // Make activeFilters optional
  isFilterPanelVisible?: boolean; // Make isFilterPanelVisible optional
  toggleFilterPanel?: () => void; // Make toggleFilterPanel optional
  closeFilterPanel?: () => void; // Make closeFilterPanel optional
}
const handleGoBack = () => {
  if (typeof window !== 'undefined' && window.history.length > 1) {
    window.history.back(); // Navigate back in browser history
  } else {
    console.log("No previous page in browser history");
  }
};


const Layout: React.FC<LayoutProps> = ({
  children,
  data = {
    priorities: [],
    sectors: [],
    focuses: [],
    cities: [],
    blueprints: [],
  }, // Default values for optional props
  activeFilters = { prioritys: [], sectors: [], focuses: [] },
  isFilterPanelVisible = false,
  toggleFilterPanel = () => {},
  closeFilterPanel = () => {},
}) => {
  return (
    <div className="d-flex flex-column flex-grow-1">
      <Navbar />
      <div className="app flex-grow-1">
        <div className="sidebar">
          {/* Render FilterPanel only if the necessary props are provided */}
          {data && activeFilters && (
            <FilterPanel
              data={data}
              filters={activeFilters}
              onFilterChange={() => {}}
              onClose={closeFilterPanel}
            />
          )}
        </div>
        <div className="main-content">
        <BlueFilterBar onToggleFilterPanel={toggleFilterPanel} onGoBack={handleGoBack} />
          {isFilterPanelVisible && (
            <FilterPanel
              data={data}
              filters={activeFilters}
              onFilterChange={() => {}}
              onClose={closeFilterPanel}
              isOverlay
            />
          )}
          {children} {/* Render child components here */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
