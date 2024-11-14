import React, { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
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
  const [visibleCount, setVisibleCount] = useState(9);

  // Initial number of measures to display (for reset purposes)
  const INITIAL_VISIBLE_COUNT = 9;

  // Use `useInView` to observe the sentinel element
  const { ref: sentinelRef, inView } = useInView({
    threshold: 1.0, // Trigger when 100% of the element is in view
  });

  useEffect(() => {
    const fetchMeasures = async () => {
      const response = await fetch(
        "https://docs.google.com/spreadsheets/d/1SrQfj9-wJWQRd5ysSHpOWbXXC1zYLV5Iax13IxxBqMs/export?format=csv"
      );
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

  // Load more measures whenever `inView` is true
  useEffect(() => {
    if (inView) {
      setVisibleCount((prevCount) => prevCount + 18);
    }
  }, [inView]);

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
