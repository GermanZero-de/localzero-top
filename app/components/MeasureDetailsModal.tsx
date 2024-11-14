// src/components/MeasureDetailsModal.tsx
import React from "react";
import {Measure} from "@/app/Redo/Measure";

interface MeasureDetailsModalProps {
  measure: Measure | null;
  onClose: () => void;
}

const MeasureDetailsModal: React.FC<MeasureDetailsModalProps> = ({
  measure,
  onClose,
}) => {
  if (!measure) return null;

  // Replace [NEWLINE] with <br /> for HTML line breaks in the description
  const formattedDescription = measure.description.replace(/\[NEWLINE\]/g, "<br />");

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{measure.title}</h2>
        <p>
          <strong>Code:</strong> {measure.code}
        </p>
        <p>
          <strong>Sector:</strong> {measure.sector}
        </p>
        <p>
          <strong>Priority:</strong> {"★".repeat(measure.priority)}
        </p>

        {/* Render formattedDescription with HTML for line breaks */}
        <div>
          <strong>Description:</strong>
          <p dangerouslySetInnerHTML={{ __html: formattedDescription }} />
        </div>

        <button className="close-button" onClick={onClose}>Close</button>
        <button className="share-button">Share</button>
        <button className="add-button">Add</button>
      </div>
    </div>
  );
};

export default MeasureDetailsModal;
