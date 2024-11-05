import React, { useState, useEffect } from "react";
import MeasureCard from "./MeasureCard";
import MeasureDetailsModal from "./MeasureDetailsModal";
import Papa from "papaparse";

// Define types for props
interface Measure {
  title: string;
  sector: string;
  priority: number;
  code: string;
  description: string;
}

interface MeasuresGridProps {
  selectedPriorities: number[];
  selectedSectors: string[];
}

const MeasuresGrid: React.FC<MeasuresGridProps> = ({
  selectedPriorities,
  selectedSectors,
}) => {
  const [measures, setMeasures] = useState<Measure[]>([]);
  const [selectedMeasure, setSelectedMeasure] = useState<Measure | null>(null);
  const [visibleCount, setVisibleCount] = useState(9); // Number of measures to show

  // Initial number of measures to display (for reset purposes)
  const INITIAL_VISIBLE_COUNT = 9;

  useEffect(() => {
    const fetchMeasures = async () => {
      const response = await fetch("/measures.csv");
      const reader = response.body?.getReader();
      const result = await reader?.read();
      const csvData = new TextDecoder("utf-8").decode(result?.value);

      Papa.parse<Measure>(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const formattedData = results.data.map((measure) => ({
            ...measure,
            description: measure.description.replace(/\[NEWLINE\]/g, "<br>"),
          }));
          setMeasures(formattedData);
        },
      });
    };

    fetchMeasures();
  }, []);

  // Filter measures based on selected priorities and sectors
  const filteredMeasures = measures.filter((measure) => {
    const priorityMatch = selectedPriorities.length
      ? selectedPriorities.includes(measure.priority)
      : true;

    const sectorMatch = selectedSectors.length
      ? selectedSectors.includes(measure.sector)
      : true;

    return priorityMatch && sectorMatch;
  });

  // Load more measures
  const loadMoreMeasures = () => {
    setVisibleCount((prevCount) => prevCount + 9); // Increase visible count by 9
  };

  // Hide measures to initial count
  const hideMeasures = () => {
    setVisibleCount(INITIAL_VISIBLE_COUNT); // Reset to initial visible count
  };

  return (
    <div className="measures-grid">
      {/* Display only the visible measures */}
      {filteredMeasures.slice(0, visibleCount).map((measure, index) => (
        <MeasureCard
          key={index}
          title={measure.title}
          sector={measure.sector}
          priority={measure.priority}
          code={measure.code}
          onOpenDetails={() => setSelectedMeasure(measure)} // Open the modal with this measure's details
        />
      ))}

      {/* Button container to position in the bottom center */}
      <div className="button-container">
        {visibleCount > INITIAL_VISIBLE_COUNT && (
          <button className="hide-button" onClick={hideMeasures}>
            <img src="/images/arrow_up.png" alt="Hide" className="arrow-icon" />
          </button>
        )}
        {visibleCount < filteredMeasures.length && (
          <button className="load-more-button" onClick={loadMoreMeasures}>
            <img
              src="/images/arrow_down.png"
              alt="Load More"
              className="arrow-icon"
            />
          </button>
        )}
      </div>

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
