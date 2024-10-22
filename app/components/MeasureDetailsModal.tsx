// src/components/MeasureDetailsModal.tsx
import React from "react";

interface Measure {
  title: string;
  code: string;
  sector: string;
  priority: number; // Assuming priority is a number, adjust if it's a different type
  description: string;
}

interface MeasureDetailsModalProps {
  measure: Measure | null; // Use null if no measure is selected
  onClose: () => void; // Function to call when closing the modal
}

const MeasureDetailsModal: React.FC<MeasureDetailsModalProps> = ({
  measure,
  onClose,
}) => {
  if (!measure) return null;

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

        {/* Additional info about the measure */}
        <p>
          <strong>Description:</strong> This measure focuses on{" "}
          {measure.description}.
        </p>

        {/* Add more detailed information as needed */}

        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <button className="share-button">Share</button>
        <button className="add-button">Add</button>
      </div>
    </div>
  );
};

export default MeasureDetailsModal;
