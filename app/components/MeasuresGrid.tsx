import React, { useState } from "react";
import MeasureCard from "./MeasureCard";
import MeasureDetailsModal from "./MeasureDetailsModal";

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
  const measures: Measure[] = [
    {
      title: "Bau von Windenergieanlagen ermöglichen und unterstützen",
      sector: "Strom",
      priority: 3,
      code: "TOP001",
      description:
        "... Meistens sind die überkommunalen Regionalverbände für die Ausweisung" +
        "der Windkraftstandorten zuständig. Jedes Bundesland hat aus dem 2%-Bundesziel eigene Ausbauziele. ",
    },
    {
      title:
        "Umsetzung von Windanlagen unterstützen und ggf. über Stadwerke entwickeln",
      sector: "Strom",
      priority: 3,
      code: "TOP002",
      description: "...energy infrastructure...",
    },
    {
      title: "PV-Belegung aller kommuneneigenen Dachflächen",
      sector: "Strom",
      priority: 3,
      code: "TOP003",
      description: "...solar panels...",
    },
    {
      title: "Förderprogramm für PV-Angalen",
      sector: "Transport",
      priority: 3,
      code: "TOP004",
      description: "...public transportation...",
    },
    {
      title:
        "Kommune bezieht für alle eigenen Liegenschaften nur noch qualifizierten Ökostrom",
      sector: "Transport",
      priority: 1,
      code: "TOP005",
      description: "...electric vehicles...",
    },
    {
      title: "Implementation of energy-saving...",
      sector: "Buildings",
      priority: 3,
      code: "TOP006",
      description: "...energy saving...",
    },
    {
      title: "Incentives for energy-efficient...",
      sector: "Buildings",
      priority: 2,
      code: "TOP007",
      description: "...energy-efficient buildings...",
    },
    {
      title: "Waste reduction and recycling...",
      sector: "Waste Management",
      priority: 1,
      code: "TOP008",
      description: "...waste management...",
    },
    {
      title: "Tax incentives for solar panel...",
      sector: "Finance",
      priority: 2,
      code: "TOP009",
      description: "...solar incentives...",
    },
    {
      title: "Water conservation initiatives...",
      sector: "Water",
      priority: 1,
      code: "TOP010",
      description: "...water conservation...",
    },
  ];

  const [selectedMeasure, setSelectedMeasure] = useState<Measure | null>(null);
  const [visibleCount, setVisibleCount] = useState(9); // Number of measures to show

  // Initial number of measures to display (for reset purposes)
  const INITIAL_VISIBLE_COUNT = 9;

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
