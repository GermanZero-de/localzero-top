import React, { useState, useEffect, useRef } from 'react';
import MeasureCard from './MeasureCard';
import { Blueprint } from '@/app/models/blueprint';
import Bookmark from './Bookmark';

// Throttle function to limit the number of calls to handleScroll
const useThrottle = (callback: Function, delay: number) => {
  const lastCall = useRef<number>(0);
  return (...args: any[]) => {
    const now = new Date().getTime();
    if (now - lastCall.current >= delay) {
      callback(...args);
      lastCall.current = now;
    }
  };
};

interface MeasuresGridProps {
  blueprints: Blueprint[];
  bookmarks: Bookmark[];
  onAddMeasureToBookmark: (bookmarkName: string, measure: Blueprint) => void;
}

const MeasuresGrid: React.FC<MeasuresGridProps> = ({
  blueprints,
  onAddMeasureToBookmark,
}) => {
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(false); // Track if data is being loaded

  const INITIAL_VISIBLE_COUNT = 9;
  const LOAD_MORE_THRESHOLD = 500; // Distance (in px) from the bottom to trigger loading more

  // Function to handle scroll event
  const handleScroll = () => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;

    // If we are near the bottom of the page and not already loading
    if (scrollHeight - scrollPosition <= LOAD_MORE_THRESHOLD && !loading) {
      loadMoreData();
    }
  };

  // Function to load more data
  const loadMoreData = () => {
    if (loading) return; // Prevent loading if already in progress
    setLoading(true);
    setVisibleCount((prevCount) => prevCount + 9); // Increase visible count
  };

  // Use the throttled version of handleScroll to avoid excessive calls
  const throttledHandleScroll = useThrottle(handleScroll, 200);

  // Add scroll event listener on component mount
  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [loading]);

  useEffect(() => {
    setLoading(false); // Reset loading state after the data has been updated
  }, [visibleCount]);

  return (
    <div className="measures-grid">
      {/* Display only the visible measures */}
      {blueprints.slice(0, visibleCount).map((blueprint, index) => (
        <MeasureCard
          key={index}
          blueprint={blueprint}
          bookmarks={[]}
          onAddMeasureToBookmark={onAddMeasureToBookmark}
        />
      ))}

      {/* Loading indicator */}
      {loading && <div className="loading-indicator">Loading more...</div>}
    </div>
  );
};

export default MeasuresGrid;
