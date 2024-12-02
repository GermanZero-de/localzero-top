import React, { ReactNode } from 'react';
import Navbar from './navbar';
import BlueFilterBar from './BlueFilterBar';
import Footer from './Footer';
import '../styles/styles.scss';
import '../styles/Filterpanel.scss';

interface LayoutProps {
  children: ReactNode;
  data?: any; // You can adjust the type as needed
  activeFilters?: any; // You can adjust the type as needed
}

const handleGoBack = () => {
  if (typeof window !== 'undefined' && window.history.length > 1) {
    window.history.back(); // Navigate back in browser history
  } else {
    console.log('No previous page in browser history');
  }
};

const Layout: React.FC<LayoutProps> = ({ children, data, activeFilters }) => {
  return (
    <div className="d-flex flex-column flex-grow-1">
      <Navbar />
      <div className="app flex-grow-1">
        <div className="main-content">
          {/* BlueFilterBar no longer has onToggleFilterPanel prop */}
          <BlueFilterBar
            onGoBack={handleGoBack}
            onToggleFilterPanel={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          {children} {/* Render child components here */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
