// src/components/MeasureCard.tsx
import React from "react";

interface MeasureCardProps {
  title: string;
  sector: string;
  priority: number;
  code: string;
  onOpenDetails: (measure: {
    title: string;
    sector: string;
    priority: number;
    code: string;
    description: string;
  }) => void;
}

const MeasureCard: React.FC<MeasureCardProps> = ({
  title,
  sector,
  priority,
  code,
  onOpenDetails,
}) => {
  return (
    <div className="measure-card">
      <div className="card-header">
        <span className="sector">{sector}</span>
        <div className="stars">{"★".repeat(priority)}</div>
      </div>
      <div className="card-body">
        <h5>{title}</h5>
        <div className="code">
          <p>{code}</p>
        </div>
      </div>
      <div className="card-footer">
        <button
          className="arrow-button"
          onClick={() =>
            onOpenDetails({
              title,
              sector,
              priority,
              code,
              description: "Full description to be handled in MeasuresGrid",
            })
          }
        >
          🡺
        </button>
      </div>
    </div>
  );
};

export default MeasureCard;
