import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation'; // To detect the current route
import Navbar from './navbar';
import BlueFilterBar from './BlueFilterBar';
import Footer from './Footer';
import { AppData } from '@/app/models/appData'; // Make sure to import types if necessary
import { Filter } from '@/app/models/Filter'; // Assuming you have a Filter model
import '../styles/styles.scss';
import '../styles/Filterpanel.scss';

interface LayoutProps {
  children: ReactNode;
  data?: AppData; // Make data optional
  activeFilters?: Filter; // Make activeFilters optional
}
const handleGoBack = () => {
  if (typeof window !== 'undefined' && window.history.length > 1) {
    window.history.back(); // Navigate back in browser history
  } else {
    console.log('No previous page in browser history');
  }
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname(); // Get the current route
  const isMeasureDetailPage = pathname.startsWith('/measures/'); // Check if it's MeasureDetailPage

  return (
    <div className="d-flex flex-column flex-grow-1">
      <Navbar />
      <div className="app flex-grow-1">
        <div className="main-content">
          <BlueFilterBar
            onGoBack={handleGoBack}
            hideIcons={isMeasureDetailPage} // Hide icons only on MeasureDetailPage
          />
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
