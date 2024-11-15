// src/components/MeasureDetailsModal.tsx
import React from "react";
import {Blueprint} from "@/app/models/blueprint";

interface MeasureDetailsModalProps {
  blueprint: Blueprint | null;
  onClose: () => void;
}

const MeasureDetailsModal: React.FC<MeasureDetailsModalProps> = ({
  blueprint,
  onClose,
}) => {
  if (!blueprint) return null;

  // Replace [NEWLINE] with <br /> for HTML line breaks in the description
  const formattedDescription = blueprint.description.replace(/\[NEWLINE\]/g, "<br />");

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{blueprint.title}</h2>
        <p>
          <strong>Code:</strong> {blueprint.code}
        </p>
        <p>
          <strong>Sector:</strong> {blueprint.sector.title}
        </p>
        <p>
          <strong>Priority:</strong> {"★".repeat(blueprint.priority.stars)}
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
