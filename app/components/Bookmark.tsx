import { Blueprint } from '@/app/models/blueprint';
import React, { useState } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa'; // Import icons from react-icons
import '../styles/Bookmark.scss';

interface Bookmark {
  name: string;
  measures: Blueprint[];
}

interface BookmarkProps {
  bookmarks: Bookmark[];
  onCreateBookmark: (name: string) => void;
  onSelectBookmark: (bookmarkName: Bookmark) => void;
  onAddMeasureToBookmark: (bookmarkName: string, measure: Blueprint) => void;
  onDeleteBookmark: (name: string) => void;
}

const Bookmark: React.FC<BookmarkProps> = ({
  bookmarks = [],
  onCreateBookmark,
  onSelectBookmark,
  onDeleteBookmark,
}) => {
  const [newBookmarkName, setNewBookmarkName] = useState('');

  const handleCreateBookmark = () => {
    if (newBookmarkName.trim()) {
      onCreateBookmark(newBookmarkName.trim());
      setNewBookmarkName('');
    }
  };

  return (
    <div>
      <div className="create-bookmark">
        <input
          type="text"
          value={newBookmarkName}
          onChange={(e) => setNewBookmarkName(e.target.value)}
          placeholder="Namen festlegen"
        />
        <button className="create-button" onClick={handleCreateBookmark}>
          Erstelle einen Merkzettel
        </button>
      </div>
      <div className="bookmarks-list">
        {bookmarks.map((bookmark, index) => (
          <div key={index} className="bookmark-item">
            <div className="bookmark-header">
              <h3 className="bookmark-name">{bookmark.name}</h3>
              <FaEye
                className="view-bookmark"
                onClick={() => onSelectBookmark(bookmark)}
              />
              <FaTrash
                className="delete-bookmark"
                onClick={() => onDeleteBookmark(bookmark.name)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmark;
