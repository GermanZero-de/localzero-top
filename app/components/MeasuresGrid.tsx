// src/components/MeasuresGrid.tsx
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
      title: "Ausweisung von Windkraftstandorten gemäB Wind-an-Land Gesetz",
      sector: "Strom",
      priority: 3,
      code: "TOP001",
      description: "...vdsgsdesfs...",
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

  return (
    <div className="measures-grid">
      {filteredMeasures.map((measure, index) => (
        <MeasureCard
          key={index}
          title={measure.title}
          sector={measure.sector}
          priority={measure.priority}
          code={measure.code}
          onOpenDetails={() => setSelectedMeasure(measure)} // Open the modal with this measure's details
        />
      ))}

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
