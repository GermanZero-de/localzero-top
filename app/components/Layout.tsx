// src/components/Layout.tsx
import React, { ReactNode } from "react";
import Navbar from "./navbar";
import FilterPanel from "./FilterPanel";
import BlueFilterBar from "./BlueFilterBar";
import Footer from "./Footer";
import { AppData } from "@/app/models/appData"; // Make sure to import types if necessary

interface LayoutProps {
  children: ReactNode;
  data: AppData;
  activeFilters: any;
  isFilterPanelVisible: boolean;
  toggleFilterPanel: () => void;
  closeFilterPanel: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  data,
  activeFilters,
  isFilterPanelVisible,
  toggleFilterPanel,
  closeFilterPanel,
}) => {
  return (
    <div className="d-flex flex-column flex-grow-1">
      <Navbar />
      <div className="app flex-grow-1">
        <div className="sidebar">
          <FilterPanel
            data={data}
            filters={activeFilters}
            onFilterChange={() => {}}
            onClose={closeFilterPanel}
          />
        </div>
        <div className="main-content">
          <BlueFilterBar onToggleFilterPanel={toggleFilterPanel} />
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
