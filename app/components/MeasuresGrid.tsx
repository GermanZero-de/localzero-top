import React, {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import MeasureCard from "./MeasureCard";
import MeasureDetailsModal from "./MeasureDetailsModal";
import {Measure} from "@/app/Redo/Measure";

// Format how data comes from csv
interface MeasureRaw {
  title: string;
  sector: string;
  priority: number;
  focuses: string;
  code: string;
  description: string;
}

interface MeasuresGridProps {
  measureCards: Measure[];
}

const MeasuresGrid: React.FC<MeasuresGridProps> = ({
  measureCards,
}) => {
  const [selectedMeasure, setSelectedMeasure] = useState<Measure | null>(null);
  const [visibleCount, setVisibleCount] = useState(9);

  // Initial number of measures to display (for reset purposes)
  const INITIAL_VISIBLE_COUNT = 9;

  // Use `useInView` to observe the sentinel element
  const { ref: sentinelRef, inView } = useInView({
    threshold: 1.0, // Trigger when 100% of the element is in view
  });

  // Load more measures whenever `inView` is true
  useEffect(() => {
    if (inView) {
      setVisibleCount((prevCount) => prevCount + 18);
    }
  }, [inView]);

  return (
    <div className="measures-grid">
      {/* Display only the visible measures */}
      {measureCards.slice(0, visibleCount).map((measure, index) => (
        <MeasureCard
          key={index}
          measure={measure}
          onOpenDetails={() => setSelectedMeasure(measure)} // Open the modal with this measure's details
        />
      ))}

      {/* Sentinel div to trigger loading more measures */}
      <div ref={sentinelRef} style={{ height: "50px" }} />

      {/* Modal to show measure details */}
      {selectedMeasure && (
        <MeasureDetailsModal
          measure={selectedMeasure}
          onClose={() => setSelectedMeasure(null)} // Close modal
        />
      )}
    </div>
  );
};

export default MeasuresGrid;
