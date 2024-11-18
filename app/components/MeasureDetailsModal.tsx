// src/components/MeasureDetailsModal.tsx
import React from "react";
import { Blueprint } from "@/app/models/blueprint";

interface MeasureDetailsModalProps {
  blueprint: Blueprint | null;
  onClose: () => void;
  bookmarks?: Bookmark[];
  onAddToBookmark?: (bookmarkName: string, measure: Blueprint) => void;
}

interface Bookmark {
  name: string;
  measures: Blueprint[];
}

const MeasureDetailsModal: React.FC<MeasureDetailsModalProps> = ({
  blueprint,
  onClose,
  bookmarks = [],
  onAddToBookmark,
}) => {
  const [showBookmarkDropdown, setShowBookmarkDropdown] = React.useState(false);

  if (!blueprint) return null;
  // Replace [NEWLINE] with <br /> for HTML line breaks in the description
  const formattedDescription = blueprint.description.replace(
    /\[NEWLINE\]/g,
    "<br />"
  );

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
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

        <button className='close-button' onClick={onClose}>
          Close
        </button>
        <button className='share-button'>Share</button>
        <button
          className='add-button'
          onClick={() => setShowBookmarkDropdown(!showBookmarkDropdown)}
        >
          Add
        </button>
        {showBookmarkDropdown && (
          <div className='bookmark-dropdown'>
            {bookmarks.length === 0 ? (
              <div className='no-bookmarks'>
                Create a bookmark group in the sidebar first
              </div>
            ) : (
              bookmarks.map((bookmark) => (
                <button
                  key={bookmark.name}
                  className='bookmark-option'
                  onClick={() => {
                    onAddToBookmark(bookmark.name, blueprint);
                    setShowBookmarkDropdown(false);
                  }}
                >
                  {bookmark.name}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeasureDetailsModal;
